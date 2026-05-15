const startScreen   = document.getElementById('startScreen')
const player        = document.getElementById('player')
const screen        = document.getElementById('screen')
const inventoryUI   = document.getElementById('inventory')
const lightFx       = document.getElementById('lightFx')
const secrets       = document.querySelectorAll('.secret')
const progressbar   = document.getElementById('progressbar')
const counter       = document.getElementById('counter')
const darkness      = document.getElementById('darkness')
const floor2        = document.getElementById('floor2')
const goal          = document.getElementById('goal')
const puzzle1       = document.getElementById('puzzle1')
const puzzle2       = document.getElementById('puzzle2')
const puzzle3       = document.getElementById('puzzle3')
const puzzle4       = document.getElementById('puzzle4')
const prewindow     = document.getElementById('prewindow')
const miniboard     = document.getElementById('miniboard')
const preview1      = document.getElementById('preview1')
const preview2      = document.getElementById('preview2')
const preview3      = document.getElementById('preview3')
const preview4      = document.getElementById('preview4')
const winner        = document.getElementById('winner')
const endScreen     = document.getElementById('endScreen')
const board         = document.getElementById('board')
const failEl        = document.getElementById('fail')
const lightswitchEl = document.getElementById('lightswitch')
const lightGameAreaEl = document.getElementById('lightGameArea')
const rulesCloseBtn = document.createElement('button')

// ── PLAYER DIRECTION IMAGE ──
const playerImg = player.querySelector('img')

let gameLight = 'green'
let holding       = null
let colorHolding  = null
let score         = 0
let keyEl         = null
let keyCollected  = false
let keySpawned    = false
let totalTime     = 15 * 60 * 1000
let startTime     = 0
let x             = 3000
let y             = 4600
let keys          = {}
let inventory     = {}
let slotss        = {}
let order         = []
let running       = false
let view          = false
let noclip        = false
let lightOn       = false
let debug         = true
const walls       = []
let mouseX        = 0
let mouseY        = 0
let finishedpuzzles = 0
let lightCycleRunning = false
let colorKeySpawned = false
let puzzleKeySpawned = false
let idkKeySpawned = false
let uiOpen = false
let stunned = false

const RESET_PANEL_WORLD = { x: 3600, y: 5875 }
const resetPanelEl = document.getElementById('resetPanel')

function nearResetPanel() {
    return (
        x < RESET_PANEL_WORLD.x + 120 && x + 50 > RESET_PANEL_WORLD.x - 20 &&
        y < RESET_PANEL_WORLD.y + 80  && y + 50 > RESET_PANEL_WORLD.y - 20
    )
}

const lighminigameEntranceX = 3420
const lighminigameEntranceY = 5880

const pieceImages = {
    1: [
        'Images/cookie1to1.png',
        'Images/cookie1to2.png',
        'Images/cookie1to3.png',
        'Images/cookie1to4.png',
        'Images/cookie2to1.png',
        'Images/cookie2to2.png',
        'Images/cookie2to3.png',
        'Images/cookie2to4.png',
        'Images/cookie3to1.png',
        'Images/cookie3to2.png',
        'Images/cookie3to3.png',
        'Images/cookie3to4.png',
        'Images/cookie4to1.png',
        'Images/cookie4to2.png',
        'Images/cookie4to3.png',
        'Images/cookie4to4.png',
    ],

    2: [
        'Images/lemon1to1.png',
        'Images/lemon1to2.png',
        'Images/lemon1to3.png',
        'Images/lemon1to4.png',
        'Images/lemon2to1.png',
        'Images/lemon2to2.png',
        'Images/lemon2to3.png',
        'Images/lemon2to4.png',
        'Images/lemon3to1.png',
        'Images/lemon3to2.png',
        'Images/lemon3to3.png',
        'Images/lemon3to4.png',
        'Images/lemon4to1.png',
        'Images/lemon4to2.png',
        'Images/lemon4to3.png',
        'Images/lemon4to4.png',
    ],
    3: [
        'Images/kitten1to1.png',
        'Images/kitten1to2.png',
        'Images/kitten1to3.png',
        'Images/kitten1to4.png',
        'Images/kitten2to1.png',
        'Images/kitten2to2.png',
        'Images/kitten2to3.png',
        'Images/kitten2to4.png',
        'Images/kitten3to1.png',
        'Images/kitten3to2.png',
        'Images/kitten3to3.png',
        'Images/kitten3to4.png',
        'Images/kitten4to1.png',
        'Images/kitten4to2.png',
        'Images/kitten4to3.png',
        'Images/kitten4to4.png',
    ],
    4: [
        'Images/lilith1to1.png',
        'Images/lilith1to2.png',
        'Images/lilith1to3.png',
        'Images/lilith1to4.png',
        'Images/lilith2to1.png',
        'Images/lilith2to2.png',
        'Images/lilith2to3.png',
        'Images/lilith2to4.png',
        'Images/lilith3to1.png',
        'Images/lilith3to2.png',
        'Images/lilith3to3.png',
        'Images/lilith3to4.png',
        'Images/lilith4to1.png',
        'Images/lilith4to2.png',
        'Images/lilith4to3.png',
        'Images/lilith4to4.png',
    ]
}
const previewsize = 800
const DPR = window.devicePixelRatio || 2

;[preview1, preview2, preview3, preview4].forEach(c => {
    c.width  = previewsize * DPR
    c.height = previewsize * DPR
    c.style.width  = previewsize + 'px'
    c.style.height = previewsize + 'px'
    c.getContext('2d').scale(DPR, DPR)
})

function clearKeys() { keys = {} }

const previews = {
    1: preview1.getContext('2d'),
    2: preview2.getContext('2d'),
    3: preview3.getContext('2d'),
    4: preview4.getContext('2d')
}

const redZone          = { x:0,    y:0,    w:6000, h:1800 }
const yellowTopZone    = { x:0,    y:2000, w:2600, h:2400 }
const yellowBottomZone = { x:0,    y:4800, w:2600, h:2200 }
const purpleZone       = { x:3400, y:2000, w:2600, h:2400 }
const purpleBottomZone = { x:3400, y:4800, w:2600, h:2200 }
const lightGameArea    = { x:3700, y:4800, w:2300, h:2200 }
const lobbyArea        = { x:3400, y:4800, w:300,  h:2200 }
const bottomgreenZone = { x:0, y:7200, w:6000, h:800 }
const leftRedZone   = { x:0,    y:0, w:2500, h:1800 }
const corridorZone  = { x:2500, y:0, w:1000, h:1800 }
const rightRedZone  = { x:3500, y:0, w:2500, h:1800 }
let dragged       = null
let dragOffX      = 0
let dragOffY      = 0
let currentPuzzle = null

const puzzleStates = {
    1:{ correct:0, completed:false, snapState:new Array(16).fill(null), puzzlePieces:[], pieceData:[] },
    2:{ correct:0, completed:false, snapState:new Array(16).fill(null), puzzlePieces:[], pieceData:[] },
    3:{ correct:0, completed:false, snapState:new Array(16).fill(null), puzzlePieces:[], pieceData:[] },
    4:{ correct:0, completed:false, snapState:new Array(16).fill(null), puzzlePieces:[], pieceData:[] }
}

const SIZE = 420
const CELL = SIZE / 4

function randColorPos() {
    return {
        wx: 3750 + Math.floor(Math.random() * 2100),
        wy: 4870 + Math.floor(Math.random() * 2000)
    }
}

const COLOR_ITEM_ORIGINS = [
    { id:'color1', type:'red'    },
    { id:'color2', type:'cyan'   },
    { id:'color3', type:'pink'   },
    { id:'color4', type:'blue'   },
    { id:'color5', type:'green'  },
    { id:'color6', type:'orange' },
    { id:'color7', type:'yellow' },
    { id:'color8', type:'purple' }
].map(c => { const p = randColorPos(); return { ...c, wx:p.wx, wy:p.wy } })

const colorItems = COLOR_ITEM_ORIGINS.map(o => ({
    el: document.getElementById(o.id),
    type: o.type,
    picked: false,
    wx: o.wx,
    wy: o.wy
}))

const boxworldposi = [
    { x: lobbyArea.x + 100, y: lobbyArea.y + 200  },
    { x: lobbyArea.x + 100, y: lobbyArea.y + 400  },
    { x: lobbyArea.x + 100, y: lobbyArea.y + 600  },
    { x: lobbyArea.x + 100, y: lobbyArea.y + 800  },
    { x: lobbyArea.x + 100, y: lobbyArea.y + 1900 },
    { x: lobbyArea.x + 100, y: lobbyArea.y + 1700 },
    { x: lobbyArea.x + 100, y: lobbyArea.y + 1500 },
    { x: lobbyArea.x + 100, y: lobbyArea.y + 1300 },
]

const colorBoxes = [
    { el:document.getElementById('box1'), type:'red',    filled:false },
    { el:document.getElementById('box2'), type:'cyan',   filled:false },
    { el:document.getElementById('box3'), type:'pink',   filled:false },
    { el:document.getElementById('box4'), type:'blue',   filled:false },
    { el:document.getElementById('box5'), type:'green',  filled:false },
    { el:document.getElementById('box6'), type:'orange', filled:false },
    { el:document.getElementById('box7'), type:'yellow', filled:false },
    { el:document.getElementById('box8'), type:'purple', filled:false }
]

const doors = [
    { dor:document.getElementById('PurpleDoor'), x:320, y:2250, type:'purpledoor', unlocked:false }
]

const TOGGLE_DOOR_DEFS = [
    { id:'tdoor1', x:2600, y:3100, w:30, h:200, },
    { id:'tdoor2', x:2600, y:5800, w:30, h:200, label:'GATE B' },
    { id:'tdoor3', x:3400, y:3100, w:30, h:200, label:'GATE C' },
    { id:'tdoor4', x:3400, y:5800, w:30, h:200, label:'GATE D' },
]

const toggleDoors = TOGGLE_DOOR_DEFS.map(def => {
    const el = document.createElement('div')
    el.className = 'toggleDoor closed'
    el.id = def.id
    el.style.left   = def.x + 'px'
    el.style.top    = def.y + 'px'
    el.style.width  = def.w + 'px'
    el.style.height = def.h + 'px'
    screen.appendChild(el)
    const wallEntry = { wall:el, x:def.x, y:def.y, w:def.w, h:def.h, isToggle:true }
    walls.push(wallEntry)
    return { el, x:def.x, y:def.y, w:def.w, h:def.h, open:false, wallEntry }
})

function nearToggleDoor() {
    const REACH = 60
    return toggleDoors.find(td =>
        x < td.x + td.w + REACH && x + 50 > td.x - REACH &&
        y < td.y + td.h + REACH && y + 50 > td.y - REACH
    ) || null
}

function activateToggleDoor(td) {
    td.open = !td.open
    if (td.open) {
        const idx = walls.indexOf(td.wallEntry)
        if (idx !== -1) walls.splice(idx, 1)
        td.el.className = 'toggleDoor open'
    } else {
        walls.push(td.wallEntry)
        td.el.className = 'toggleDoor closed'
    }
}

let masterDoorUnlocked = false
let masterDoorEl = null
let masterWallEntry = null
const masterKeySlots = { puzzlekey:false, wordkey:false, colorkey:false, mazekey:false }

const puzzleKeyDiv = document.createElement('div')
puzzleKeyDiv.className = 'item'
puzzleKeyDiv.id = 'puzzleKeyItem'
puzzleKeyDiv.textContent = 'PUZZLE KEY'
puzzleKeyDiv.style.cssText = 'display:none;background:red;border:3px solid white;color:white;font-size:7px;'
screen.appendChild(puzzleKeyDiv)

const wordpuzzlekeyDiv = document.createElement('div')
wordpuzzlekeyDiv.className = 'item'
wordpuzzlekeyDiv.id = 'wordkeyItem'
wordpuzzlekeyDiv.textContent = 'WORD KEY'
wordpuzzlekeyDiv.style.cssText = 'background:#00ffab;border:3px solid #005533;color:#000;font-size:7px;font-weight:bold;'
screen.appendChild(wordpuzzlekeyDiv)

const colorKeyDiv = document.createElement('div')
colorKeyDiv.className = 'item'
colorKeyDiv.id = 'colorKeyItem'
colorKeyDiv.textContent = 'COLOR KEY'
colorKeyDiv.style.cssText = 'display:none;background:magenta;border:3px solid white;color:white;font-size:7px;font-weight:bold;'
screen.appendChild(colorKeyDiv)

const mazepuzzleDiv = document.createElement('div')
mazepuzzleDiv.className = 'item'
mazepuzzleDiv.id = 'mazeKeyItem'
mazepuzzleDiv.textContent = 'MAZE KEY'
mazepuzzleDiv.style.cssText = 'background:#00ffab;border:3px solid #005533;color:#000;font-size:7px;font-weight:bold;'
screen.appendChild(mazepuzzleDiv)

const mazekeyposi   = { x: 60,   y: 2060 }
const wordkeyposi   = { x: 1200, y: 5880 }
const colorkeyposi  = { x: lobbyArea.x + 130, y: lobbyArea.y + 1060 }
const puzzlekeyposi = { x: purpleZone.x + purpleZone.w/2 - 35, y: purpleZone.y + purpleZone.h/2 - 35 }
const puzzleKeyMarker = document.getElementById('puzzleKeyMarker')
puzzleKeyMarker.style.left = (puzzlekeyposi.x - 65) + 'px'
puzzleKeyMarker.style.top  = (puzzlekeyposi.y - 65) + 'px'
const items = [
    { item:document.getElementById('item4'), x:1100, y:4200,  picked:false, type:'purpledoor'},
    { item:document.getElementById('item5'), x:1100, y:2700,  picked:false, type:'light'     },
    { item:document.getElementById('item6'), x:630,  y:1200,  picked:false, type:'yellowdoor'},
    { item:puzzleKeyDiv,    x:puzzlekeyposi.x, y:puzzlekeyposi.y, picked:false, type:'puzzlekey', hidden:true  },
    { item:wordpuzzlekeyDiv,x:wordkeyposi.x,   y:wordkeyposi.y,   picked:false, type:'wordkey',   hidden:false },
    { item:colorKeyDiv,     x:colorkeyposi.x,  y:colorkeyposi.y,  picked:false, type:'colorkey',  hidden:true  },
    { item:mazepuzzleDiv,   x:mazekeyposi.x,   y:mazekeyposi.y,   picked:false, type:'mazekey',   hidden:false },
]

function add(wx, wy, ww, wh, color, isZone) {
    const div = document.createElement('div')
    div.className = 'wall' + (isZone ? ' zone-wall' : '')
    div.style.left   = wx + 'px'
    div.style.top    = wy + 'px'
    div.style.width  = ww + 'px'
    div.style.height = wh + 'px'
    div.style.background = color || 'rgba(0,0,0,0.95)'
    screen.appendChild(div)
    if (isZone) div.style.zIndex = '50'
    walls.push({ wall:div, x:wx, y:wy, w:ww, h:wh })
}

const W       = 6000
const H       = 8000
const t       = 30
const topDoor = 600
const center  = W / 2

add(0,   0,   W-t*2, t,    'darkblue', true)
add(0,   t,   t,     1800, '#darkblue', true)
add(W-t, t,   t,     1800, '#darkblue', true)
add(t,   1800, center-topDoor/2-t, t, '#darkblue', true)
add(center+topDoor/2, 1800, W-(center+topDoor/2)-t, t, '#darkblue', true)
add(2500, 0, 30, 1800, 'transparent')
add(3470, 0, 30, 1800, 'transparent')
add(0,    0, 2500, 30, 'transparent')
add(3500, 0, 2500, 30, 'transparent')
add(0,    2000, 2600+20, t,    '#e6b800', true)
add(0,    2000, t,    2400, '#e6b800', true)
add(0,    4400, 2600+30, t,    '#e6b800', true)
add(2600, 2000, t,    1100, '#e6b800', true)
add(2600, 3300, t,    1100, '#e6b800', true)
add(3400, 2000, 2600, t,    '#9b30ff', true)
add(W-t,  2000, t,    2400, '#9b30ff', true)
add(3400, 4400, 2600, t,    '#9b30ff', true)
add(3400, 2000, t,    1100, '#9b30ff', true)
add(3400, 3300, t,    1100, '#9b30ff', true)
add(0,    4800, 2620, t,    '#00ffab', true)
add(0,    4800, t,    2220, '#00ffab', true)
add(0,    7000, 2630, t,    '#00ffab', true)
add(2600, 4800, t,    1000, '#00ffab', true)
add(2600, 6000, t,    1020, '#00ffab', true)
add(3400, 4800, 2600, t,    '#ff00cc', true)
add(3400, 7000, 2600, t,    '#ff00cc', true)
add(W-t,  4800, t,    2200, '#ff00cc', true)
add(3400, 4800, t,    1000, '#ff00cc', true)
add(3400, 6000, t,    1000, '#ff00cc', true)
add(t,    7200, center-topDoor/2-t,               t,   '#c8a400', true)
add(center+topDoor/2, 7200, W-(center+topDoor/2)-t, t, '#c8a400', true)
add(t,    7200, t,     800, '#c8a400', true)
add(W-t,  7200, t,     800, '#c8a400', true)

const wordpuzzlewal = [
    { x:260,  y:4800+990,  w:60,  h:220 },
    { x:1150, y:4800+510,  w:240, h:60  },
    { x:1220, y:4800+1400, w:160, h:60  },
    { x:1550, y:4800+1020, w:60,  h:160 },
]

const wordPuzzleWallEntries = []
wordpuzzlewal.forEach(wp => {
    const div = document.createElement('div')
    div.className = 'wall zone-wall'
    div.style.left       = wp.x + 'px'
    div.style.top        = wp.y + 'px'
    div.style.width      = wp.w + 'px'
    div.style.height     = wp.h + 'px'
    div.style.background = 'transparent'
    div.style.border     = 'none'
    screen.appendChild(div)
    const entry = { wall:div, x:wp.x, y:wp.y, w:wp.w, h:wp.h }
    walls.push(entry)
    wordPuzzleWallEntries.push(entry)
})

add(30,4830,2580,50,'black')
add(30,6960,2560,50,'black')
add(30,4850,50,2160,'black')
add(2560,4850,50,950,'black')
add(2560,6000,50,1000,'black')
add(270,5070,2060,50,'black')
add(270,6710,2080,50,'black')
add(2310,5070,50,1690,'black')
add(270,5080,50,720,'black')
add(270,6000,50,720,'black')
add(550,5320,620,50,'black')
add(1380,5320,700,50,'black')
add(520,6460,1560,50,'black')
add(520,5320,50,1160,'black')
add(2060,5320,50,1190,'black')
add(770,5570,1070,50,'black')
add(770,6210,450,50,'black')
add(1370,6210,490,50,'black')
add(770,5570,50,660,'black')
add(1810,5570,50,660,'black')
add(1020,5770,580,50,'black')
add(1020,6010,580,50,'black')
add(1020,5770,50,260,'black')
add(1560,5770,50,90,'black')
add(1560,5970,50,90,'black')

const mx = 40, my = 2020
const mazeWidth = 2600, mazeHeight = 2400
const scaleX = mazeWidth / 836
const scaleY = mazeHeight / 836
function maze(ax, ay, aw, ah) {
    add(mx + ax*scaleX, my + ay*scaleY, aw*scaleX+1, ah*scaleY+1)
}
const s = 24
maze(1,80,90,s); maze(120,0,s,200); maze(120,240,s,60); maze(120,120,160,s)
maze(280,55,200,s); maze(400,55,s,190); maze(260,180,340,s); maze(550,150,s,100)
maze(550,0,s,100); maze(640,120,100,s); maze(780,50,45,s); maze(640,0,s,130)
maze(720,30,s,210); maze(780,30,s,210)
maze(30,280,220,s); maze(280,180,s,100); maze(130,280,s,120); maze(280,280,120,s)
maze(400,280,s,150); maze(480,280,160,s); maze(450,350,160,s); maze(640,180,s,200)
maze(720,280,s,120)
maze(80,380,210,s); maze(200,440,140,s); maze(130,500,160,s); maze(150,400,s,170)
maze(400,420,200,s); maze(640,380,104,s); maze(720,280,105,s)
maze(80,460,s,140); maze(0,380,s,140); maze(80,600,264,s); maze(320,290,s,320)
maze(400,500,s,220); maze(480,560,120,s); maze(576,504,s,120); maze(576,420,s,50)
maze(640,440,s,50); maze(720,446,105,s); maze(600,520,145,s); maze(720,620,80,s)
maze(0,660,160,s); maze(0,740,160,s); maze(220,560,s,160); maze(280,700,144,s)
maze(320,550,100,s); maze(400,650,100,s); maze(400,700,s,110); maze(480,700,s,110)
maze(520,726,200,s); maze(560,650,80,s); maze(780,460,s,220); maze(660,550,s,200)
maze(80,740,s,70); maze(160,810,120,s); maze(280,700,s,135)
maze(400,787,120,s); maze(520,651,s,160); maze(580,660,s,114)
maze(580,805,s,30); maze(640,750,160,s); maze(635,810,190,s)

masterDoorEl = document.createElement('div')
masterDoorEl.id = 'masterDoor'
masterDoorEl.textContent = 'MASTER DOOR'
screen.appendChild(masterDoorEl)
walls.push({ wall:masterDoorEl, x:2700, y:1785, w:600, h:50 })
masterWallEntry = walls[walls.length - 1]
walls.push({ wall: document.getElementById('win'), x: 2850, y: 160, w: 300, h: 500 })

const combodorX = center - 300
const combodorY = 7200
const combodorW = 600
const combodorH = 20
const correctCombo = ['A1','B2','C3','D4']
let comboDoorUnlocked = false
let comboMenuOpen = false

const comboDoorEl = document.getElementById('comboDoor')
comboDoorEl.style.left  = combodorX + 'px'
comboDoorEl.style.top   = combodorY + 'px'
comboDoorEl.style.width = combodorW + 'px'
const comboDoorWallEntry = { wall:comboDoorEl, x:combodorX, y:combodorY, w:combodorW, h:combodorH }
walls.push(comboDoorWallEntry)

document.querySelectorAll('.codeBox').forEach((box, index, arr) => {
    box.addEventListener('input', () => {
        box.value = box.value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,2)
        if (box.value.length === 2 && index < arr.length - 1) arr[index+1].focus()
    })
    box.addEventListener('keydown', e => {
        if (e.key === 'Backspace' && box.value === '' && index > 0) arr[index-1].focus()
    })
})

function nearComboDoor() {
    const REACH = 80
    return (
        x + 50 > combodorX - REACH && x < combodorX + combodorW + REACH &&
        y + 50 > combodorY - REACH && y < combodorY + combodorH + REACH
    )
}
function openComboMenu() {
    comboMenuOpen = true; uiOpen = true
    document.getElementById('comboMenu').style.display = 'flex'
    document.getElementById('comboResult').textContent = ''
    document.querySelectorAll('.codeBox').forEach(i => i.value = '')
    document.getElementById('c1').focus()
}
function closeComboMenu() {
    comboMenuOpen = false; uiOpen = false
    document.getElementById('comboMenu').style.display = 'none'
    clearKeys()
}
function checkCombo() {
    const input = ['c1','c2','c3','c4'].map(id => document.getElementById(id).value.toUpperCase())
    if (JSON.stringify(input) === JSON.stringify(correctCombo)) {
        document.getElementById('comboResult').textContent = 'CORRECT — DOOR UNLOCKED'
        document.getElementById('comboResult').style.color = 'lime'
        comboDoorUnlocked = true
        const idx = walls.indexOf(comboDoorWallEntry)
        if (idx !== -1) walls.splice(idx, 1)
        comboDoorEl.style.opacity = '0.2'
        comboDoorEl.textContent = 'OPEN'
        setTimeout(closeComboMenu, 1000)
    } else {
        document.getElementById('comboResult').textContent = 'WRONG CODE'
        document.getElementById('comboResult').style.color = 'red'
    }
}

const zoneOverlays = [
    { el:null, zone:leftRedZone,      id:'overlay-red-left'  },
    { el:null, zone:corridorZone,     id:'overlay-corr'      },
    { el:null, zone:rightRedZone,     id:'overlay-red-right' },
    { el:null, zone:yellowTopZone,    id:'overlay-ytop'      },
    { el:null, zone:yellowBottomZone, id:'overlay-ybot'      },
    { el:null, zone:purpleZone,       id:'overlay-ptop'      },
    { el:null, zone:purpleBottomZone, id:'overlay-pbot'      },
    { el:null, zone:bottomgreenZone,  id:'overlay-bot'       },
]
zoneOverlays.forEach(o => {
    const div = document.createElement('div')
    div.className = 'zoneOverlay'
    div.id = o.id
    div.style.left   = o.zone.x + 'px'
    div.style.top    = o.zone.y + 'px'
    div.style.width  = o.zone.w + 'px'
    div.style.height = o.zone.h + 'px'
    screen.appendChild(div)
    o.el = div
})

function inZone(zone) {
    return x+25 > zone.x && x+25 < zone.x+zone.w && y+25 > zone.y && y+25 < zone.y+zone.h
}
function inLightZone() {
    return x+50 > lightGameArea.x && x < lightGameArea.x+lightGameArea.w &&
           y+50 > lightGameArea.y && y < lightGameArea.y+lightGameArea.h
}
function inPurpleBottomZone() {
    return x+50 > purpleBottomZone.x && x < purpleBottomZone.x+purpleBottomZone.w &&
           y+50 > purpleBottomZone.y && y < purpleBottomZone.y+purpleBottomZone.h
}

let prevX = x, prevY = y
let failTimeout = null
const lightHueEl = document.getElementById('lightHue')

function applyLightVisuals(light) {
    lightHueEl.classList.remove('flash-red','hue-green','hue-red')
    lightHueEl.classList.add(light === 'green' ? 'hue-green' : 'hue-red')
}

function startLightCycle() {
    if (lightCycleRunning) return
    lightCycleRunning = true
    function greenPhase() {
        if (!running) return
        gameLight = 'green'
        lightswitchEl.textContent = 'GREEN LIGHT'
        lightswitchEl.classList.remove('red-state')
        applyLightVisuals('green')
        setTimeout(() => { if (running) warningPhase() }, 2500)
    }
    function warningPhase() {
        if (!running) return
        let flashes = 0
        const flashInterval = setInterval(() => {
            flashes++
            if (flashes % 2 === 1) {
                lightHueEl.classList.remove('hue-green')
                lightHueEl.classList.add('flash-red')
            } else {
                lightHueEl.classList.remove('flash-red')
                lightHueEl.classList.add('hue-green')
            }
            if (flashes >= 4) { clearInterval(flashInterval); redPhase() }
        }, 300)
    }
    function redPhase() {
        if (!running) return
        gameLight = 'red'
        lightswitchEl.textContent = 'RED LIGHT'
        lightswitchEl.classList.add('red-state')
        applyLightVisuals('red')
        setTimeout(() => { if (running) greenPhase() }, 3000)
    }
    greenPhase()
}

function triggerFail() {
    failEl.style.display = 'flex'
    if (failTimeout) clearTimeout(failTimeout)
    failTimeout = setTimeout(() => { failEl.style.display = 'none' }, 200)
    x = lighminigameEntranceX + 50
    y = lighminigameEntranceY
    stunned = true
    setTimeout(() => { stunned = false }, 2000)
}

function useMasterDoorKey() {
    if (masterDoorUnlocked) return
    const available = ['puzzlekey','wordkey','colorkey','mazekey'].find(t => inventory[t] > 0 && !masterKeySlots[t])
    if (!available) return
    masterKeySlots[available] = true
    const slot = inventoryUI.querySelector(`[data-type="${available}"]`)
    if (slot) inventoryUI.removeChild(slot)
    inventory[available]--
    if (inventory[available] <= 0) delete inventory[available]
    const oi = order.indexOf(available)
    if (oi !== -1) order.splice(oi, 1)
    const usedCount = Object.values(masterKeySlots).filter(v => v).length
    masterDoorEl.textContent = `MASTER Door ${usedCount}/4 KEYS`
    if (Object.values(masterKeySlots).every(v => v)) {
        masterDoorUnlocked = true
        const idx = walls.indexOf(masterWallEntry)
        if (idx !== -1) walls.splice(idx, 1)
        masterDoorEl.classList.add('unlocked')
        masterDoorEl.textContent = 'MASTER Door UNLOCKED'
    }
}
function nearMasterDoor() {
    if (masterDoorUnlocked) return false
    return x < 2700+600 && x+50 > 2700-20 && y < 1785+60 && y+50 > 1785-20
}

function nearMachine() {
    const puzzles = [
        {el:puzzle1,id:1},{el:puzzle2,id:2},{el:puzzle3,id:3},{el:puzzle4,id:4}
    ]
    for (let p of puzzles) {
        let px = purpleZone.x + p.el.offsetLeft
        let py = purpleZone.y + p.el.offsetTop
        if (x < px+110 && x+50 > px && y < py+110 && y+50 > py) return p.id
    }
    return null
}

function resetBoxesAndColors() {
    if (colorHolding) {
        const ci = colorItems.find(c => c.type === colorHolding)
        if (ci) { ci.picked = false; ci.el.style.display = 'block' }
        colorHolding = null
        updateColorInventoryUI()
    }
    colorBoxes.forEach(box => {
        box.filled = false
        box.el.textContent = ''
        box.el.style.background = '#111'
    })
    colorItems.forEach(ci => {
        const p = randColorPos()
        ci.picked = false; ci.wx = p.wx; ci.wy = p.wy
        ci.el.style.display = 'block'
    })
    score = 0
    colorKeySpawned = false
    const notif = document.createElement('div')
    notif.style.cssText = `position:fixed;top:40%;left:50%;transform:translate(-50%,-50%);
        z-index:9999;background:rgba(0,0,0,0.85);border:2px solid magenta;
        color:magenta;font-size:18px;letter-spacing:3px;padding:14px 32px;
        border-radius:8px;pointer-events:none;text-align:center;`
    notif.textContent = 'BOXES & COLORS RESET'
    document.body.appendChild(notif)
    setTimeout(() => notif.remove(), 1000)
}

const ROOM_RULES = [
    {
        id:'sign-maze', label:'MAZE', wx:2630, wy:2980,
        color:'#00ffab', borderColor:'#005533', textColor:'#000',
        title:'MAZE SECTOR', titleColor:'#00ffab',
        body:[
            'Navigate through the winding corridors.',
            '',
            '• Navigate through darkness with minimal light',
            '• Find the keycard to find the hidden key inside',
            '• The maze has one correct path',
            '• Find the Blacklight (X) to reveal secrets (Can be used anywhere)',
            '',
            'Get the key to reach the door & earn the MAZE KEY.'
        ]
    },
    {
        id:'sign-word', label:'WORD', wx:2630, wy:5680,
        color:'cyan', borderColor:'darkcyan', textColor:'#000',
        title:'WORD PUZZLE SECTOR', titleColor:'cyan',
        body:[
            'Four scrambled word puzzles block your path.',
            '',
            '• 4 Different topics',
            '• Unscramble the words shown',
            '• Each puzzle has 5 words',
            '• Type your answer and press SUBMIT',
            '',
            'Reach the end to earn the WORD KEY.'
        ]
    },
    {
        id:'sign-puzzle', label:'PUZZLE', wx:3370, wy:2980,
        color:'violet', borderColor:'purple', textColor:'#fff',
        title:'JIGSAW SECTOR', titleColor:'violet',
        body:[
            'Four jigsaw puzzles must be completed.',
            '',
            '• Walk up to a green panel and press SPACE',
            '• Drag pieces onto the 4x4 grid',
            '• Lime border = correctly placed piece',
            '• Complete all 16 pieces per puzzle',
            '',
            'Finish all 4 to earn the PUZZLE KEY.'
        ]
    },
    {
        id:'sign-color', label:'COLOR', wx:3370, wy:5680,
        color:'magenta', borderColor:'#880088', textColor:'#fff',
        title:'COLOR LIGHT SECTOR', titleColor:'magenta',
        body:[
            'Match The colors to the boxes',
            '',
            '• GREEN LIGHT — move freely, pick up and run back',
            '• RED LIGHT — freeze or you get sent back',
            '• Carry one color at a time to the Safezone',
            '• Drop it on the matching colored box',
            '',
            'Match all 8 colors to earn the COLOR KEY.'
        ]
    }
]

const ruleSigns = []
ROOM_RULES.forEach(rule => {
    const el = document.createElement('div')
    el.id = rule.id
    el.style.position    = 'absolute'
    el.style.width       = '30px'
    el.style.height      = '100px'
    el.style.left        = rule.wx + 'px'
    el.style.top         = rule.wy + 'px'
    el.style.background  = rule.color
    el.style.border      = '3px solid ' + rule.borderColor
    el.style.color       = rule.textColor
    el.style.display     = 'flex'
    el.style.alignItems  = 'center'
    el.style.justifyContent = 'center'
    el.style.fontSize    = '7px'
    el.style.fontWeight  = '700'
    el.style.letterSpacing = '1px'
    el.style.textAlign   = 'center'
    el.style.writingMode = 'vertical-rl'
    el.style.zIndex      = '60'
    el.style.cursor      = 'default'
    el.style.transition  = 'box-shadow 0.2s, outline 0.2s'
    el.style.animation   = 'signPulse 2s infinite'
    el.textContent = rule.label
    screen.appendChild(el)
    ruleSigns.push({ el, rule, wx:rule.wx, wy:rule.wy })
})

function nearRulesSign() {
    const REACH = 80
    return ruleSigns.find(s =>
        x+50 > s.wx-REACH && x < s.wx+30+REACH &&
        y+50 > s.wy-REACH && y < s.wy+100+REACH
    ) || null
}

const rulesPopup = document.createElement('div')
rulesPopup.style.cssText = `
    display:none;position:fixed;inset:0;z-index:10000;
    justify-content:center;align-items:center;background:rgba(0,0,0,0.8);
`
document.body.appendChild(rulesPopup)

const rulesInner = document.createElement('div')
rulesInner.style.cssText = `
    width:520px;background:#111;padding:32px;border:4px solid white;
    font-family:'Orbitron',monospace;color:white;position:relative;
`
rulesPopup.appendChild(rulesInner)

const rulesTitleEl = document.createElement('div')
rulesTitleEl.style.cssText = `font-size:22px;font-weight:900;letter-spacing:4px;margin-bottom:24px;text-align:center;`
rulesInner.appendChild(rulesTitleEl)

const rulesBodyEl = document.createElement('div')
rulesBodyEl.style.cssText = `font-size:13px;letter-spacing:1px;line-height:2;color:rgba(255,255,255,0.85);`
rulesInner.appendChild(rulesBodyEl)

rulesCloseBtn.textContent = 'CLOSE'
rulesCloseBtn.style.cssText = `
    display:block;margin:24px auto 0;padding:10px 32px;background:transparent;
    border:2px solid white;color:white;font-family:'Orbitron',monospace;
    font-size:13px;letter-spacing:3px;cursor:pointer;
`
rulesCloseBtn.onmouseover = () => { rulesCloseBtn.style.background='white'; rulesCloseBtn.style.color='black' }
rulesCloseBtn.onmouseout  = () => { rulesCloseBtn.style.background='transparent'; rulesCloseBtn.style.color='white' }
rulesCloseBtn.onclick = closeRulesMenu
rulesInner.appendChild(rulesCloseBtn)

function openRulesMenu(s) {
    uiOpen = true
    rulesTitleEl.textContent = s.rule.title
    rulesTitleEl.style.color = s.rule.titleColor
    rulesInner.style.borderColor = s.rule.titleColor
    rulesCloseBtn.style.borderColor = s.rule.titleColor
    rulesBodyEl.innerHTML = ''
    s.rule.body.forEach(line => {
        const p = document.createElement('p')
        p.style.margin = '6px 0'
        p.textContent = line
        rulesBodyEl.appendChild(p)
    })
    rulesPopup.style.display = 'flex'
}
function closeRulesMenu() {
    rulesPopup.style.display = 'none'
    uiOpen = false
    clearKeys()
}
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && rulesPopup.style.display === 'flex') closeRulesMenu()
    if (e.key.toLowerCase() === 'e' && !uiOpen) {
        const nearSign = nearRulesSign()
        if (nearSign) openRulesMenu(nearSign)
    }
})

let nearbyWordPuzzle = null

function checkWordPuzzleProximity() {
    let found = null
    for (let wp of wordPuzzles) {
        const wx = yellowBottomZone.x + wp.el.offsetLeft
        const wy = yellowBottomZone.y + wp.el.offsetTop
        const ww = wp.el.offsetWidth
        const wh = wp.el.offsetHeight
        const REACH = 50
        if (x+50 > wx-REACH && x < wx+ww+REACH && y+50 > wy-REACH && y < wy+wh+REACH) {
            found = wp; break
        }
    }
    wordPuzzles.forEach(wp => wp.el.classList.remove('nearby'))
    if (found) found.el.classList.add('nearby')
    nearbyWordPuzzle = found
}

document.addEventListener('keydown', e => {
    keys[e.key] = true
    keys[e.key.toLowerCase()] = true

    if (e.key.toLowerCase() === 'm') view = !view
    if (e.key.toLowerCase() === 'h') noclip = !noclip
    if (e.key.toLowerCase() === 'g') debug = !debug
    if (e.key.toLowerCase() === 't') { x = mouseX; y = mouseY }
    if (e.key.toLowerCase() === 'p') forceend()
    if (e.key === 'x') { if (inventory['light'] > 0) lightOn = !lightOn }

    if (e.key.toLowerCase() === 'q') {
        const toDrop = [...order].reverse().find(t => t !== 'light')
        if (!toDrop) return
        const slot = inventoryUI.querySelector(`[data-type="${toDrop}"]`)
        if (slot) inventoryUI.removeChild(slot)
        inventory[toDrop]--
        if (inventory[toDrop] <= 0) delete inventory[toDrop]
        const oi = order.lastIndexOf(toDrop)
        if (oi !== -1) order.splice(oi, 1)
        const droppedItem = items.find(i => i.type === toDrop && i.picked)
        if (droppedItem) {
            droppedItem.picked = false; droppedItem.hidden = false
            droppedItem.x = x; droppedItem.y = y
            droppedItem.item.style.left    = x + 'px'
            droppedItem.item.style.top     = y + 'px'
            droppedItem.item.style.display = 'flex'
        }
    }

    if (e.key.toLowerCase() === 'v') { if (currentPuzzle) instantSolvePuzzle(currentPuzzle) }
    if (e.key.toLowerCase() === 'k') { if (wordWindow.style.display === 'flex') instantSolveWordPuzzle() }

    if (e.key === ' ') {
        if (uiOpen) return

        const winEl = document.getElementById('win')
        const winX = 2850, winY = 200, winW = 300, winH = 500
        if (x + 50 > winX && x < winX + winW && y + 50 > winY && y < winY + winH) {
            running = false
            document.getElementById('winScreen').style.display = 'flex'
            return
        }
        const machine = nearMachine()
        if (machine) { openPuzzle(machine); return }
        if (nearMasterDoor()) { useMasterDoorKey(); return }
        if (nearResetPanel()) { resetBoxesAndColors(); return }
        const td = nearToggleDoor()
        if (td) { activateToggleDoor(td); return }
        if (nearComboDoor() && !comboDoorUnlocked) { openComboMenu(); return }
        if (nearbyWordPuzzle && !nearbyWordPuzzle.solved) { openWordPuzzle(nearbyWordPuzzle); return }

        items.forEach(item => {
            if (item.picked || item.hidden || !colliding(item)) return
            if (item.type === 'light') {
                item.picked = true
                inventory['light'] = (inventory['light'] || 0) + 1
                lightOn = false
                item.item.style.display = 'none'
                return
            }
            const count = order.filter(t => t !== 'light' && t !== 'colorkey' && t !== 'puzzlekey' && t !== 'wordkey' && t !== 'mazekey').length
            if (count < 4) {
                item.picked = true
                adinventory(item.type)
                item.item.style.display = 'none'
            }
        })

        const pk = items.find(i => i.type === 'puzzlekey')
        if (pk && !pk.hidden && !pk.picked && colliding(pk)) {
            pk.picked = true; adinventory('puzzlekey'); pk.item.style.display = 'none'
        }
        const mk = items.find(i => i.type === 'wordkey')
        if (mk && !mk.hidden && !mk.picked && colliding(mk)) {
            mk.picked = true; adinventory('wordkey'); mk.item.style.display = 'none'
        }
        const ck = items.find(i => i.type === 'colorkey')
        if (ck && !ck.hidden && !ck.picked && colliding(ck)) {
            ck.picked = true; adinventory('colorkey'); ck.item.style.display = 'none'
        }
        const mk2b = items.find(i => i.type === 'mazekey')
        if (mk2b && !mk2b.hidden && !mk2b.picked && colliding(mk2b)) {
            mk2b.picked = true; adinventory('mazekey'); mk2b.item.style.display = 'none'
        }

        doors.forEach(dor => {
            if (dor.unlocked || !contact(dor)) return
            if (!inventory[dor.type] || inventory[dor.type] < 1) return
            dor.unlocked = true
            dor.dor.style.opacity    = '0.25'
            dor.dor.style.background = 'rgba(255,255,255,0.1)'
            dor.dor.textContent      = 'Open'
            const slot = inventoryUI.querySelector(`[data-type="${dor.type}"]`)
            if (slot) inventoryUI.removeChild(slot)
            inventory[dor.type]--
            if (inventory[dor.type] <= 0) delete inventory[dor.type]
            const idx = order.indexOf(dor.type)
            if (idx !== -1) order.splice(idx, 1)
        })

        if (inLightZone() && gameLight === 'green') {
            colorItems.forEach(ci => {
                if (ci.picked || colorHolding) return
                if (x < ci.wx+80 && x+50 > ci.wx && y < ci.wy+80 && y+50 > ci.wy) {
                    ci.picked = true; colorHolding = ci.type
                    ci.el.style.display = 'none'; updateColorInventoryUI()
                }
            })
        }

        if (colorHolding) {
            colorBoxes.forEach((box, i) => {
                if (box.filled) return
                const bpos = boxworldposi[i]
                if (x < bpos.x+100 && x+50 > bpos.x && y < bpos.y+100 && y+50 > bpos.y) {
                    box.filled = true
                    box.el.textContent = colorHolding.toUpperCase()
                    box.el.style.background = colorHolding === 'yellow' ? '#cccc00' : colorHolding
                    box.el.style.color = (colorHolding === 'yellow' || colorHolding === 'white') ? '#000' : 'white'
                    if (box.type === colorHolding) { box.el.style.border = '4px solid ' + colorHolding; score++; checkColorComplete() }
                    else box.el.style.border = 'none'
                    colorHolding = null; updateColorInventoryUI()
                }
            })
        }
    }
})

document.addEventListener('keyup', e => {
    keys[e.key] = false
    keys[e.key.toLowerCase()] = false
})

screen.addEventListener('mousemove', e => {
    const rect = screen.getBoundingClientRect()
    mouseX = Math.floor(e.clientX - rect.left)
    mouseY = Math.floor(e.clientY - rect.top)
})

function spawnPuzzleKey() {
    if (puzzleKeySpawned) return
    puzzleKeySpawned = true
    const pk = items.find(i => i.type === 'puzzlekey')
    if (!pk) return
    pk.hidden = false; pk.picked = false
    pk.x = puzzlekeyposi.x; pk.y = puzzlekeyposi.y
    pk.item.style.left    = pk.x + 'px'
    pk.item.style.top     = pk.y + 'px'
    pk.item.style.display = 'flex'
    const notif = document.createElement('div')
    notif.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
        z-index:9999;background:rgba(0,0,0,0.85);border:3px solid red;
        color:red;font-size:22px;letter-spacing:3px;padding:20px 40px;
        border-radius:8px;pointer-events:none;text-align:center;`
    notif.innerHTML = '🗝️ PUZZLE KEY SPAWNED<br><span style="font-size:14px;color:#fff;">All 4 puzzles complete!</span>'
    document.body.appendChild(notif)
    setTimeout(() => notif.remove(), 3000)
}

function checkColorComplete() {
    if (colorKeySpawned || score < 8) return
    colorKeySpawned = true
    const ck = items.find(i => i.type === 'colorkey')
    if (!ck) return
    ck.hidden = false; ck.picked = false
    ck.x = colorkeyposi.x; ck.y = colorkeyposi.y
    ck.item.style.left    = ck.x + 'px'
    ck.item.style.top     = ck.y + 'px'
    ck.item.style.display = 'flex'
    const notif = document.createElement('div')
    notif.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
        z-index:9999;background:rgba(0,0,0,0.85);border:3px solid magenta;
        color:magenta;font-size:22px;letter-spacing:3px;padding:20px 40px;
        border-radius:8px;pointer-events:none;text-align:center;`
    notif.innerHTML = '🗝️ COLOR KEY SPAWNED<br><span style="font-size:14px;color:#fff;">All 8 colors matched!</span>'
    document.body.appendChild(notif)
    setTimeout(() => notif.remove(), 3000)
}

const wordWindow = document.createElement('div')
wordWindow.id = 'wordWindow'
wordWindow.innerHTML = `
<div id="wordBox">
    <button id="wordClose">X</button>
    <div id="wordTheme"></div>
    <div id="scrambled"></div>
    <input id="wordInput" autocomplete="off">
    <br>
    <button id="wordSubmit">SUBMIT</button>
    <div id="wordProgress"></div>
    <div id="wordResult"></div>
    <div id="wordComplete"></div>
</div>`
document.body.appendChild(wordWindow)

const wordPuzzles = [
    {
        el: document.getElementById('wordPuzzle1'),
        theme: 'ANIMALS',
        words: ['cat','shark','jellyfish','dog','raccoon'],
        solved: false
    },
    {
        el: document.getElementById('wordPuzzle2'),
        theme: 'FLOWERS',
        words: ['tigerlilies','roses','tulips','pernicious','hydrangeas'],
        solved: false
    },
    {
        el: document.getElementById('wordPuzzle3'),
        theme: 'GAMES',
        words: ['minecraft','sims','roblox','fortnite','mario'],
        solved: false
    },
    {
        el: document.getElementById('wordPuzzle4'),
        theme: 'OCEAN',
        words: ['shark','whale','coral','octopus','dolphin'],
        solved: false
    }
]

const wordThemeEl    = document.getElementById('wordTheme')
const scrambledEl    = document.getElementById('scrambled')
const wordInput      = document.getElementById('wordInput')
const wordProgress   = document.getElementById('wordProgress')
const wordResult     = document.getElementById('wordResult')
const wordComplete   = document.getElementById('wordComplete')

document.getElementById('win').addEventListener('click', () => {
    running = false
    document.getElementById('winScreen').style.display = 'flex'
})

let currentWordPuzzle = null
let currentWordIndex  = 0
let currentAnswer     = ''

function scramble(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('')
}

function removeWordPuzzleWall(puzzle) {
    const wpIdx = wordPuzzles.indexOf(puzzle)
    if (wpIdx !== -1 && wordPuzzleWallEntries[wpIdx]) {
        const wi = walls.indexOf(wordPuzzleWallEntries[wpIdx])
        if (wi !== -1) walls.splice(wi, 1)
    }
}

function instantSolveWordPuzzle() {
    if (!currentWordPuzzle) return
    const puzzle = currentWordPuzzle
    currentWordIndex = puzzle.words.length
    puzzle.solved = true
    wordThemeEl.textContent = 'DONE'
    scrambledEl.textContent = ''
    wordProgress.textContent = ''
    wordResult.textContent = ''
    wordComplete.textContent = 'PUZZLE COMPLETE'
    puzzle.el.style.background = 'green'
    puzzle.el.style.borderColor = 'lime'
    removeWordPuzzleWall(puzzle)
    wordWindow.style.display = 'none'
    uiOpen = false
    currentWordPuzzle = null
    clearKeys()
}

function openWordPuzzle(puzzle) {
    uiOpen = true
    currentWordPuzzle = puzzle
    currentWordIndex  = 0
    wordComplete.textContent = ''
    loadWord()
    wordWindow.style.display = 'flex'
}

function loadWord() {
    if (currentWordIndex >= currentWordPuzzle.words.length) {
        currentWordPuzzle.solved = true
        wordComplete.textContent = 'PUZZLE COMPLETE'
        scrambledEl.textContent  = ''
        wordThemeEl.textContent  = 'DONE'
        wordProgress.textContent = ''
        currentWordPuzzle.el.style.background  = 'green'
        currentWordPuzzle.el.style.borderColor = 'lime'
        removeWordPuzzleWall(currentWordPuzzle)
        setTimeout(() => {
            wordWindow.style.display = 'none'
            uiOpen = false
            currentWordPuzzle = null
            clearKeys()
        }, 1200)
        return
    }
    currentAnswer = currentWordPuzzle.words[currentWordIndex]
    wordThemeEl.textContent  = 'THEME: ' + currentWordPuzzle.theme
    scrambledEl.textContent  = scramble(currentAnswer).toUpperCase()
    wordProgress.textContent = (currentWordIndex+1) + '/' + currentWordPuzzle.words.length
    wordResult.textContent   = ''
    wordInput.value          = ''
}

function submitWord() {
    if (wordInput.value.toLowerCase().trim() === currentAnswer) {
        wordResult.textContent = 'CORRECT'
        currentWordIndex++
        setTimeout(loadWord, 600)
    } else {
        wordResult.textContent = 'WRONG'
    }
}

document.getElementById('wordSubmit').onclick = submitWord
document.addEventListener('keydown', e => {
    if (uiOpen && e.key !== 'Escape' && e.key.toLowerCase() !== 'k') return
    if (e.key === 'Enter' && wordWindow.style.display === 'flex') submitWord()
})
document.getElementById('wordClose').onclick = e => {
    e.stopPropagation()
    uiOpen = false
    wordWindow.style.display = 'none'
    clearKeys()
}

function openPuzzle(id) {
    currentPuzzle = id
    prewindow.style.display = 'flex'
    spawnPieces(id)
}

function closePuzzle() {
    const state = puzzleStates[currentPuzzle]
    state.pieceData = []
    state.puzzlePieces.forEach(piece => {
        state.pieceData.push({ left:piece.style.left, top:piece.style.top, locked:piece.dataset.locked })
        piece.remove()
    })
    state.puzzlePieces = []
    prewindow.style.display = 'none'
    clearKeys()
}

document.getElementById('close').addEventListener('click', closePuzzle)

function spawnPieces(id) {
    const state = puzzleStates[id]
    if (state.puzzlePieces.length > 0) return
    const images = pieceImages[id]
    for (let i = 0; i < 16; i++) {
        const piece = document.createElement('div')
        piece.className     = 'piece'
        piece.dataset.index = i
        const img = document.createElement('img')
        img.src = images[i]
        piece.appendChild(img)
        document.body.appendChild(piece)
        if (state.pieceData[i]) {
            piece.style.left = state.pieceData[i].left
            piece.style.top  = state.pieceData[i].top
            if (state.pieceData[i].locked) {
                piece.dataset.locked = 'true'
                piece.style.border   = '3px solid lime'
            }
        } else {
            piece.style.left = Math.random() * (window.innerWidth  - 150) + 'px'
            piece.style.top  = Math.random() * (window.innerHeight - 150) + 'px'
        }
        piece.addEventListener('mousedown', e => {
            if (piece.dataset.locked === 'true') return
            dragged  = piece
            const rect = piece.getBoundingClientRect()
            dragOffX = e.clientX - rect.left
            dragOffY = e.clientY - rect.top
            piece.style.zIndex = 999
        })
        state.puzzlePieces.push(piece)
    }
}

document.addEventListener('mousemove', e => {
    if (!dragged) return
    dragged.style.left = (e.clientX - dragOffX) + 'px'
    dragged.style.top  = (e.clientY - dragOffY) + 'px'
})

document.addEventListener('mouseup', e => {
    if (!dragged || !currentPuzzle) return
    const state = puzzleStates[currentPuzzle]
    const rect  = miniboard.getBoundingClientRect()
    const bx = e.clientX - rect.left
    const by = e.clientY - rect.top
    const inside = bx >= 0 && bx <= SIZE && by >= 0 && by <= SIZE

    for (let i = 0; i < state.snapState.length; i++) {
        if (state.snapState[i] === dragged) state.snapState[i] = null
    }

    if (inside) {
        const col = Math.floor(bx / CELL)
        const row = Math.floor(by / CELL)
        const gridIndex = row * 4 + col
        if (state.snapState[gridIndex] && state.snapState[gridIndex] !== dragged) {
            dragged = null; return
        }
        state.snapState[gridIndex] = dragged
        dragged.style.left = (rect.left + col * CELL) + 'px'
        dragged.style.top  = (rect.top  + row * CELL) + 'px'
        const correctSpot = parseInt(dragged.dataset.index) === gridIndex
        if (correctSpot) {
            if (!dragged.dataset.locked) state.correct++
            dragged.dataset.locked = 'true'
            dragged.style.border   = '3px solid lime'
        } else {
            if (dragged.dataset.locked === 'true') state.correct--
            dragged.dataset.locked = ''
            dragged.style.border   = '2px solid rgba(0,0,0,0.4)'
        }
    }
    dragged = null
    savePieceData(currentPuzzle)
    updatePreview(currentPuzzle)
    if (state.correct === 16) finalizePuzzle(state, currentPuzzle)
})

function finalizePuzzle(state, id) {
    if (!state.completed) { state.completed = true; finishedpuzzles++ }
    winner.textContent = `PUZZLE ${id} COMPLETE`
    setTimeout(() => { winner.textContent = ''; closePuzzle() }, 1200)
    if (finishedpuzzles >= 4) spawnPuzzleKey()
}

function instantSolvePuzzle(id) {
    const state = puzzleStates[id]
    if (state.completed) { closePuzzle(); return }
    state.snapState = new Array(16).fill(null)
    state.correct   = 16
    state.puzzlePieces.forEach(piece => {
        const index = parseInt(piece.dataset.index)
        const rect  = miniboard.getBoundingClientRect()
        const col   = index % 4
        const row   = Math.floor(index / 4)
        piece.style.left       = (rect.left + col * CELL) + 'px'
        piece.style.top        = (rect.top  + row * CELL) + 'px'
        piece.dataset.locked   = 'true'
        piece.style.border     = '3px solid lime'
        state.snapState[index] = piece
    })
    updatePreview(id)
    finalizePuzzle(state, id)
}

function savePieceData(id) {
    const state = puzzleStates[id]
    state.pieceData = []
    state.puzzlePieces.forEach(piece => {
        state.pieceData.push({ left:piece.style.left, top:piece.style.top, locked:piece.dataset.locked })
    })
}

function updatePreview(id) {
    const state  = puzzleStates[id]
    const ctx    = previews[id]
    const images = pieceImages[id]
    const cell   = previewsize / 4
    ctx.clearRect(0, 0, previewsize, previewsize)
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, previewsize, previewsize)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    for (let i = 0; i < 16; i++) {
        const piece = state.snapState[i]
        if (!piece) continue
        const idx = parseInt(piece.dataset.index)
        const col = i % 4
        const row = Math.floor(i / 4)
        const img = new Image()
        img.src = images[idx]
        img.onload = () => ctx.drawImage(img, col*cell, row*cell, cell, cell)
    }
}

function darknessZone() {
    return x < 2600 && x+50 > 0 && y < 4400 && y+50 > 2000
}
function colliding(item) {
    return x < item.x+80 && x+80 > item.x && y < item.y+80 && y+80 > item.y
}
function locked(nx, ny) {
    return doors.some(dor => {
        if (dor.unlocked) return false
        const w = dor.type === 'purpledoor' ? 90 : 80
        return nx < dor.x+w && nx+75 > dor.x && ny < dor.y+80 && ny+75 > dor.y
    })
}
function blocked(nx, ny) {
    for (const w of walls) {
        if (nx < w.x+w.w && nx+75 > w.x && ny < w.y+w.h && ny+75 > w.y) return true
    }
    return false
}
function contact(dor) {
    const w = dor.type === 'purpledoor' ? 90 : 80
    const REACH = 80
    return x+75 > dor.x-REACH && x < dor.x+w+REACH && y+75 > dor.y-REACH && y < dor.y+80+REACH
}
function adinventory(type) {
    if (!inventory[type]) { inventory[type] = 0; slotss[type] = [] }
    inventory[type]++
    order.push(type)
    const slot = document.createElement('div')
    slot.className    = 'slot'
    slot.dataset.type = type
    slot.textContent  = type
    inventoryUI.appendChild(slot)
    slotss[type].push(slot)
}

const colorInventoryEl = document.getElementById('colorInventory')
function updateColorInventoryUI() {
    colorInventoryEl.innerHTML = ''
    if (colorHolding) {
        colorInventoryEl.classList.add('visible')
        const sl = document.createElement('div')
        sl.className = 'cslot'
        sl.textContent  = colorHolding
        sl.style.background = colorHolding === 'yellow' ? '#cccc00' : colorHolding
        sl.style.color  = colorHolding === 'yellow' ? '#333' : 'white'
        sl.style.border = '2px solid white'
        colorInventoryEl.appendChild(sl)
    } else {
        colorInventoryEl.classList.remove('visible')
    }
}

function baaar() {
    if (!running) return
    const elapsed  = Date.now() - startTime
    const progress = Math.min((elapsed / totalTime) * 100, 100)
    progressbar.style.width = progress + '%'
    if (progress >= 50 && progress < 80) {
        progressbar.style.background = 'linear-gradient(90deg,#ffb300,#ff6a00)'
        counter.style.color = '#ffb300'
        counter.style.textShadow = '0 0 10px #ffb300'
    } else if (progress >= 80) {
        progressbar.style.background = 'linear-gradient(90deg,#ff003c,#ff7b00)'
        counter.style.color = '#ff003c'
        counter.style.textShadow = '0 0 12px #ff003c'
    }
    const remaining = Math.max(totalTime - elapsed, 0)
    const minutes   = Math.floor(remaining / 60000)
    const seconds   = Math.floor((remaining % 60000) / 1000)
    counter.innerText = `${minutes}:${seconds.toString().padStart(2,'0')}`
    if (progress < 100) { setTimeout(baaar, 1000) } else { gameOver() }
}

function forceend() {
    startTime = Date.now() - (totalTime - 3000)
    counter.style.color = 'red'
    progressbar.style.background = 'linear-gradient(90deg,#ff003c,#ff0000)'
    baaar()
}

// ── PLAYER DIRECTION ──
function updatePlayerDirection() {
    if      (keys['ArrowUp']    || keys['w']) playerImg.src = 'Images/back.png'
    else if (keys['ArrowDown']  || keys['s']) playerImg.src = 'Images/me.png'
    else if (keys['ArrowLeft']  || keys['a']) playerImg.src = 'Images/left.png'
    else if (keys['ArrowRight'] || keys['d']) playerImg.src = 'Images/right.png'
}

// ── MAIN LOOP ──
const MapX = 6000, MapY = 8000
screen.style.width  = MapX + 'px'
screen.style.height = MapY + 'px'
const maxX = MapX - 75
const maxY = MapY - 75

function move() {
    if (!running) { requestAnimationFrame(move); return }
    if (uiOpen || wordWindow.style.display === 'flex') { requestAnimationFrame(move); return }

    const speed = keys['Shift'] ? 16 : 8
    let nx = x, ny = y

    if (keys['ArrowUp']    || keys['w']) ny -= speed
    if (keys['ArrowDown']  || keys['s']) ny += speed
    if (keys['ArrowLeft']  || keys['a']) nx -= speed
    if (keys['ArrowRight'] || keys['d']) nx += speed

    nx = Math.max(0, Math.min(nx, maxX))
    ny = Math.max(0, Math.min(ny, maxY))

    const wantsToMove = (nx !== x || ny !== y)
    if (stunned) {
        // frozen
    } else if (inLightZone() && gameLight === 'red' && wantsToMove && !noclip) {
        triggerFail()
    } else {
        if (noclip) { x = nx; y = ny }
        else {
            if (!locked(nx, y) && !blocked(nx, y)) x = nx
            if (!locked(x, ny) && !blocked(x, ny)) y = ny
        }
    }

    // ── UPDATE PLAYER DIRECTION IMAGE ──
    updatePlayerDirection()

    checkWordPuzzleProximity()

    ruleSigns.forEach(s => {
        s.el.style.outline    = ''
        s.el.style.boxShadow  = '0 0 10px currentColor'
    })
    const nearSign = nearRulesSign()
    if (nearSign) {
        nearSign.el.style.outline   = '2px solid white'
        nearSign.el.style.boxShadow = '0 0 20px currentColor, 0 0 40px rgba(255,255,255,0.3)'
    }

    resetPanelEl.style.left = RESET_PANEL_WORLD.x + 'px'
    resetPanelEl.style.top  = RESET_PANEL_WORLD.y + 'px'
    if (nearResetPanel()) {
        resetPanelEl.style.boxShadow = '0 0 24px 6px magenta'
        resetPanelEl.style.color = '#fff'
    } else {
        resetPanelEl.style.boxShadow = '0 0 14px rgba(255,0,255,0.5)'
        resetPanelEl.style.color = 'magenta'
    }

    player.style.left = x + 'px'
    player.style.top  = y + 'px'

    if (!view) {
        screen.style.transformOrigin = '0 0'
        screen.style.transform       = 'scale(1)'
        screen.style.left            = (window.innerWidth/2  - x) + 'px'
        screen.style.top             = (window.innerHeight/2 - y) + 'px'
    } else {
        screen.style.transformOrigin = '0 0'
        screen.style.transform       = 'scale(0.25)'
        screen.style.left            = '0px'
        screen.style.top             = '0px'
    }

    if (lightOn) {
        lightFx.style.display = 'block'
        lightFx.style.left    = (x-35) + 'px'
        lightFx.style.top     = (y-35) + 'px'
        secrets.forEach(sec => {
            const sx = sec.offsetLeft, sy = sec.offsetTop
            const near = x < sx+120 && x+120 > sx && y < sy+30 && y+120 > sy
            sec.style.color      = near ? 'darkorange' : 'rgba(255,255,255,0)'
            sec.style.textShadow = near ? '0 0 10px purple' : 'none'
        })
    } else {
        lightFx.style.display = 'none'
        secrets.forEach(sec => { sec.style.color = 'rgba(255,255,255,0)'; sec.style.textShadow = 'none' })
    }

    if (darknessZone()) {
        darkness.classList.add('active')
        const px = x + parseFloat(screen.style.left) + 25
        const py = y + parseFloat(screen.style.top)  + 25
        darkness.style.background = `radial-gradient(circle at ${px}px ${py}px,
            rgba(0,0,0,0) 0px, rgba(0,0,0,0.08) 70px, rgba(0,0,0,0.45) 120px,
            rgba(0,0,0,0.82) 180px, rgba(0,0,0,0.96) 260px, rgba(0,0,0,1) 420px)`
    } else {
        darkness.classList.remove('active')
    }

    items.forEach(item => {
        if (!item.picked && !item.hidden) {
            item.item.style.left = item.x + 'px'
            item.item.style.top  = item.y + 'px'
        }
    })

    colorItems.forEach(ci => {
        if (!ci.picked) {
            ci.el.style.left = (ci.wx - purpleBottomZone.x - 300) + 'px'
            ci.el.style.top  = (ci.wy - purpleBottomZone.y) + 'px'
        }
    })

    zoneOverlays.forEach(o => { o.el.classList.toggle('visible', inZone(o.zone)) })

    doors.forEach(dor => {
        dor.dor.style.left = dor.x + 'px'
        dor.dor.style.top  = dor.y + 'px'
    })

    const doorPromptEl = document.getElementById('doorPrompt')
    let promptText  = null
    let promptColor = 'rgba(255,255,255,0.3)'

    let nearLockedDoor = null
    doors.forEach(dor => { if (!dor.unlocked && contact(dor)) nearLockedDoor = dor })
    if (nearLockedDoor) {
        if (inventory[nearLockedDoor.type]) {
            promptText  = 'SPACE — use keycard'
            promptColor = nearLockedDoor.type === 'purpledoor' ? 'violet' : nearLockedDoor.type.replace('door','')
        } else {
            promptText  = `need ${nearLockedDoor.type} keycard`
            promptColor = 'rgba(255,80,80,0.6)'
        }
    }

    const nearTD = nearToggleDoor()
    if (nearTD) { promptText = `Press SPACE to ${nearTD.open?'CLOSE':'OPEN'} ${nearTD.label}`; promptColor = '#ff8c00' }

    if (nearbyWordPuzzle && !nearbyWordPuzzle.solved) {
        promptText = `Press SPACE to open ${nearbyWordPuzzle.theme} puzzle`; promptColor = 'cyan'
    } else if (nearbyWordPuzzle && nearbyWordPuzzle.solved) {
        promptText = `${nearbyWordPuzzle.theme} — SOLVED`; promptColor = 'lime'
    }

    if (nearComboDoor() && !comboDoorUnlocked) { promptText = 'Press SPACE to enter code'; promptColor = 'gold' }

    if (!uiOpen) {
        const ns = nearRulesSign()
        if (ns) { promptText = `Press E to read ${ns.rule.title} rules`; promptColor = ns.rule.titleColor }
    }

    if (nearMasterDoor()) { promptText = 'Insert key into master door'; promptColor = 'gold' }
    if (nearResetPanel()) { promptText = 'Reset color minigame'; promptColor = 'magenta' }

    if (promptText) {
        doorPromptEl.textContent    = promptText
        doorPromptEl.style.borderColor = promptColor
        doorPromptEl.style.display  = 'block'
    } else {
        doorPromptEl.style.display = 'none'
    }

    if (debug) {
        let dbg = document.getElementById('debugBox')
        if (!dbg) {
            dbg = document.createElement('div')
            dbg.id = 'debugBox'
            dbg.style.cssText = 'margin-top:10px;color:lime;font-size:12px;'
            document.getElementById('ui').appendChild(dbg)
        }
        dbg.textContent = `noclip:${noclip} | light:${gameLight} | inZone:${inLightZone()} | puzzles:${finishedpuzzles}/4 | x:${Math.round(x)} y:${Math.round(y)}`
    }

    requestAnimationFrame(move)
}

function startGame() {
    startScreen.classList.add('hidden')
    running   = true
    startTime = Date.now()
    startLightCycle()
    baaar()
    requestAnimationFrame(move)
}

function gameOver() {
    running = false
    endScreen.classList.remove('hidden')
    counter.innerText = '0:00'
}

document.getElementById('startBtn').addEventListener('click', startGame)