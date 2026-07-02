// EZmaker Shield Extension Tests
// This test code validates that all blocks in the extension compile without errors.

// 1. DIY-A Sensor Test
let rawA = ezmaker.readDIYARaw(EZAnalogPin.P0);
let voltA = ezmaker.readDIYAVoltage(EZAnalogPin.P0);

// 2. DIY-B Sensor Test
let analogB = ezmaker.readDIYBAnalog(EZAnalogPin.P1);
let digitalB = ezmaker.readDIYBDigital(EZDigitalPin.P8);

// 3. Gas Sensor (MQ2) Test
let lpgGas = ezmaker.readMQ2(MQ2GasType.LPG, EZAnalogPin.P0);

// 4. High Temperature Sensor (MAX31850) Test
let tempMax = ezmaker.readMax31850(EZDigitalPin.P12);

// 5. Light Sensor (CDS) Test
let lightRaw = ezmaker.readLightRaw(EZAnalogPin.P1);
let lightPct = ezmaker.readLightPercentage(EZAnalogPin.P1);

// 6. Sound Sensor Test
let soundRaw = ezmaker.readSoundRaw(EZAnalogPin.P2);
let soundPct = ezmaker.readSoundPercentage(EZAnalogPin.P2);

// 7. Waterproof/Contact Temperature Sensor (DS18B20) Test
let tempDs = ezmaker.readDS18B20(EZDigitalPin.P13);

// 8. Temp & Humidity Sensor (DHT11) Test
let tempDht = ezmaker.readDHT11(EZDigitalPin.P16, DHT11DataType.Temperature);
let humiDht = ezmaker.readDHT11(EZDigitalPin.P16, DHT11DataType.Humidity);

// 9. Voltage Sensor Test
let voltSensor = ezmaker.readVoltage(EZAnalogPin.P2);

// 10. Ultrasonic Sensor Test
let distCm = ezmaker.ultrasonicDistance(EZDigitalPin.P8);

// 11. NeoPixel LED Control Test
ezmaker.setNeoPixelColorAll(NeoPixelType.Single, EZDigitalPin.P8, 0xFF0000);
ezmaker.setNeoPixelPixelColor(NeoPixelType.Single, EZDigitalPin.P8, 0, 0x00FF00);
ezmaker.setNeoPixelBrightness(NeoPixelType.Single, EZDigitalPin.P8, 128);
ezmaker.clearNeoPixel(NeoPixelType.Single, EZDigitalPin.P8);

ezmaker.setNeoPixelBar(EZDigitalPin.P8, 0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF, 0xFFFFFF);
ezmaker.setNeoPixelRing(EZDigitalPin.P8, 0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF, 0xFFFFFF, 0x555555, 0xaaaaaa, 0x123456, 0x789abc, 0xdef012);

ezmaker.showNeoPixelRainbow(NeoPixelType.Bar, EZDigitalPin.P8, 1, 360);
ezmaker.shiftNeoPixel(NeoPixelType.Bar, EZDigitalPin.P8, 1);
ezmaker.rotateNeoPixel(NeoPixelType.Bar, EZDigitalPin.P8, 1);
ezmaker.showNeoPixelBarGraph(NeoPixelType.Bar, EZDigitalPin.P8, 100, 255);
