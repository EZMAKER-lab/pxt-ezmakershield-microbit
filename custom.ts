/**
 * Custom blocks for EZMAKER Shield
 */
//% weight=100 color="#FF5733" icon="\uf12e" block="EZMAKER"
//% groups="['Analog & Digital', 'I2C Modules', 'Serial / 2-Wire', 'Actuators']"
namespace EZMAKER {

    /**
     * EZmaker 연결을 위한 아날로그/디지털 핀 종류
     */
    export enum EZPin {
        //% block="P0"
        P0 = DigitalPin.P0,
        //% block="P1"
        P1 = DigitalPin.P1,
        //% block="P2"
        P2 = DigitalPin.P2,
        //% block="P8"
        P8 = DigitalPin.P8,
        //% block="P12"
        P12 = DigitalPin.P12,
        //% block="P13"
        P13 = DigitalPin.P13,
        //% block="P16"
        P16 = DigitalPin.P16
    }

    /**
     * 지정한 핀의 아날로그 센서 값을 읽습니다. (DIY-A, 가스 등)
     * @param pin 아날로그 입력을 지원하는 핀 (P0, P1, P2 등)
     */
    //% blockId="ezmaker_read_analog"
    //% block="read analog sensor on %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=90
    //% group="Analog & Digital"
    export function readAnalogSensor(pin: EZPin): number {
        // P0, P1, P2 등은 아날로그 핀으로 캐스팅하여 읽습니다.
        return pins.analogReadPin(<AnalogPin><number>pin);
    }

    /**
     * 지정한 핀의 디지털 센서 값을 읽습니다. (인체감지, 스위치 등)
     * @param pin 디지털 입력 핀
     */
    //% blockId="ezmaker_read_digital"
    //% block="read digital sensor on %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=89
    //% group="Analog & Digital"
    export function readDigitalSensor(pin: EZPin): number {
        return pins.digitalReadPin(<number>pin);
    }

    /**
     * 지정한 핀의 디지털 출력을 제어합니다. (레이저, 부저 등 On/Off 제어용)
     */
    //% blockId="ezmaker_write_digital"
    //% block="set digital module on %pin to %value"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=88
    //% group="Analog & Digital"
    export function writeDigitalModule(pin: EZPin, value: number): void {
        pins.digitalWritePin(<number>pin, value);
    }

    // --- Phase 3: Actuators ---

    export enum NeoPixelType {
        //% block="1 LED"
        Single = 1,
        //% block="Bar (7 LEDs)"
        Bar = 7,
        //% block="Ring (12 LEDs)"
        Ring = 12
    }

    let neopixelStrips: neopixel.Strip[] = [];

    function getNeoPixelStrip(pin: EZPin, type: NeoPixelType): neopixel.Strip {
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
    //% block="set %npType neopixel on %pin to %color=neopixel_colors"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=80
    //% group="Actuators"
    export function setNeoPixelColorAll(npType: NeoPixelType, pin: EZPin, color: number): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.showColor(color);
    }

    /**
     * 네오픽셀의 특정 순번 LED 색상만 변경합니다.
     */
    //% blockId="EZMAKER_neopixel_set_pixel_color"
    //% block="set %npType neopixel on %pin pixel at %index to %color=neopixel_colors"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% weight=79
    //% group="Actuators"
    export function setNeoPixelPixelColor(npType: NeoPixelType, pin: EZPin, index: number, color: number): void {
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
    //% group="Actuators"
    export function setNeoPixelBrightness(npType: NeoPixelType, pin: EZPin, brightness: number): void {
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
    //% group="Actuators"
    export function clearNeoPixel(npType: NeoPixelType, pin: EZPin): void {
        let strip = getNeoPixelStrip(pin, npType);
        strip.clear();
        strip.show();
    }
}
