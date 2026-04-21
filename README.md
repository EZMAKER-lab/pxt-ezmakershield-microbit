# EZmaker Shield for micro:bit (이지메이커 마이크로비트 쉴드 확장)

**EZmaker Shield Expansion logic and blocks for BBC micro:bit**

This MakeCode extension provides structured, easy-to-use blocks for over 25 different EZmaker sensors and actuators when connected to the EZmaker Shield for micro:bit.

## 사용 방법 (How to Use)
이 저장소(Repository)는 MakeCode for micro:bit 에서 확장 기능으로 추가하여 사용할 수 있습니다.
1. [MakeCode for micro:bit](https://makecode.microbit.org/) 에 접속하여 프로젝트를 새로 엽니다.
2. `확장(Extensions)` 메뉴 (톱니바퀴 아이콘 -> Extensions 또는 툴박스 하단의 Extensions) 를 클릭합니다.
3. 검색창에 이 저장소의 URL 주소를 넣고 검색 후 클릭하여 추가합니다.
   - `https://github.com/사용자계정_또는_조직/pxt-ezmakershield-microbit` *(배포 후 실제 경로로 변경 필요)*
> **공식 승인 대기 중 (Official Approval Pending)**: 추후 Microsoft 승인이 완료되면 검색창에 `ezmaker` 키워드만 검색하여 공식 지원 리스트에서 바로 설치가 가능해집니다.

---

## 제공되는 카테고리 및 블록 (Features)

마이크로비트 이지메이커 쉴드는 4핀 규격(`VCC`, `GND`, `IO1`, `IO2`)을 사용합니다. 아래와 같이 핀 설정이 사전 정의 및 그룹핑되어, 사용자가 코드 구현 시 복잡한 통신 규격을 몰라도 쉽게 센서를 제어할 수 있습니다.

### 1. 일반 센서 (Analog/Digital)
입력받는 포트(`P0`~`P16` 중 해당되는 핀)를 드롭다운으로 선택하여 제어합니다.
- **아날로그 센서:** DIY-A, 가스(MQ2), 공기압, 밝기(CDS), 소리, 자기장(SLSS49E), 전압 센서
- **디지털 입출력 센서:** 초음파(CS100A 1핀 타입), 피에조 부저, 레이저포인트, 인체감지센서(PIR), 스위치, 서보모터, 네오픽셀
- **1-Wire 센서:** 통신 데이터 파싱 및 결과 바로 반환 (고온 MAX31850, 수중접촉온도 DS18B20, 온도습도 DHT11)

### 2. 고정 핀 통신형 모듈 (I2C / Serial / 2-Wire)
쉴드 기판 구조에 따라 내부적으로 핀이 고정되어 있어 블록 내부에서 핀 선택 없이 간결하게 구동됩니다.
- **I2C 모듈 (P19=SCL, P20=SDA 고정):**
  - pH 센서, 기압(BMP280), 이산화탄소(SCD40), 자이로(ICM-20948), 전류(INA219), LCD(1602, 2004)
- **Serial (P14=RX, P15=TX 고정):**
  - 미세먼지센서 (PMS7003)
- **2-Wire (P14=Clock, P15=Data 고정):**
  - 무게센서 (HX711)

---

## 예제 코드 (Example)
```blocks
// MakeCode Blocks example will be appended here based on custom.ts
EZmaker.showNeopixelWrapper(EZmaker.AnalogPins.P8, 255, 0, 0)
basic.showNumber(EZmaker.readAnalogSensor(EZmaker.AnalogPins.P0))
```

---

## 다국어 지원 (Localization)
본 확장은 한국어(`ko`) 로컬라이징을 기본 내장하고 있습니다. MakeCode 에디터가 영문일 때는 영어 기본 블록명(`Read Temperature`)이 표기되며, 에디터의 언어 설정이 한국어일 경우 각 블록은 자동으로 한국어 캡션(`온도 읽기`)으로 표시됩니다.

## Supported targets
* [pxt-microbit](https://github.com/microsoft/pxt-microbit)

## License
MIT (See `LICENSE` file for details.)
