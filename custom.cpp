#include "pxt.h"
#include <cstdint>
#include <math.h>

using namespace pxt;

// dstemp.cpp에 존재하는 검증된 1-Wire 비트뱅잉 함수들 전방 선언
namespace dstemp {
#if MICROBIT_CODAL
    typedef int _GPIO;
#else
    typedef gpio_t* _GPIO;
#endif

    void writeBit(_GPIO ioPin, bool one, bool finalYield = true);
    void writeByte(_GPIO ioPin, uint8_t b, bool finalYield = true);
    bool readBit(_GPIO ioPin);
    bool resetAndCheckPresence(_GPIO ioPin);
}

namespace max31850 {

    // MAX31850용 Scratchpad 읽기 및 온도 변환 (dstemp의 검증된 readBit 호출)
    bool readScratchpad(dstemp::_GPIO ioPin, float& temp) {
        uint8_t data[9];
        int16_t value;
        uint8_t crc = 0;
        
        for(int j = 0; j < 9; j++) {
            uint8_t b = 0;
            for(int i = 0; i < 8; i++) {
                bool bit = dstemp::readBit(ioPin);
                b |= (bit << i);
                bool lsb = crc & 0x1;
                crc >>= 1;
                if(bit != lsb)
                    crc ^= 0x8C;
            }
            data[j] = b;
        }     

        // 단선 예외 처리 (0x00 또는 0xFF 도배 검사)
        bool allZero = true;
        bool allOne = true;
        for (int i = 0; i < 9; i++) {
            if (data[i] != 0x00) allZero = false;
            if (data[i] != 0xFF) allOne = false;
        }
        if (allZero || allOne) {
            return false;
        }

        value = data[1];
        value <<= 8;
        value |= data[0];
        
        // Fault detection (LSB Bit 0 is 1 if fault)
        if (data[0] & 0x01) {
            return false;
        }

        // MAX31850 14비트 전용 부동소수점 변환 (0.25°C 해상도)
        int16_t temp_raw = value >> 2;
        temp = (float)temp_raw * 0.25f;
        temp = round(temp * 10.0f) / 10.0f; // 소수점 1자리 반올림

        return crc == 0;
    }

    //%
    float readMax31850(int pin) {
        MicroBitPin *mbp = getPin(pin);
        if (!mbp) return -999.0f;

#if MICROBIT_CODAL
        dstemp::_GPIO gpio = mbp->name;
#else
        gpio_t gpioObj;
        dstemp::_GPIO gpio = &gpioObj;
        gpio_init(gpio, mbp->name);
#endif

        bool success = false;
        
        // 1. 통신 초기화 및 측정 개시 (Convert T)
        for(int tries = 0; tries < 3; tries++) {
            if(dstemp::resetAndCheckPresence(gpio)) {
                dstemp::writeByte(gpio, 0xCC); // Skip ROM
                dstemp::writeByte(gpio, 0x44, false); // Convert T
                success = true;
                break;
            }
        }

        if(success == false) {
            return -999.0f;
        }

        // 2. 변환 완료 대기 (MAX31850 변환에 충분한 100ms 대기)
        uBit.sleep(100);

        // 3. 데이터 읽기 시도 (Read Scratchpad)
        for(int tries = 0; tries < 3; tries++) {
            if(dstemp::resetAndCheckPresence(gpio)) {
                dstemp::writeByte(gpio, 0xCC); // Skip ROM
                dstemp::writeByte(gpio, 0xBE); // Read Scratchpad
                float temp;
                success = readScratchpad(gpio, temp);
                if(success) {
                    return temp;
                }
            }
        } 

        return -999.0f;
    }
}
