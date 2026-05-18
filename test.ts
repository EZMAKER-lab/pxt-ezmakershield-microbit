basic.forever(function () {
    let 거리 = EZMAKER.ultrasonicDistance(EZMAKER.EZDigitalPin.P8)
    serial.writeValue("Distance", 거리)
    basic.pause(100)
})
