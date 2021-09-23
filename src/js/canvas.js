import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
})

c.imageSmoothingEnabled = false;

var pixels = new Uint8ClampedArray(4*1024*1024);
for (let i=0; i<4*1024*1024; i+=4) {
    pixels[i] = i % 256;
    pixels[i+1] = 0;
    pixels[i+2] = (~~(i % 1024)) / 4; ///
    pixels[i+3] = 255;
}
var pixelData = new ImageData(pixels, 1024, 1024);

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  c.putImageData(pixelData, 100, 100);
//  c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

animate()
