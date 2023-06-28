input.onButtonPressed(Button.A, function () {
	
})
input.onButtonPressed(Button.AB, function () {
    kitronik_air_quality.clear()
    kitronik_air_quality.eraseData()
    kitronik_air_quality.show("Erasing Data", 1, kitronik_air_quality.ShowAlign.Left)
    basic.pause(2000)
    kitronik_air_quality.clear()
    kitronik_air_quality.show("Done!", 1, kitronik_air_quality.ShowAlign.Left)
    basic.pause(2000)
    kitronik_air_quality.clear()
})
input.onButtonPressed(Button.B, function () {
    if (doLogging) {
        kitronik_air_quality.sendAllData()
    }
})
let doLogging = false
let statusLEDs = kitronik_air_quality.createAirQualityZIPDisplay()
doLogging = false
kitronik_air_quality.clear()
kitronik_air_quality.setTime(10, 19, 0)
kitronik_air_quality.setDate(28, 6, 23)
kitronik_air_quality.show("Welcome!", 1, kitronik_air_quality.ShowAlign.Centre)
kitronik_air_quality.show("Press A for logging", 3, kitronik_air_quality.ShowAlign.Centre)
kitronik_air_quality.show("Press B for transfer", 4, kitronik_air_quality.ShowAlign.Centre)
let isPressed = 0
while (isPressed == 0) {
    if (input.buttonIsPressed(Button.A)) {
        isPressed = 1
    } else if (input.buttonIsPressed(Button.B)) {
        isPressed = 2
    }
}
kitronik_air_quality.clear()
if (isPressed == 1) {
    kitronik_air_quality.setupGasSensor()
    kitronik_air_quality.calcBaselines()
    kitronik_air_quality.includeDate(kitronik_air_quality.onOff(true))
    kitronik_air_quality.includeTime(kitronik_air_quality.onOff(true))
    kitronik_air_quality.includeTemperature(kitronik_air_quality.TemperatureUnitList.C, kitronik_air_quality.onOff(true))
    kitronik_air_quality.includePressure(kitronik_air_quality.PressureUnitList.Pa, kitronik_air_quality.onOff(true))
    kitronik_air_quality.includeHumidity(kitronik_air_quality.onOff(true))
    kitronik_air_quality.includeIAQ(kitronik_air_quality.onOff(true))
    kitronik_air_quality.includeCO2(kitronik_air_quality.onOff(true))
    kitronik_air_quality.includeLight(kitronik_air_quality.onOff(true))
} else {
    kitronik_air_quality.show("Data Transfer Mode", 3, kitronik_air_quality.ShowAlign.Centre)
    kitronik_air_quality.show("(Not logging)", 4, kitronik_air_quality.ShowAlign.Centre)
}
loops.everyInterval(1000, function () {
    if (doLogging) {
        kitronik_air_quality.measureData()
        basic.pause(100)
        kitronik_air_quality.logData()
        kitronik_air_quality.clear()
        kitronik_air_quality.show("T:" + kitronik_air_quality.readTemperature(kitronik_air_quality.TemperatureUnitList.C) + " C", 3, kitronik_air_quality.ShowAlign.Left)
        kitronik_air_quality.show("P:" + kitronik_air_quality.readPressure(kitronik_air_quality.PressureUnitList.Pa) + " Pa", 4, kitronik_air_quality.ShowAlign.Left)
        kitronik_air_quality.show("H:" + kitronik_air_quality.readHumidity() + "", 5, kitronik_air_quality.ShowAlign.Left)
        kitronik_air_quality.show("Air Q:" + kitronik_air_quality.getAirQualityPercent() + "", 6, kitronik_air_quality.ShowAlign.Left)
        kitronik_air_quality.show("eCO2" + kitronik_air_quality.readeCO2() + "", 6, kitronik_air_quality.ShowAlign.Left)
    }
})