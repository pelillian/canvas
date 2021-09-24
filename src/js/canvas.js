import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const SIZE = 1024

var gestureStartScale = 0
var scale = 1
var posX = 0
var posY = 0
var startX
var startY

canvas.width = SIZE
canvas.height = SIZE

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

//addEventListener('resize', () => {
//    scale = 1
//})

window.addEventListener('wheel', (e) => {
  e.preventDefault()

  if (e.ctrlKey) {
    const delta = - e.deltaY / 5
    const nextScale = scale + delta * 0.02
    const ratio = 1 - nextScale / scale
    console.log(posX, e.clientX)
    console.log(posY, e.clientY)
    posX += (e.clientX - posX) * ratio
    posY += (e.clientY - posY) * ratio
    scale = nextScale
  } else {
    posX -= e.deltaX * 2
    posY -= e.deltaY * 2
  }

//  animate()
}, { passive: false })

window.addEventListener("gesturestart", function (e) {
  e.preventDefault()
  startX = e.pageX - posX
  startY = e.pageY - posY
  gestureStartScale = scale
})

window.addEventListener("gesturechange", function (e) {
  e.preventDefault()

  scale = gestureStartScale * e.scale

  posX = e.pageX - startX
  posY = e.pageY - startY

//  animate()
})

window.addEventListener("gestureend", function (e) {
  e.preventDefault()
})

c.imageSmoothingEnabled = false

var pixels = new Uint8ClampedArray(4*SIZE*SIZE)
for (let i=0; i<4*SIZE*SIZE; i+=4) {
    pixels[i] = i % 256
    if (2*SIZE*SIZE < i && i < 3*SIZE*SIZE) {
        pixels[i+1] = 255
    } else {
        pixels[i+1] = 0
    }

    pixels[i+2] = (~~(i % SIZE)) / 4 ///
    pixels[i+3] = 255
}
var pixelData = new ImageData(pixels, SIZE, SIZE)

var node = document.querySelector('.canvas')

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  c.putImageData(pixelData, 0, 0)

  window.requestAnimationFrame(() => {
    var val = `translate3D(${posX}px, ${posY}px, 0px) scale(${scale})`
    node.style.transform = val
  })
}

animate()
