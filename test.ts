// EZmaker Shield Extension Tests
// This test code validates that all blocks in the extension compile without errors.

// 1. DIY-A Sensor Test
let rawA = EZMAKER.readDIYARaw(EZMAKER.EZAnalogPin.P0);
let voltA = EZMAKER.readDIYAVoltage(EZMAKER.EZAnalogPin.P0);

// 2. DIY-B Sensor Test
let analogB = EZMAKER.readDIYBAnalog(EZMAKER.EZAnalogPin.P1);
let digitalB = EZMAKER.readDIYBDigital(EZMAKER.EZDigitalPin.P8);

// 3. Gas Sensor (MQ2) Test
let lpgGas = EZMAKER.readMQ2(EZMAKER.MQ2GasType.LPG, EZMAKER.EZAnalogPin.P0);

// 4. High Temperature Sensor (MAX31850) Test
let tempMax = EZMAKER.readMax31850(EZMAKER.EZDigitalPin.P12);

// 5. Light Sensor (CDS) Test
let lightRaw = EZMAKER.readLightRaw(EZMAKER.EZAnalogPin.P1);
let lightPct = EZMAKER.readLightPercentage(EZMAKER.EZAnalogPin.P1);

// 6. Sound Sensor Test
let soundRaw = EZMAKER.readSoundRaw(EZMAKER.EZAnalogPin.P2);
let soundPct = EZMAKER.readSoundPercentage(EZMAKER.EZAnalogPin.P2);

// 7. Waterproof/Contact Temperature Sensor (DS18B20) Test
let tempDs = EZMAKER.readDS18B20(EZMAKER.EZDigitalPin.P13);

// 8. Temp & Humidity Sensor (DHT11) Test
let tempDht = EZMAKER.readDHT11(EZMAKER.EZDigitalPin.P16, EZMAKER.DHT11DataType.Temperature);
let humiDht = EZMAKER.readDHT11(EZMAKER.EZDigitalPin.P16, EZMAKER.DHT11DataType.Humidity);

// 9. Voltage Sensor Test
let voltSensor = EZMAKER.readVoltage(EZMAKER.EZAnalogPin.P2);

// 10. Ultrasonic Sensor Test
let distCm = EZMAKER.ultrasonicDistance(EZMAKER.EZDigitalPin.P8);

// 11. NeoPixel LED Control Test
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
