// EZmaker Shield Extension Tests
// 이 테스트 코드는 확장 프로그램의 모든 블록이 마이크로비트 컴파일러에서 오류 없이 컴파일되는지 검증합니다.

// 1. DIY-A 센서 테스트
let rawA = EZMAKER.readDIYARaw(EZMAKER.EZAnalogPin.P0);
let voltA = EZMAKER.readDIYAVoltage(EZMAKER.EZAnalogPin.P0);

// 2. DIY-B 센서 테스트
let analogB = EZMAKER.readDIYBAnalog(EZMAKER.EZAnalogPin.P1);
let digitalB = EZMAKER.readDIYBDigital(EZMAKER.EZDigitalPin.P8);

// 3. 가스 센서 (MQ2) 테스트
let lpgGas = EZMAKER.readMQ2(EZMAKER.MQ2GasType.LPG, EZMAKER.EZAnalogPin.P0);

// 4. 고온 센서 (MAX31850) 테스트
let tempMax = EZMAKER.readMax31850(EZMAKER.EZDigitalPin.P12);

// 5. 밝기 센서 (CDS) 테스트
let lightRaw = EZMAKER.readLightRaw(EZMAKER.EZAnalogPin.P1);
let lightPct = EZMAKER.readLightPercentage(EZMAKER.EZAnalogPin.P1);

// 6. 소리 센서 테스트
let soundRaw = EZMAKER.readSoundRaw(EZMAKER.EZAnalogPin.P2);
let soundPct = EZMAKER.readSoundPercentage(EZMAKER.EZAnalogPin.P2);

// 7. 수중/접촉온도센서 (DS18B20) 테스트
let tempDs = EZMAKER.readDS18B20(EZMAKER.EZDigitalPin.P13);

// 8. 온습도 센서 (DHT11) 테스트
let tempDht = EZMAKER.readDHT11(EZMAKER.EZDigitalPin.P16, EZMAKER.DHT11DataType.Temperature);
let humiDht = EZMAKER.readDHT11(EZMAKER.EZDigitalPin.P16, EZMAKER.DHT11DataType.Humidity);

// 9. 전압 센서 테스트
let voltSensor = EZMAKER.readVoltage(EZMAKER.EZAnalogPin.P2);

// 10. 초음파 센서 테스트
let distCm = EZMAKER.ultrasonicDistance(EZMAKER.EZDigitalPin.P8);

// 11. 네오픽셀 LED 제어 테스트
EZMAKER.setNeoPixelColorAll(EZMAKER.NeoPixelType.Single, EZMAKER.EZDigitalPin.P8, 0xFF0000);
EZMAKER.setNeoPixelPixelColor(EZMAKER.NeoPixelType.Single, EZMAKER.EZDigitalPin.P8, 0, 0x00FF00);
EZMAKER.setNeoPixelBrightness(EZMAKER.NeoPixelType.Single, EZMAKER.EZDigitalPin.P8, 128);
EZMAKER.clearNeoPixel(EZMAKER.NeoPixelType.Single, EZMAKER.EZDigitalPin.P8);

EZMAKER.setNeoPixelBar(EZMAKER.EZDigitalPin.P8, 0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF, 0xFFFFFF);
EZMAKER.setNeoPixelRing(EZMAKER.EZDigitalPin.P8, 0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF, 0xFFFFFF, 0x555555, 0xaaaaaa, 0x123456, 0x789abc, 0xdef012);

EZMAKER.showNeoPixelRainbow(EZMAKER.NeoPixelType.Bar, EZMAKER.EZDigitalPin.P8, 1, 360);
EZMAKER.shiftNeoPixel(EZMAKER.NeoPixelType.Bar, EZMAKER.EZDigitalPin.P8, 1);
EZMAKER.rotateNeoPixel(EZMAKER.NeoPixelType.Bar, EZMAKER.EZDigitalPin.P8, 1);
EZMAKER.showNeoPixelBarGraph(EZMAKER.NeoPixelType.Bar, EZMAKER.EZDigitalPin.P8, 100, 255);
