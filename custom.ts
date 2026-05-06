/**
 * Custom blocks for EZMAKER Shield
 */
//% weight=100 color="#FF5733" icon="\uf12e" block="EZMAKER"
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
    //% weight=80
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
    //% weight=79
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
    //% weight=78
    //% subcategory="네오픽셀"
    export function setNeoPixelBrightness(npType: NeoPixelType, pin: EZDigitalPin, brightness: number): void {
        let strip = getNeoPixelStrip(pin, npType);
        // MakeCode neopixel 내부 로직상 brightness를 설정하면 다시 그려야 합니다.
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
    //% weight=77
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
    //% weight=76
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
    //% weight=75
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
    //% weight=74
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
    //% weight=73
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
    //% weight=72
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
    //% weight=71
    //% subcategory="네오픽셀"
    export function showNeoPixelBarGraph(npType: NeoPixelType, pin: EZDigitalPin, value: number, high: number = 255): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.showBarGraph(value, high);
    }

    // =========================================================================
    // DHT11 온습도 센서
    // =========================================================================

    export enum DHT11DataType {
        //% block="온도 (°C)"
        Temperature = 0,
        //% block="습도 (%)"
        Humidity = 1
    }

    /**
     * DHT11 온습도 센서에서 온도 또는 습도 값을 읽습니다.
     * @param port 연결 포트
     * @param dataType 읽을 데이터 종류
     */
    //% blockId="EZMAKER_dht11_read"
    //% block="DHT11 온습도 센서 %dataType | 연결포트 %port"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=60
    //% subcategory="온습도 센서"
    export function readDHT11(port: EZDigitalPin, dataType: DHT11DataType): number {
        let d: DigitalPin;
        switch (<number>port) {
            case 108: d = DigitalPin.P8; break;
            case 112: d = DigitalPin.P12; break;
            case 113: d = DigitalPin.P13; break;
            case 116: d = DigitalPin.P16; break;
            default: return -1;
        }

        // Start signal: pull LOW 18ms, release HIGH 40us
        pins.setPull(d, PinPullMode.PullUp);
        pins.digitalWritePin(d, 0);
        basic.pause(18);
        pins.digitalWritePin(d, 1);
        control.waitMicros(40);

        // DHT11 response: LOW 80us then HIGH 80us
        if (pins.pulseIn(d, PulseValue.Low, 500) === 0) return -1;
        if (pins.pulseIn(d, PulseValue.High, 500) === 0) return -1;

        // Read 40 bits: each bit = LOW ~50us + HIGH (26us=0, 70us=1)
        let bytes: number[] = [0, 0, 0, 0, 0];
        for (let i = 0; i < 40; i++) {
            pins.pulseIn(d, PulseValue.Low, 200);
            let highDuration = pins.pulseIn(d, PulseValue.High, 200);
            if (highDuration > 40) {
                bytes[i >> 3] |= (1 << (7 - (i & 7)));
            }
        }

        // Checksum: bytes[0]+[1]+[2]+[3] 하위 8비트 == bytes[4]
        if (((bytes[0] + bytes[1] + bytes[2] + bytes[3]) & 0xFF) !== bytes[4]) {
            return -1;
        }

        return dataType === DHT11DataType.Humidity ? bytes[0] : bytes[2];
    }

    // =========================================================================
    // 초음파 센서 (보류 중 - 블록 미노출)
    // =========================================================================

    // CS100A 1핀 모드 구현 보류. 측정값 불안정으로 추후 재시도 예정.
    export function ultrasonicDistance(port: EZDigitalPin): number {
        let d = 0;
        
        switch (<number>port) {
            case 108:
                pins.setPull(DigitalPin.P8, PinPullMode.PullNone);
                pins.digitalWritePin(DigitalPin.P8, 0); control.waitMicros(2);
                pins.digitalWritePin(DigitalPin.P8, 1); control.waitMicros(20);
                pins.digitalWritePin(DigitalPin.P8, 0);
                d = pins.pulseIn(DigitalPin.P8, PulseValue.High, 50000);
                break;
            case 112:
                pins.setPull(DigitalPin.P12, PinPullMode.PullNone);
                pins.digitalWritePin(DigitalPin.P12, 0); control.waitMicros(2);
                pins.digitalWritePin(DigitalPin.P12, 1); control.waitMicros(20);
                pins.digitalWritePin(DigitalPin.P12, 0);
                d = pins.pulseIn(DigitalPin.P12, PulseValue.High, 50000);
                break;
            case 113:
                pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
                pins.digitalWritePin(DigitalPin.P13, 0); control.waitMicros(2);
                pins.digitalWritePin(DigitalPin.P13, 1); control.waitMicros(20);
                pins.digitalWritePin(DigitalPin.P13, 0);
                d = pins.pulseIn(DigitalPin.P13, PulseValue.High, 50000);
                break;
            case 116:
                pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
                pins.digitalWritePin(DigitalPin.P16, 0); control.waitMicros(2);
                pins.digitalWritePin(DigitalPin.P16, 1); control.waitMicros(20);
                pins.digitalWritePin(DigitalPin.P16, 0);
                d = pins.pulseIn(DigitalPin.P16, PulseValue.High, 50000);
                break;
        }

        // 거리가 너무 가깝거나(0) 에러일 경우 0을 반환, 아닐 경우 cm로 변환 (time / 58)
        let distance = Math.round(d / 58);
        return distance > 0 ? distance : 0;
    }
}
