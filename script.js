const dino = document.querySelector('.dino')
const background = document.querySelector('.background')

let isJumping = false
let position = 0
let start = false

/* teste para iniciar 
function iniciar(event) {
  if (event.keyCode === 13) {
    document.getElementById('game-over').innerHTML = ''

    start = true

    createCactus()
  }
}
*/

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump()
    }
  }
}

function jump() {
  isJumping = true

  let upInterval = setInterval(() => {
    if (position >= 220) {
      clearInterval(upInterval)

      //Descendo
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval)
          isJumping = false
        } else {
          position -= 20
          dino.style.bottom = position + 'px'
        }
      }, 20)
    } else {
      //Subindo
      position += 20
      dino.style.bottom = position + 'px'
    }
  }, 20)
}

function createCactus() {
  const cactus = document.createElement('div')
  let cactusPosition = 1200
  let randomTime = Math.random() * 6000

  cactus.classList.add('cactus')
  cactus.style.left = 1200 + 'px'
  background.appendChild(cactus)

  let leftInterval = setInterval(() => {
    if (cactusPosition <= -60) {
      clearInterval(leftInterval)
      background.removeChild(cactus)
    } else if (cactusPosition > 0 && cactusPosition < 140 && position < 60) {
      //Game Over
      clearInterval(leftInterval)
      document.getElementById('game-over').innerHTML = 'Game Over'
      background.removeChild(cactus)

      start = false
    } else {
      cactusPosition -= 10
      cactus.style.left = cactusPosition + 'px'
    }
  }, 20)

  setTimeout(createCactus, randomTime)
}

createCactus()

document.addEventListener('keyup', handleKeyUp)
document.addEventListener('keyup', iniciar)
