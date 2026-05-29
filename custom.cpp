#include "pxt.h"
#include <cstdint>
#include <math.h>
#include "app_error.h"
#include "nrf.h"
#include "MicroBitSystemTimer.h"

using namespace pxt;

#if MICROBIT_CODAL
// ********************* V2/CODAL Specific Functions ***********************
#ifdef NRF_P1   
    #define PORT (pin < 32 ? NRF_P0 : NRF_P1)
    #define PIN ((pin) & 31)
    #define NUM_PINS 48
#else
    #define PORT (NRF_P0)
    #define PIN (pin)
    #define NUM_PINS 32
#endif

    #define _wait_us(us)          system_timer_wait_cycles((us)==0? 1: (((10*500*(us))/470)))
    #define _GPIO                   int
    static void setToInput(_GPIO pin)     { PORT->PIN_CNF[PIN] &= 0xfffffffc; }
    static void setToOutput(_GPIO pin)    { PORT->PIN_CNF[PIN] |= 3; }
    static void setPinValue(_GPIO pin, int val) { if (val) PORT->OUTSET = 1 << PIN; else PORT->OUTCLR = 1 << PIN;}
    static bool getPinValue(_GPIO pin)    { return (PORT->IN & (1 << PIN)) ? 1 : 0; }

    static void configTimer() {
        static NRF_TIMER_Type *timer = NULL;
        if(timer == NULL) {
            NVIC_DisableIRQ(TIMER1_IRQn);
            NRF_CLOCK_Type *clock = NRF_CLOCK;
            clock->TASKS_HFCLKSTART = 1;
            timer = NRF_TIMER1;
            timer->TASKS_STOP = 1;
            timer->BITMODE = 3;
            timer->TASKS_START = 1;
            NVIC_EnableIRQ(TIMER1_IRQn);
        }
    }
#else
// ********************* V1/AL Specific Functions ***********************
    #define _wait_us(us)            wait_us(((us)>5)?(us)-5:0)
    #define _GPIO                   gpio_t*
    #define setToInput(pin)         gpio_dir((pin), PIN_INPUT)
    #define setToOutput(pin)        gpio_dir((pin), PIN_OUTPUT)
    #define setPinValue(pin, val)   gpio_write((pin), (val))
    #define getPinValue(pin)        gpio_read((pin))
#endif

namespace max31850 { 

    void writeBit(_GPIO ioPin, bool one, bool finalYield = true);
    void writeByte(_GPIO ioPin, uint8_t b, bool finalYield = true);
    bool readBit(_GPIO ioPin);
    bool readScratchpad(_GPIO ioPin, float& temp);
    bool resetAndCheckPresence(_GPIO ioPin);
    bool configure(_GPIO pin);
    bool startConversion(_GPIO ioPin);

    const int TIME_SLOT = 90;
    const int TIME_RECOV =  15;
    const int TIME_ZERO_LOW = TIME_SLOT;
    const int TIME_ONE_LOW = 0;
    const int TIME_RESET_LOW = 500;
    const int TIME_RESET_HIGH = 500;
    const int TIME_POWER_UP = 1000;
    const int TIME_POST_RESET_TO_DETECT = 10;
    const int TIME_PRESENCE_DETECT = 300;
    const int MAX_TRIES = 3;

    const int HIGH_ALARM = 0xFF;
    const int LOW_ALARM = 0x80;

    void writeBit(_GPIO ioPin, bool one, bool finalYield) {
        setPinValue(ioPin, 1);
        setToOutput(ioPin);
        _wait_us(TIME_RECOV);
        setPinValue(ioPin, 0);
        _wait_us(one ? TIME_ONE_LOW : TIME_ZERO_LOW);
        setToInput(ioPin);
        setPinValue(ioPin, 1);
        _wait_us(one ? TIME_SLOT : 1);
    }

    void writeByte(_GPIO ioPin, uint8_t b, bool finalYield) {
        for(int i=0;i<8;i++,b>>=1) {
            writeBit(ioPin, (b & 0x01), i!=7);
        }
    }

    bool readBit(_GPIO ioPin) {
        setToOutput(ioPin);
        setPinValue(ioPin,1);
        _wait_us(TIME_RECOV);
        setPinValue(ioPin, 0);
        _wait_us(1);
        setPinValue(ioPin, 1);
        setToInput(ioPin);
        bool b = true; 
#if MICROBIT_CODAL
        uint32_t maxCounts = (int)(TIME_SLOT/0.0635);
#else
        _wait_us(0);
        uint32_t maxCounts = (int)(TIME_SLOT/0.57);
#endif
        do {
            b = b && getPinValue(ioPin);
        } while(maxCounts-->0);
        setPinValue(ioPin,1);
        return b; 
    }

    bool readScratchpad(_GPIO ioPin, float& temp) {
        uint8_t data[9];
        int16_t value;
        uint8_t crc=0;
        for(int j = 0; j<9; j++) {
            uint8_t b = 0;
            for(int i=0; i<8; i++) {
                bool bit = readBit(ioPin);
                b |= (bit<<i);
                bool lsb = crc & 0x1;
                crc >>= 1;
                if(bit != lsb)
                  crc ^= 0x8C;
            }
            data[j] = b;
        }     
        value = data[1];
        value <<= 8;
        value |= data[0];
        
        // Fault detection (LSB Bit 0 is 1 if fault)
        if (data[0] & 0x01) {
            return false;
        }

        // MAX31850 provides 14-bit resolution (0.25°C/step)
        // Bit 15 is Sign, Bit 14-2 is Temp, Bit 1 is reserved, Bit 0 is Fault
        int16_t temp_raw = value >> 2;
        temp = (float)temp_raw * 0.25f;
        temp = round(temp * 10.0f) / 10.0f; // Round to 1 decimal place

        return crc==0;
    }

    bool resetAndCheckPresence(_GPIO ioPin) {
        setToOutput(ioPin);
        setPinValue(ioPin, 1);
        _wait_us(TIME_POWER_UP);
        setPinValue(ioPin, 0);
        _wait_us(TIME_RESET_LOW);
        setPinValue(ioPin, 1);
        setToInput(ioPin);
        _wait_us(TIME_POST_RESET_TO_DETECT);

#if MICROBIT_CODAL
        int maxCounts = (int)(TIME_PRESENCE_DETECT/0.1);
#else 
        int maxCounts = (int)(TIME_PRESENCE_DETECT/1);
#endif
        bool presence = false;        
        do {
            presence = presence || (getPinValue(ioPin) == 0);
        } while (maxCounts-- > 0);

        bool release = getPinValue(ioPin)==1;
        return presence && release;
    }

    bool configure(_GPIO ioPin) {
        if(resetAndCheckPresence(ioPin) == false) {
            return false;
        }
        writeByte(ioPin, 0xCC);
        writeByte(ioPin, 0x4E);
        writeByte(ioPin, HIGH_ALARM); 
        writeByte(ioPin, LOW_ALARM); 
        writeByte(ioPin, 0x7F);
        return true;
    }

    bool startConversion(_GPIO ioPin) {
        if(resetAndCheckPresence(ioPin) == false) {
            return false;
        }
        writeByte(ioPin, 0xCC);
        writeByte(ioPin, 0x44, false);
        return readBit(ioPin)==0;
    }

    //%
    float readMax31850(int pin) {
#if MICROBIT_CODAL
#ifdef SOFTDEVICE_PRESENT
        if (!ble_running())
#endif
                configTimer();
#endif
        MicroBitPin *mbp = getPin(pin);
#if MICROBIT_CODAL
        _GPIO gpio = mbp->name;
#else
        gpio_t gpioObj;
        _GPIO gpio = &gpioObj;
        gpio_init(gpio, mbp->name);
#endif

        bool success = false;
        for(int tries=0;tries<MAX_TRIES;tries++) {
            if(configure(gpio)==false) {
                goto return_error;
            }
            if(startConversion(gpio)) {
                success = true;
                break;
            }            
        }

        if(success==false) {
            goto return_error;
        }

        success = false;
        for(int maxIterations = 20; maxIterations>0; maxIterations--) {
            if(readBit(gpio) == 0) {
                success = true;
                break;
            } else {
                uBit.sleep(0);
            }
        }
        if(success==false) {
            goto return_error;
        }

        for(int tries=0;tries<MAX_TRIES;tries++) {
            if(resetAndCheckPresence(gpio)) {
                writeByte(gpio, 0xCC);
                writeByte(gpio, 0xBE);        
                float temp;
                success = readScratchpad(gpio, temp);
                if(success) {
                    setToInput(gpio);
                    return temp;
                }
            }
        } 
return_error:
        setToInput(gpio);
        return -999.0f; // Error sentinel for MAX31850
    }
}
