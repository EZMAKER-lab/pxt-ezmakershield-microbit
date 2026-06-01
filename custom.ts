/**
 * Custom blocks for EZMAKER Shield
 */
//% weight=100 color="#FF5733" icon="\uf12e" block="EZMAKER"
//% groups="['DIY-A 센서', '네오픽셀', '수중/접촉온도센서(DS18B20)', '온습도 센서(DHT11)', '초음파 센서']"
namespace EZMAKER {

    /**
     * 아날로그 입력 전용 핀 (P0, P1, P2)
     */
    export enum EZAnalogPin {
        //% block="P0"
        P0 = AnalogPin.P0,
        //% block="P1"
        P1 = AnalogPin.P1,
        //% block="P2"
        P2 = AnalogPin.P2
    }

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
     * 지정한 핀의 디지털 출력을 제어합니다. (임시 부활: 서브메뉴 출력 목적)
     * @param pin 디지털 전용 핀
     * @param value 출력값 (0 또는 1)
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
    // 1. DIY-A 센서 (아날로그)
    // =========================================================================

    /**
     * DIY-A 센서의 아날로그 원시값(Raw)을 읽습니다. (범위: 0~1023)
     * @param pin 연결 핀
     */
    //% blockId="EZMAKER_diya_read_raw"
    //% block="DIY-A 센서 아날로그 원시값(0~1023) | 연결포트 %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=100
    //% subcategory="DIY-A 센서"
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
     * DIY-A 센서의 전압(V) 환산 값을 읽습니다. (범위: 0~3.3V)
     * @param pin 연결 핀
     */
    //% blockId="EZMAKER_diya_read_voltage"
    //% block="DIY-A 센서 전압(0~3.3V) | 연결포트 %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=99
    //% subcategory="DIY-A 센서"
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

    // =========================================================================
    // 1.5. DIY-B 센서 (아날로그/디지털 겸용)
    // =========================================================================

    /**
     * DIY-B 센서의 아날로그 값(0~1023)을 읽습니다.
     * @param pin 연결 핀
     */
    //% blockId="EZMAKER_diyb_read_analog"
    //% block="DIY-B 센서 아날로그 값(0~1023) | 연결포트 %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=95
    //% subcategory="DIY-B 센서"
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
     * DIY-B 센서의 디지털 입력값(참/거짓)을 읽습니다.
     * @param pin 연결 핀
     */
    //% blockId="EZMAKER_diyb_read_digital"
    //% block="DIY-B 센서 디지털 입력값 | 연결포트 %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=94
    //% subcategory="DIY-B 센서"
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
    // 1.7. 가스 센서 (MQ2)
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
     * MQ2 가스 센서로부터 가스 농도(ppm)를 측정합니다.
     * @param gasType 가스 종류 (LPG, CO, Smoke, H2, Propane)
     * @param pin 연결 핀
     */
    //% blockId="EZMAKER_mq2_read"
    //% block="가스 센서(MQ2) %gasType 값(ppm) | 연결포트 %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=92
    //% subcategory="가스 센서"
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

        // Vout 제한 (0.05V ~ 3.25V)
        let v = vOut;
        if (v < 0.05) {
            v = 0.05;
        } else if (v > 3.25) {
            v = 3.25;
        }

        // Rs 계산 (부하저항 RL = 10kOhm, R0 = 1045.0Ohm)
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

    // =========================================================================
    // 1.8. 고온 센서 (MAX31850)
    // =========================================================================

    //% shim=max31850::readMax31850
    function readMax31850Shim(pin: number): number {
        return 25.5;
    }

    /**
     * MAX31850 고온 센서의 온도(°C) 값을 읽습니다. (범위: -270°C ~ 1372°C)
     * @param port 연결 포트
     */
    //% blockId="EZMAKER_max31850_read"
    //% block="고온 센서 온도(°C) | 연결포트 %port"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=91
    //% subcategory="고온 센서"
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

    // =========================================================================
    // 2. 네오픽셀
    // =========================================================================

    export enum NeoPixelType {
        //% block="1 LED"
        Single = 1,
        //% block="Bar (7 LEDs)"
        Bar = 7,
        //% block="Ring (12 LEDs)"
        Ring = 12
    }

    let neopixelStrips: neopixel.Strip[] = [];

    function getNeoPixelStrip(pin: EZDigitalPin, type: NeoPixelType): neopixel.Strip {
        let p = <number>pin;
        if (!neopixelStrips[p]) {
            neopixelStrips[p] = neopixel.create(p, <number>type, NeoPixelMode.RGB);
        }
        return neopixelStrips[p];
    }

    /**
     * 지정한 핀의 네오픽셀 전체 색상을 설정합니다.
     */
    //% blockId="EZMAKER_neopixel_set_color_all"
    //% block="set %npType neopixel on %pin to %color"
    //% color.shadow="colorNumberPicker" color.defl=0x0000FF
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=90
    //% subcategory="네오픽셀"
    export function setNeoPixelColorAll(npType: NeoPixelType, pin: EZDigitalPin, color: number): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.showColor(color);
    }

    /**
     * 네오픽셀의 특정 순번 LED 색상만 변경합니다.
     */
    //% blockId="EZMAKER_neopixel_set_pixel_color"
    //% block="set %npType neopixel on %pin pixel at %index to %color"
    //% color.shadow="colorNumberPicker" color.defl=0x0000FF
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=89
    //% subcategory="네오픽셀"
    export function setNeoPixelPixelColor(npType: NeoPixelType, pin: EZDigitalPin, index: number, color: number): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.setPixelColor(index, color);
        strip.show();
    }

    /**
     * 지정한 핀의 네오픽셀 밝기를 조절합니다. (0~255)
     */
    //% blockId="EZMAKER_neopixel_set_brightness"
    //% block="set %npType neopixel on %pin brightness to %brightness"
    //% brightness.min=0 brightness.max=255
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=88
    //% subcategory="네오픽셀"
    export function setNeoPixelBrightness(npType: NeoPixelType, pin: EZDigitalPin, brightness: number): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.setBrightness(brightness);
        strip.show();
    }

    /**
     * 지정한 핀의 모든 네오픽셀 불빛을 끕니다.
     */
    //% blockId="EZMAKER_neopixel_clear"
    //% block="clear %npType neopixel on %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=87
    //% subcategory="네오픽셀"
    export function clearNeoPixel(npType: NeoPixelType, pin: EZDigitalPin): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.clear();
        strip.show();
    }

    /**
     * BAR 네오픽셀 (7 LEDs) 의 각 픽셀 색상을 한 번에 지정합니다.
     */
    //% blockId="EZMAKER_neopixel_set_bar"
    //% block="BAR neopixel on %pin : %c1 %c2 %c3 %c4 %c5 %c6 %c7"
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
    //% subcategory="네오픽셀"
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
     * RING 네오픽셀 (12 LEDs) 의 각 픽셀 색상을 한 번에 지정합니다.
     */
    //% blockId="EZMAKER_neopixel_set_ring"
    //% block="RING neopixel on %pin : %c1 %c2 %c3 %c4 %c5 %c6 %c7 %c8 %c9 %c10 %c11 %c12"
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
    //% subcategory="네오픽셀"
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
     * 네오픽셀에 무지개 색상 효과를 띄웁니다.
     * @param startHue 시작 색상 (1~360)
     * @param endHue 끝 색상 (1~360)
     */
    //% blockId="EZMAKER_neopixel_show_rainbow"
    //% block="show rainbow on %npType neopixel on %pin from %startHue to %endHue"
    //% startHue.min=1 startHue.max=360 startHue.defl=1
    //% endHue.min=1 endHue.max=360 endHue.defl=360
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=84
    //% subcategory="네오픽셀"
    export function showNeoPixelRainbow(npType: NeoPixelType, pin: EZDigitalPin, startHue: number = 1, endHue: number = 360): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.showRainbow(startHue, endHue);
        strip.show();
    }

    /**
     * 네오픽셀 색상을 지정한 칸 수만큼 밀어냅니다(Shift). 밀려난 자리는 꺼집니다.
     * @param offset 이동시킬 칸 수
     */
    //% blockId="EZMAKER_neopixel_shift"
    //% block="shift %npType neopixel on %pin by %offset"
    //% offset.defl=1
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=83
    //% subcategory="네오픽셀"
    export function shiftNeoPixel(npType: NeoPixelType, pin: EZDigitalPin, offset: number = 1): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.shift(offset);
        strip.show();
    }

    /**
     * 네오픽셀 색상을 지정한 칸 수만큼 회전시킵니다(Rotate). 끝으로 간 색상은 처음으로 되돌아옵니다.
     * @param offset 회전시킬 칸 수
     */
    //% blockId="EZMAKER_neopixel_rotate"
    //% block="rotate %npType neopixel on %pin by %offset"
    //% offset.defl=1
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=82
    //% subcategory="네오픽셀"
    export function rotateNeoPixel(npType: NeoPixelType, pin: EZDigitalPin, offset: number = 1): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.rotate(offset);
        strip.show();
    }

    /**
     * 측정값(센서값 등)을 최대치와 비교하여 막대그래프 형태로 표시합니다.
     * @param value 현재 측정값
     * @param high 측정 최대치
     */
    //% blockId="EZMAKER_neopixel_show_bar_graph"
    //% block="show bar graph on %npType neopixel on %pin of %value up to %high"
    //% high.defl=255
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=81
    //% subcategory="네오픽셀"
    export function showNeoPixelBarGraph(npType: NeoPixelType, pin: EZDigitalPin, value: number, high: number = 255): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.showBarGraph(value, high);
    }

    // =========================================================================
    // 2.5. 밝기 센서 (CDS)
    // =========================================================================

    /**
     * 밝기 센서의 아날로그 원시값(0~1023)을 읽습니다.
     * @param pin 연결 핀
     */
    //% blockId="EZMAKER_light_read_raw"
    //% block="밝기 센서 아날로그 값(0~1023) | 연결포트 %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=85
    //% subcategory="밝기 센서"
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
     * 밝기 센서의 백분율 변환 값(0~100)을 읽습니다.
     * @param pin 연결 핀
     */
    //% blockId="EZMAKER_light_read_percentage"
    //% block="밝기 센서 변환 값(0~100) | 연결포트 %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=84
    //% subcategory="밝기 센서"
    export function readLightPercentage(pin: EZAnalogPin): number {
        let raw = readLightRaw(pin);
        let percent = (raw * 100) / 1023.0;
        return Math.round(percent);
    }

    // =========================================================================
    // 2.7. 소리 센서
    // =========================================================================

    /**
     * 소리 센서의 아날로그 원시값(0~1023)을 읽습니다.
     * @param pin 연결 핀
     */
    //% blockId="EZMAKER_sound_read_raw"
    //% block="소리 센서 아날로그 값(0~1023) | 연결포트 %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=82
    //% subcategory="소리 센서"
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
     * 소리 센서의 백분율 변환 값(0~100)을 읽습니다.
     * @param pin 연결 핀
     */
    //% blockId="EZMAKER_sound_read_percentage"
    //% block="소리 센서 변환 값(0~100) | 연결포트 %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=81
    //% subcategory="소리 센서"
    export function readSoundPercentage(pin: EZAnalogPin): number {
        let raw = readSoundRaw(pin);
        let percent = (raw * 100) / 1023.0;
        return Math.round(percent);
    }

    // =========================================================================
    // 3. 수중/접촉온도센서 (DS18B20)
    // =========================================================================

    let lastDS18B20Time = -2000;
    let lastDS18B20Temp = -273;
    let lastDS18B20Port = -1;

    /**
     * DS18B20 수중/접촉온도센서의 온도(°C) 값을 읽습니다.
     * @param port 연결 포트
     */
    //% blockId="EZMAKER_ds18b20_read"
    //% block="수중/접촉온도센서(DS18B20) 온도(°C) | 연결포트 %port"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=80
    //% subcategory="수중/접촉온도센서(DS18B20)"
    export function readDS18B20(port: EZDigitalPin): number {
        let d: DigitalPin;
        switch (<number>port) {
            case 108: d = DigitalPin.P8; break;
            case 112: d = DigitalPin.P12; break;
            case 113: d = DigitalPin.P13; break;
            case 116: d = DigitalPin.P16; break;
            default: return -273;
        }

        let currentTime = input.runningTime();
        if (currentTime - lastDS18B20Time < 1000 && lastDS18B20Port === <number>port) {
            if (lastDS18B20Temp !== -273) {
                return lastDS18B20Temp;
            }
        }

        lastDS18B20Time = currentTime;
        lastDS18B20Port = <number>port;

        let temp = dstemp.celsius(d);
        if (temp < -100) {
            lastDS18B20Temp = -999;
            return lastDS18B20Temp;
        }

        lastDS18B20Temp = Math.round(temp * 100) / 100;
        return lastDS18B20Temp;
    }

    // =========================================================================
    // 4. 온습도 센서 (DHT11)
    // =========================================================================

    export enum DHT11DataType {
        //% block="온도 (°C)"
        Temperature = 0,
        //% block="습도 (%)"
        Humidity = 1
    }

    let lastDHT11Time = -2000;
    let lastTemperature = -1;
    let lastHumidity = -1;
    let lastDHT11Port = -1;
    let lastErrorCode = -1;

    /**
     * DHT11 온습도 센서에서 온도 또는 습도 값을 읽습니다.
     * @param port 연결 포트
     * @param dataType 읽을 데이터 종류
     */
    //% blockId="EZMAKER_dht11_read"
    //% block="DHT11 온습도 센서 %dataType | 연결포트 %port"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=70
    //% subcategory="온습도 센서(DHT11)"
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
        
        if (true) pins.setPull(d, PinPullMode.PullUp);
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
    // 4.5. 전압 센서
    // =========================================================================

    /**
     * 전압 센서의 측정 값(0~16.5V)을 읽습니다.
     * @param pin 연결 핀
     */
    //% blockId="EZMAKER_voltage_read"
    //% block="전압 센서 측정 값(0~16.5V) | 연결포트 %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    //% weight=60
    //% subcategory="전압 센서"
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
    // 5. 초음파 센서 (CS100A 1핀 모드)
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
     * 초음파 센서에서 물체까지의 거리를 측정합니다.
     * @param port 연결 포트
     */
    //% blockId="EZMAKER_ultrasonic_distance"
    //% block="초음파 센서 거리 (cm) | 연결포트 %port"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=50
    //% subcategory="초음파 센서"
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
        let distance = Math.idiv(d, 41); // 1핀 모드 전환 지연 보정을 위해 58 대신 41 적용
        
        return distance > 0 ? distance : 0;
    }
}
