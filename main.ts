let remsnelheid = 0
let rijsnelheid = 0
let rem_licht: neopixel.Strip = null
let Afstand_tot_muur = 0
function vertragen () {
    remsnelheid = rijsnelheid
    rem_licht.showColor(neopixel.colors(NeoPixelColors.Red))
    for (let index = 0; index < 4; index++) {
        remsnelheid = remsnelheid / 2
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, remsnelheid)
        basic.pause(200)
    }
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(200)
    rem_licht.showColor(neopixel.colors(NeoPixelColors.Black))
}
basic.forever(function () {
    rem_licht = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    rijsnelheid = 100
    Afstand_tot_muur = rijsnelheid / 4
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, rijsnelheid)
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < Afstand_tot_muur) {
        vertragen()
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, rijsnelheid)
        basic.pause(500)
        maqueen.motorStop(maqueen.Motors.All)
        music.playMelody("G B A G C5 B A B ", 311)
        for (let index = 0; index < 3; index++) {
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            basic.pause(400)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
            basic.pause(400)
        }
    }
})
