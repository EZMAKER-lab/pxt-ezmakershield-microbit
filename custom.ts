/**
 * Custom blocks for EZMAKER Shield
 */
//% weight=100 color="#FF5733" icon="\uf12e" block="EZMAKER"
namespace EZMAKER {

    /**
     * Analog input pins (P0, P1, P2)
     */
    export enum EZAnalogPin {
        //% block="P0"
        P0 = AnalogPin.P0,
        //% block="P1"
        P1 = AnalogPin.P1,
        //% block="P2"
        P2 = AnalogPin.P2
    }

    /**
     * Digital pins (P8, P12, P13, P16)
     */
    export enum EZDigitalPin {
        //% block="P8"
        P8 = 108,  // DigitalPin.P8
        //% block="P12"
        P12 = 112, // DigitalPin.P12
        //% block="P13"
        P13 = 113, // DigitalPin.P13
        //% block="P16"
        P16 = 116  // DigitalPin.P16
    }

    /**
     * Control the digital output of the specified pin.
     * @param pin digital pin, eg: EZDigitalPin.P8
     * @param value output value (0 or 1), eg: 1
     */
    //% blockId="ezmaker_write_digital"
    //% block="set digital module on %pin to %value"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=99
    export function writeDigitalPin(pin: EZDigitalPin, value: number): void {
        switch (<number>pin) {
            case 108: pins.digitalWritePin(DigitalPin.P8, value); break;
            case 112: pins.digitalWritePin(DigitalPin.P12, value); break;
            case 113: pins.digitalWritePin(DigitalPin.P13, value); break;
            case 116: pins.digitalWritePin(DigitalPin.P16, value); break;
        }
    }

    // =========================================================================
    // 1. DIY Sensors
    // =========================================================================

    /**
     * Read the raw analog value from the DIY-A sensor (range: 0-1023).
     * @param pin connection port, eg: EZAnalogPin.P0
     */
    //% blockId="EZMAKER_diya_read_raw"
    //% block="read DIY-A sensor raw value (0-1023) on %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=100
    //% subcategory="DIY Sensors"
    export function readDIYARaw(pin: EZAnalogPin): number {
        let p: AnalogPin;
        switch(<number>pin) {
            case AnalogPin.P0: p = AnalogPin.P0; break;
            case AnalogPin.P1: p = AnalogPin.P1; break;
            case AnalogPin.P2: p = AnalogPin.P2; break;
            default: p = AnalogPin.P0;
        }
        return pins.analogReadPin(p);
    }

    /**
     * Read the voltage value from the DIY-A sensor (range: 0-3.3V).
     * @param pin connection port, eg: EZAnalogPin.P0
     */
    //% blockId="EZMAKER_diya_read_voltage"
    //% block="read DIY-A sensor voltage (0-3.3V) on %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=99
    //% subcategory="DIY Sensors"
    export function readDIYAVoltage(pin: EZAnalogPin): number {
        let p: AnalogPin;
        switch(<number>pin) {
            case AnalogPin.P0: p = AnalogPin.P0; break;
            case AnalogPin.P1: p = AnalogPin.P1; break;
            case AnalogPin.P2: p = AnalogPin.P2; break;
            default: p = AnalogPin.P0;
        }
        let raw = pins.analogReadPin(p);
        let voltage = (raw * 3.3) / 1023.0;
        return Math.round(voltage * 100) / 100;
    }

    /**
     * Read the analog value from the DIY-B sensor (range: 0-1023).
     * @param pin connection port, eg: EZAnalogPin.P1
     */
    //% blockId="EZMAKER_diyb_read_analog"
    //% block="read DIY-B sensor analog value (0-1023) on %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=95
    //% subcategory="DIY Sensors"
    export function readDIYBAnalog(pin: EZAnalogPin): number {
        let p: AnalogPin;
        switch(<number>pin) {
            case AnalogPin.P0: p = AnalogPin.P0; break;
            case AnalogPin.P1: p = AnalogPin.P1; break;
            case AnalogPin.P2: p = AnalogPin.P2; break;
            default: p = AnalogPin.P0;
        }
        return pins.analogReadPin(p);
    }

    /**
     * Read the digital input value (true/false) from the DIY-B sensor.
     * @param pin connection port, eg: EZDigitalPin.P8
     */
    //% blockId="EZMAKER_diyb_read_digital"
    //% block="read DIY-B sensor digital input on %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=94
    //% subcategory="DIY Sensors"
    export function readDIYBDigital(pin: EZDigitalPin): boolean {
        let d: DigitalPin;
        switch (<number>pin) {
            case 108: d = DigitalPin.P8; break;
            case 112: d = DigitalPin.P12; break;
            case 113: d = DigitalPin.P13; break;
            case 116: d = DigitalPin.P16; break;
            default: return false;
        }
        return pins.digitalReadPin(d) === 1;
    }

    // =========================================================================
    // 2. Basic Sensors
    // =========================================================================

    export enum MQ2GasType {
        //% block="LPG"
        LPG = 0,
        //% block="CO"
        CO = 1,
        //% block="Smoke"
        Smoke = 2,
        //% block="H2"
        H2 = 3,
        //% block="Propane"
        Propane = 4
    }

    /**
     * Measure the gas concentration (ppm) from the MQ2 gas sensor.
     * @param gasType type of gas, eg: MQ2GasType.LPG
     * @param pin connection port, eg: EZAnalogPin.P0
     */
    //% blockId="EZMAKER_mq2_read"
    //% block="read MQ2 gas sensor %gasType (ppm) on %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=92
    //% subcategory="Basic Sensors"
    export function readMQ2(gasType: MQ2GasType, pin: EZAnalogPin): number {
        let p: AnalogPin;
        switch(<number>pin) {
            case AnalogPin.P0: p = AnalogPin.P0; break;
            case AnalogPin.P1: p = AnalogPin.P1; break;
            case AnalogPin.P2: p = AnalogPin.P2; break;
            default: p = AnalogPin.P0;
        }

        let raw = pins.analogReadPin(p);
        let vOut = (raw * 3.3) / 1023.0;

        // Vout limit (0.05V ~ 3.25V)
        let v = vOut;
        if (v < 0.05) {
            v = 0.05;
        } else if (v > 3.25) {
            v = 3.25;
        }

        // Rs calculation (Load resistance RL = 10kOhm, R0 = 1045.0Ohm)
        let rs = 10000.0 * (3.3 - v) / v;
        let r0 = 1045.0;
        let ratio = rs / r0;

        let ppm = 0;
        switch (gasType) {
            case MQ2GasType.LPG:
                ppm = 574.25 * Math.pow(ratio, -2.222);
                break;
            case MQ2GasType.CO:
                ppm = 605.18 * Math.pow(ratio, -3.937);
                break;
            case MQ2GasType.Smoke:
                ppm = 36974.00 * Math.pow(ratio, -3.109);
                break;
            case MQ2GasType.H2:
                ppm = 977.26 * Math.pow(ratio, -3.638);
                break;
            case MQ2GasType.Propane:
                ppm = 658.71 * Math.pow(ratio, -2.168);
                break;
        }

        return Math.round(ppm * 100) / 100;
    }

    /**
     * Read the raw analog value from the light sensor (range: 0-1023).
     * @param pin connection port, eg: EZAnalogPin.P1
     */
    //% blockId="EZMAKER_light_read_raw"
    //% block="read light sensor raw value (0-1023) on %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=85
    //% subcategory="Basic Sensors"
    export function readLightRaw(pin: EZAnalogPin): number {
        let p: AnalogPin;
        switch(<number>pin) {
            case AnalogPin.P0: p = AnalogPin.P0; break;
            case AnalogPin.P1: p = AnalogPin.P1; break;
            case AnalogPin.P2: p = AnalogPin.P2; break;
            default: p = AnalogPin.P0;
        }
        return pins.analogReadPin(p);
    }

    /**
     * Read the converted percentage value from the light sensor (range: 0-100).
     * @param pin connection port, eg: EZAnalogPin.P1
     */
    //% blockId="EZMAKER_light_read_percentage"
    //% block="read light sensor percentage (0-100) on %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=84
    //% subcategory="Basic Sensors"
    export function readLightPercentage(pin: EZAnalogPin): number {
        let raw = readLightRaw(pin);
        let percent = (raw * 100) / 1023.0;
        return Math.round(percent);
    }

    /**
     * Read the raw analog value from the sound sensor (range: 0-1023).
     * @param pin connection port, eg: EZAnalogPin.P2
     */
    //% blockId="EZMAKER_sound_read_raw"
    //% block="read sound sensor raw value (0-1023) on %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=82
    //% subcategory="Basic Sensors"
    export function readSoundRaw(pin: EZAnalogPin): number {
        let p: AnalogPin;
        switch(<number>pin) {
            case AnalogPin.P0: p = AnalogPin.P0; break;
            case AnalogPin.P1: p = AnalogPin.P1; break;
            case AnalogPin.P2: p = AnalogPin.P2; break;
            default: p = AnalogPin.P0;
        }
        return pins.analogReadPin(p);
    }

    /**
     * Read the converted percentage value from the sound sensor (range: 0-100).
     * @param pin connection port, eg: EZAnalogPin.P2
     */
    //% blockId="EZMAKER_sound_read_percentage"
    //% block="read sound sensor percentage (0-100) on %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=81
    //% subcategory="Basic Sensors"
    export function readSoundPercentage(pin: EZAnalogPin): number {
        let raw = readSoundRaw(pin);
        let percent = (raw * 100) / 1023.0;
        return Math.round(percent);
    }

    /**
     * Read the voltage value from the voltage sensor (range: 0-16.5V).
     * @param pin connection port, eg: EZAnalogPin.P2
     */
    //% blockId="EZMAKER_voltage_read"
    //% block="read voltage sensor (0-16.5V) on %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=60
    //% subcategory="Basic Sensors"
    export function readVoltage(pin: EZAnalogPin): number {
        let p: AnalogPin;
        switch(<number>pin) {
            case AnalogPin.P0: p = AnalogPin.P0; break;
            case AnalogPin.P1: p = AnalogPin.P1; break;
            case AnalogPin.P2: p = AnalogPin.P2; break;
            default: p = AnalogPin.P0;
        }
        let raw = pins.analogReadPin(p);
        let voltage = (raw * 16.5) / 1023.0;
        return Math.round(voltage * 100) / 100;
    }

    // =========================================================================
    // 3. Temp & Humidity
    // =========================================================================

    //% shim=EZMAKER::readMax31850
    function readMax31850Shim(pin: number): number {
        return 25.5;
    }

    /**
     * Read the temperature value (°C) from the MAX31850 high-temperature sensor.
     * @param port connection port, eg: EZDigitalPin.P12
     */
    //% blockId="EZMAKER_max31850_read"
    //% block="read high temp sensor temperature (°C) on %port"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=91
    //% subcategory="Temp & Humidity"
    //% hiddenParts="temperature"
    export function readMax31850(port: EZDigitalPin): number {
        let p: DigitalPin;
        switch (<number>port) {
            case 108: p = DigitalPin.P8; break;
            case 112: p = DigitalPin.P12; break;
            case 113: p = DigitalPin.P13; break;
            case 116: p = DigitalPin.P16; break;
            default: return -999;
        }
        let temp = readMax31850Shim(p);
        if (temp === -999) return -999;
        return Math.round(temp * 10) / 10;
    }

    let lastDS18B20Time = -2000;
    let lastDS18B20Temp = -273;
    let lastDS18B20Port = -1;

    /**
     * Read the temperature value (°C) from the DS18B20 waterproof temperature sensor.
     * @param port connection port, eg: EZDigitalPin.P13
     */
    //% blockId="EZMAKER_ds18b20_read"
    //% block="read DS18B20 temperature sensor (°C) on %port"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=80
    //% subcategory="Temp & Humidity"
    //% hiddenParts="temperature"
    export function readDS18B20(port: EZDigitalPin): number {
        let currentTime = input.runningTime();
        if (currentTime - lastDS18B20Time < 1000 && lastDS18B20Port === <number>port) {
            if (lastDS18B20Temp !== -273) {
                return lastDS18B20Temp;
            }
        }

        lastDS18B20Time = currentTime;
        lastDS18B20Port = <number>port;

        let temp = 0;
        // Resolve to static literal pins to prevent simulator error: "parts failed to read pin(s) from callsite for: dstemp.celsius"
        switch (port) {
            case EZDigitalPin.P8:
                temp = dstemp.celsius(DigitalPin.P8);
                break;
            case EZDigitalPin.P12:
                temp = dstemp.celsius(DigitalPin.P12);
                break;
            case EZDigitalPin.P13:
                temp = dstemp.celsius(DigitalPin.P13);
                break;
            case EZDigitalPin.P16:
                temp = dstemp.celsius(DigitalPin.P16);
                break;
            default:
                return -273;
        }

        if (temp < -100) {
            lastDS18B20Temp = -999;
            return lastDS18B20Temp;
        }

        lastDS18B20Temp = Math.round(temp * 100) / 100;
        return lastDS18B20Temp;
    }

    export enum DHT11DataType {
        //% block="temperature (°C)"
        Temperature = 0,
        //% block="humidity (%)"
        Humidity = 1
    }

    let lastDHT11Time = -2000;
    let lastTemperature = -1;
    let lastHumidity = -1;
    let lastDHT11Port = -1;
    let lastErrorCode = -1;

    /**
     * Read temperature or humidity from the DHT11 sensor.
     * @param port connection port, eg: EZDigitalPin.P16
     * @param dataType data type to read (Temperature or Humidity)
     */
    //% blockId="EZMAKER_dht11_read"
    //% block="read DHT11 %dataType on %port"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=70
    //% subcategory="Temp & Humidity"
    export function readDHT11(port: EZDigitalPin, dataType: DHT11DataType): number {
        let d: DigitalPin;
        switch (<number>port) {
            case 108: d = DigitalPin.P8; break;
            case 112: d = DigitalPin.P12; break;
            case 113: d = DigitalPin.P13; break;
            case 116: d = DigitalPin.P16; break;
            default: return -1;
        }

        let currentTime = input.runningTime();
        if (currentTime - lastDHT11Time < 1000 && lastDHT11Port === <number>port) {
            if (lastTemperature !== -1 && lastHumidity !== -1) {
                return dataType === DHT11DataType.Temperature ? lastTemperature : lastHumidity;
            } else {
                return lastErrorCode;
            }
        }

        lastDHT11Time = currentTime;
        lastDHT11Port = <number>port;

        let dataArray: boolean[] = [];
        for (let i = 0; i < 40; i++) dataArray.push(false);

        pins.digitalWritePin(d, 0);
        basic.pause(18);
        
        pins.setPull(d, PinPullMode.PullUp);
        pins.digitalReadPin(d);
        
        control.waitMicros(40);
        if (pins.digitalReadPin(d) === 1) {
            lastErrorCode = -4; return -4; 
        }

        while (pins.digitalReadPin(d) === 0);
        while (pins.digitalReadPin(d) === 1);

        for (let i = 0; i < 40; i++) {
            while (pins.digitalReadPin(d) === 1); 
            while (pins.digitalReadPin(d) === 0); 
            
            control.waitMicros(28); 
            
            if (pins.digitalReadPin(d) === 1) {
                dataArray[i] = true;
            }
        }

        let bytes = [0, 0, 0, 0, 0];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 8; j++) {
                if (dataArray[8 * i + j]) {
                    bytes[i] += 1 << (7 - j);
                }
            }
        }

        if (bytes[0] === 0 && bytes[1] === 0 && bytes[2] === 0 && bytes[3] === 0) { lastErrorCode = -7; return -7; }
        
        let checksumTmp = bytes[0] + bytes[1] + bytes[2] + bytes[3];
        if (checksumTmp >= 512) checksumTmp -= 512;
        if (checksumTmp >= 256) checksumTmp -= 256;
        if (bytes[4] !== checksumTmp) { lastErrorCode = -8; return -8; }

        lastHumidity = bytes[0] + (bytes[1] / 10.0);
        lastTemperature = bytes[2] + (bytes[3] / 10.0);
        lastErrorCode = 0;
        
        return dataType === DHT11DataType.Temperature ? lastTemperature : lastHumidity;
    }

    // =========================================================================
    // 4. Ultrasonic
    // =========================================================================

    function getDigitalPin(pin: EZDigitalPin): DigitalPin {
        switch (pin) {
            case EZDigitalPin.P8: return DigitalPin.P8;
            case EZDigitalPin.P12: return DigitalPin.P12;
            case EZDigitalPin.P13: return DigitalPin.P13;
            case EZDigitalPin.P16: return DigitalPin.P16;
            default: return DigitalPin.P8;
        }
    }

    /**
     * Read the distance (cm) using the ultrasonic sensor.
     * @param port connection port, eg: EZDigitalPin.P8
     */
    //% blockId="EZMAKER_ultrasonic_distance"
    //% block="read ultrasonic distance (cm) on %port"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=50
    //% subcategory="Ultrasonic"
    export function ultrasonicDistance(port: EZDigitalPin): number {
        let pin = getDigitalPin(port);
        
        // send pulse
        pins.setPull(pin, PinPullMode.PullNone);
        pins.digitalWritePin(pin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(pin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(pin, 0);

        // read pulse
        let d = pins.pulseIn(pin, PulseValue.High, 29000); // max 500cm * 58
        let distance = Math.idiv(d, 41); // Adjusted scale to 41 for single-pin transit delay offset
        
        return distance > 0 ? distance : 0;
    }

    // =========================================================================
    // 5. NeoPixel
    // =========================================================================

    export enum NeoPixelType {
        //% block="1 LED"
        Single = 1,
        //% block="bar (7 LEDs)"
        Bar = 7,
        //% block="ring (12 LEDs)"
        Ring = 12
    }

    let neopixelStrips: neopixel.Strip[] = [];

    function getNeoPixelStrip(pin: EZDigitalPin, type: NeoPixelType): neopixel.Strip {
        let p = <number>pin;
        if (!neopixelStrips[p]) {
            // Resolve to static literal pins to prevent simulator error: "parts failed to read pin(s) from callsite for: neopixel.create"
            switch (pin) {
                case EZDigitalPin.P8:
                    neopixelStrips[p] = neopixel.create(DigitalPin.P8, <number>type, NeoPixelMode.RGB);
                    break;
                case EZDigitalPin.P12:
                    neopixelStrips[p] = neopixel.create(DigitalPin.P12, <number>type, NeoPixelMode.RGB);
                    break;
                case EZDigitalPin.P13:
                    neopixelStrips[p] = neopixel.create(DigitalPin.P13, <number>type, NeoPixelMode.RGB);
                    break;
                case EZDigitalPin.P16:
                    neopixelStrips[p] = neopixel.create(DigitalPin.P16, <number>type, NeoPixelMode.RGB);
                    break;
                default:
                    neopixelStrips[p] = neopixel.create(DigitalPin.P8, <number>type, NeoPixelMode.RGB);
            }
        }
        return neopixelStrips[p];
    }

    /**
     * Set the color of all LEDs on the NeoPixel strip at the specified pin.
     * @param npType NeoPixel type, eg: NeoPixelType.Single
     * @param pin connection pin, eg: EZDigitalPin.P8
     * @param color LED color
     */
    //% blockId="EZMAKER_neopixel_set_color_all"
    //% block="set %npType neopixel on %pin to %color"
    //% color.shadow="colorNumberPicker" color.defl=0x0000FF
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=90
    //% subcategory="NeoPixel"
    //% hiddenParts="neopixel"
    export function setNeoPixelColorAll(npType: NeoPixelType, pin: EZDigitalPin, color: number): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.showColor(color);
    }

    /**
     * Set the color of a specific LED on the NeoPixel strip.
     * @param npType NeoPixel type, eg: NeoPixelType.Single
     * @param pin connection pin, eg: EZDigitalPin.P8
     * @param index LED index (0-based), eg: 0
     * @param color LED color
     */
    //% blockId="EZMAKER_neopixel_set_pixel_color"
    //% block="set %npType neopixel on %pin pixel at %index to %color"
    //% color.shadow="colorNumberPicker" color.defl=0x0000FF
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=89
    //% subcategory="NeoPixel"
    //% hiddenParts="neopixel"
    export function setNeoPixelPixelColor(npType: NeoPixelType, pin: EZDigitalPin, index: number, color: number): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.setPixelColor(index, color);
        strip.show();
    }

    /**
     * Set the brightness of the NeoPixel strip at the specified pin (0-255).
     * @param npType NeoPixel type, eg: NeoPixelType.Single
     * @param pin connection pin, eg: EZDigitalPin.P8
     * @param brightness brightness level (0-255), eg: 128
     */
    //% blockId="EZMAKER_neopixel_set_brightness"
    //% block="set %npType neopixel on %pin brightness to %brightness"
    //% brightness.min=0 brightness.max=255
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=88
    //% subcategory="NeoPixel"
    //% hiddenParts="neopixel"
    export function setNeoPixelBrightness(npType: NeoPixelType, pin: EZDigitalPin, brightness: number): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.setBrightness(brightness);
        strip.show();
    }

    /**
     * Turn off all LEDs on the NeoPixel strip at the specified pin.
     * @param npType NeoPixel type, eg: NeoPixelType.Single
     * @param pin connection pin, eg: EZDigitalPin.P8
     */
    //% blockId="EZMAKER_neopixel_clear"
    //% block="clear %npType neopixel on %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=87
    //% subcategory="NeoPixel"
    //% hiddenParts="neopixel"
    export function clearNeoPixel(npType: NeoPixelType, pin: EZDigitalPin): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.clear();
        strip.show();
    }

    /**
     * Set the colors of all 7 pixels on the bar NeoPixel strip at once.
     * @param pin connection pin, eg: EZDigitalPin.P8
     * @param c1 pixel 0 color
     * @param c2 pixel 1 color
     * @param c3 pixel 2 color
     * @param c4 pixel 3 color
     * @param c5 pixel 4 color
     * @param c6 pixel 5 color
     * @param c7 pixel 6 color
     */
    //% blockId="EZMAKER_neopixel_set_bar"
    //% block="bar neopixel on %pin : %c1 %c2 %c3 %c4 %c5 %c6 %c7"
    //% inlineInputMode=inline
    //% c1.shadow="colorNumberPicker" c1.defl=0xFF0000
    //% c2.shadow="colorNumberPicker" c2.defl=0xFF7F00
    //% c3.shadow="colorNumberPicker" c3.defl=0xFFFF00
    //% c4.shadow="colorNumberPicker" c4.defl=0x00FF00
    //% c5.shadow="colorNumberPicker" c5.defl=0x0000FF
    //% c6.shadow="colorNumberPicker" c6.defl=0x4B0082
    //% c7.shadow="colorNumberPicker" c7.defl=0x8A2BE2
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=86
    //% subcategory="NeoPixel"
    //% hiddenParts="neopixel"
    export function setNeoPixelBar(pin: EZDigitalPin, c1: number, c2: number, c3: number, c4: number, c5: number, c6: number, c7: number): void {
        let strip = getNeoPixelStrip(pin, NeoPixelType.Bar);
        strip.setPixelColor(0, c1);
        strip.setPixelColor(1, c2);
        strip.setPixelColor(2, c3);
        strip.setPixelColor(3, c4);
        strip.setPixelColor(4, c5);
        strip.setPixelColor(5, c6);
        strip.setPixelColor(6, c7);
        strip.show();
    }

    /**
     * Set the colors of all 12 pixels on the ring NeoPixel strip at once.
     * @param pin connection pin, eg: EZDigitalPin.P8
     */
    //% blockId="EZMAKER_neopixel_set_ring"
    //% block="ring neopixel on %pin : %c1 %c2 %c3 %c4 %c5 %c6 %c7 %c8 %c9 %c10 %c11 %c12"
    //% inlineInputMode=inline
    //% c1.shadow="colorNumberPicker" c1.defl=0xFF0000
    //% c2.shadow="colorNumberPicker" c2.defl=0xFF3F00
    //% c3.shadow="colorNumberPicker" c3.defl=0xFF7F00
    //% c4.shadow="colorNumberPicker" c4.defl=0xFFFF00
    //% c5.shadow="colorNumberPicker" c5.defl=0x7FFF00
    //% c6.shadow="colorNumberPicker" c6.defl=0x00FF00
    //% c7.shadow="colorNumberPicker" c7.defl=0x00FF7F
    //% c8.shadow="colorNumberPicker" c8.defl=0x00FFFF
    //% c9.shadow="colorNumberPicker" c9.defl=0x0000FF
    //% c10.shadow="colorNumberPicker" c10.defl=0x4B0082
    //% c11.shadow="colorNumberPicker" c11.defl=0x8A2BE2
    //% c12.shadow="colorNumberPicker" c12.defl=0xFF00FF
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=85
    //% subcategory="NeoPixel"
    //% hiddenParts="neopixel"
    export function setNeoPixelRing(pin: EZDigitalPin, c1: number, c2: number, c3: number, c4: number, c5: number, c6: number, c7: number, c8: number, c9: number, c10: number, c11: number, c12: number): void {
        let strip = getNeoPixelStrip(pin, NeoPixelType.Ring);
        strip.setPixelColor(0, c1);
        strip.setPixelColor(1, c2);
        strip.setPixelColor(2, c3);
        strip.setPixelColor(3, c4);
        strip.setPixelColor(4, c5);
        strip.setPixelColor(5, c6);
        strip.setPixelColor(6, c7);
        strip.setPixelColor(7, c8);
        strip.setPixelColor(8, c9);
        strip.setPixelColor(9, c10);
        strip.setPixelColor(10, c11);
        strip.setPixelColor(11, c12);
        strip.show();
    }

    /**
     * Show a rainbow effect on the NeoPixel strip.
     * @param npType NeoPixel type, eg: NeoPixelType.Bar
     * @param pin connection pin, eg: EZDigitalPin.P8
     * @param startHue starting hue value (1-360), eg: 1
     * @param endHue ending hue value (1-360), eg: 360
     */
    //% blockId="EZMAKER_neopixel_show_rainbow"
    //% block="show rainbow on %npType neopixel on %pin from %startHue to %endHue"
    //% startHue.min=1 startHue.max=360 startHue.defl=1
    //% endHue.min=1 endHue.max=360 endHue.defl=360
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=84
    //% subcategory="NeoPixel"
    //% hiddenParts="neopixel"
    export function showNeoPixelRainbow(npType: NeoPixelType, pin: EZDigitalPin, startHue: number = 1, endHue: number = 360): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.showRainbow(startHue, endHue);
        strip.show();
    }

    /**
     * Shift the LED colors on the NeoPixel strip by a given offset. Shifted pixels are cleared.
     * @param npType NeoPixel type, eg: NeoPixelType.Bar
     * @param pin connection pin, eg: EZDigitalPin.P8
     * @param offset shift offset amount, eg: 1
     */
    //% blockId="EZMAKER_neopixel_shift"
    //% block="shift %npType neopixel on %pin by %offset"
    //% offset.defl=1
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=83
    //% subcategory="NeoPixel"
    //% hiddenParts="neopixel"
    export function shiftNeoPixel(npType: NeoPixelType, pin: EZDigitalPin, offset: number = 1): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.shift(offset);
        strip.show();
    }

    /**
     * Rotate the LED colors on the NeoPixel strip by a given offset.
     * @param npType NeoPixel type, eg: NeoPixelType.Bar
     * @param pin connection pin, eg: EZDigitalPin.P8
     * @param offset rotate offset amount, eg: 1
     */
    //% blockId="EZMAKER_neopixel_rotate"
    //% block="rotate %npType neopixel on %pin by %offset"
    //% offset.defl=1
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=82
    //% subcategory="NeoPixel"
    //% hiddenParts="neopixel"
    export function rotateNeoPixel(npType: NeoPixelType, pin: EZDigitalPin, offset: number = 1): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.rotate(offset);
        strip.show();
    }

    /**
     * Show a bar graph representation on the NeoPixel strip based on a value and its maximum limit.
     * @param npType NeoPixel type, eg: NeoPixelType.Bar
     * @param pin connection pin, eg: EZDigitalPin.P8
     * @param value current value to display
     * @param high maximum value limit, eg: 255
     */
    //% blockId="EZMAKER_neopixel_show_bar_graph"
    //% block="show bar graph on %npType neopixel on %pin of %value up to %high"
    //% high.defl=255
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=81
    //% subcategory="NeoPixel"
    //% hiddenParts="neopixel"
    export function showNeoPixelBarGraph(npType: NeoPixelType, pin: EZDigitalPin, value: number, high: number = 255): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.showBarGraph(value, high);
    }
}
