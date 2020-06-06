const NAME = 'console'

const PROMPT = '$ '
const CUR = '█'
const MSG = 'npm install -g collider.jam'

const opt = {
    typeSpeed:  .05,
    typeVar:    .1,
    blinkSpeed: .4,
}

let x = 0
let y = 0
let i = 0
let target = ''
let buffer = ''
let timer = 0
let blink = false
let blinker = 0

function init() {
    lab.background = '#000000'
    print(MSG)
}

function adjustOrigin() {
    // determine start coordinates
    font('42px monaco')
    const w = textWidth(MSG+CUR)
    x = rx(.5) - w/2
    y = ry(.5)
}

function print(msg) {
    buffer = PROMPT
    target = msg
    blink = false
}

function evo(dt) {
    timer -= dt
    blinker += dt
    if (blinker >= opt.blinkSpeed) {
        blinker = -opt.blinkSpeed
    }

    if (timer < 0 && target.length > 0) {
        buffer += target.substring(0, 1)
        target = target.substring(1)
        timer = opt.typeSpeed + rnd(opt.typeVar)

        if (target.length === 0) {
            blink = true
            blinker = 0
        }
    }

    if (target.length > 0 && res.sfx.typing.paused) {
        res.sfx.typing.play()
    }
    if (target.length === 0 && !res.sfx.typing.paused) {
        res.sfx.typing.pause()
    }
}

function draw() {
    adjustOrigin()

    font('42px monaco')
    fill(.28, .6, .5)
    alignLeft()
    baseMiddle()

    let txt = buffer
    if (!blink || blinker >= 0) txt += CUR

    text(txt, x, y)
}
