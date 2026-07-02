# EZmaker Shield for micro:bit

**EZmaker Shield Expansion logic and blocks for BBC micro:bit**

This MakeCode extension provides structured, easy-to-use blocks for over 25 different EZmaker sensors and actuators when connected to the [EZmaker Shield](https://ezmaker.co.kr/eng/) for micro:bit.

> [!NOTE]
> [한국어 설명서는 여기에서 확인하실 수 있습니다. (Korean documentation is available here)](README_ko.md)

## How to Use

You can add this repository as an extension in MakeCode for micro:bit.

1. Open [MakeCode for micro:bit](https://makecode.microbit.org/) and start a new project.
2. Click on the **Extensions** menu (Gear icon -> Extensions, or at the bottom of the toolbox).
3. Search for the URL of this repository and click to add it:
   - `https://github.com/EZMAKER-lab/pxt-ezmakershield-microbit`

> **Official Approval Pending**: Once the Microsoft/Micro:bit Foundation approval process is complete, you will be able to search for `ezmaker` directly in the search bar to install it from the official extensions gallery.

---

## Features & Supported Modules

The EZmaker Shield for micro:bit uses a 4-pin interface (`VCC`, `GND`, `IO1`, `IO2`). This extension groups and predefines pin configurations so users can easily control various sensors without needing to know complex communication protocols.

### 1. General Sensors (Analog/Digital)

Control sensors by selecting the input port (`P0` to `P16`) from a dropdown menu.

- **Analog Sensors:** DIY-A, Gas (MQ2), Air Pressure, Light (CDS), Sound, Magnetic Field (SLSS49E), Voltage Sensors.
- **Digital Input/Output Modules:** Ultrasonic (CS100A 1-pin type), Piezo Buzzer, Laser Pointer, PIR Motion Sensor, Switch, Servo Motor, NeoPixel.
- **1-Wire Sensors:** (Parses data and returns the temperature/humidity directly) High-Temp (MAX31850), Waterproof Temperature (DS18B20), Temperature & Humidity (DHT11).

### 2. Fixed Pin Communication Modules (I2C / Serial / 2-Wire)

These modules are wired to fixed pins on the shield, allowing simple blocks without pin selection.

- **I2C Modules (Fixed: P19=SCL, P20=SDA):**
  - pH Sensor, Barometric Pressure (BMP280), Carbon Dioxide (SCD40), Gyro/IMU (ICM-20948), Current/Power (INA219), LCD (1602, 2004).
- **Serial Modules (Fixed: P14=RX, P15=TX):**
  - Fine Dust Sensor (PMS7003).
- **2-Wire Modules (Fixed: P14=Clock, P15=Data):**
  - Weight Sensor (HX711).

---

## Example

```blocks
ezmaker.setNeoPixelColorAll(NeoPixelType.Single, EZDigitalPin.P8, 0xff0000)
basic.showNumber(ezmaker.readDIYARaw(EZAnalogPin.P0))
```

---

## Localization

This extension includes built-in multilingual support. If the MakeCode editor language is set to Korean, block descriptions will automatically display in Korean. For all other languages, English will be displayed.

## Supported targets

* [pxt-microbit](https://github.com/microsoft/pxt-microbit)

## License

MIT (See `LICENSE` file for details.)
