const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

c.fillStyle = 'black'
c.fillRect(0, 0, canvas.width, canvas.height)


canvas.width = 1024 
canvas.height = 576 

const gravity = 1.8
const friction = 0.9

const walls = [
  {
    position: {
      x: 0,
      y: 0
    },
    width: 1024,
    height: 576
  },
  {
    position: {
      x: 0,
      y: 0
    },
    width: 1024,
    height: 576
  }
]

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/bg/train(24).png',
  framesMax: 24,
})


const player = new Fighter({
  position: {
    x: 100,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  color:'red',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/wizard/Idle.png',
  framesMax: 8,
  scale: 2.2,
  offset: {
    x: 215,
    y: 150
  },
  sprites: {
    idle: {
      imageSrc: './img/wizard/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/wizard/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/wizard/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/wizard/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/wizard/Attack2.png',
      framesMax: 8
    },
    takeHit: {
      imageSrc: './img/wizard/Take Hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/wizard/Death.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }

})

const enemy = new Fighter({
  position: {
    x: 900,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: 100,
    y: 0
  },
  imageSrc: './img/heroKnight/Idle.png',
  framesMax: 11,
  scale: 2.3,
  offset: {
    x: 200,
    y: 40
  },
  sprites: {
    idle: {
      imageSrc: './img/heroKnight/Idle.png',
      framesMax: 11
    },
    run: {
      imageSrc: './img/heroKnight/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/heroKnight/Jump.png',
      framesMax: 3
    },
    fall: {
      imageSrc: './img/heroKnight/Fall.png',
      framesMax: 3
    },
    attack1: {
      imageSrc: './img/heroKnight/Attack1.png',
      framesMax: 7
    },
    takeHit: {
      imageSrc: './img/heroKnight/Take Hit.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/heroKnight/Death.png',
      framesMax: 11
    }
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
  }

})

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  L: {
    pressed: false
  },
  J: {
    pressed: false
  }
}

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0
  
  if (player.position.x < 0) {
    player.position.x = 0
  } else if (player.position.x + player.width > canvas.width) {
    player.position.x = canvas.width - player.width
  }

  if (enemy.position.x < 0) {
    enemy.position.x = 0
  } else if (enemy.position.x + enemy.width > canvas.width) {
    enemy.position.x = canvas.width - enemy.width
  }

  if (player.position.y < 0) {
    player.position.y = 0
  } else if (player.position.y + player.height > canvas.height) {
    player.position.y = canvas.height - player.height
  }

  if (enemy.position.y < 0) {
    enemy.position.y = 0
  } else if (enemy.position.y + enemy.height > canvas.height) {
    enemy.position.y = canvas.height - enemy.height
  }
  
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -9
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 9
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  // zıplama
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
    player.jump();
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  // 2.oyuncunun hareketi
  if (keys.J.pressed && enemy.lastKey === 'j') {
    enemy.velocity.x = -9
    enemy.switchSprite('run')
  } else if (keys.L.pressed && enemy.lastKey === 'l') {
    enemy.velocity.x = 9
    enemy.switchSprite('run')
  } else {
    enemy.switchSprite('idle')
  }

  // zıplama
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }


  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

  // ıskalama
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }
  // oyuncu hasar alma
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit()
    enemy.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  // ıskalama
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  // cana bağlı oyunu bitir
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
        player.velocity.y = -20
        break
      case 's':
        player.attack()
        break
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      case 'l':
        keys.L.pressed = true
        enemy.lastKey = 'l'
        break
      case 'j':
        keys.J.pressed = true
        enemy.lastKey = 'j'
        break
      case 'ı':
        enemy.velocity.y = -20
        break
      case 'k':
        enemy.attack()

        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  // düşman
  switch (event.key) {
    case 'l':
      keys.L.pressed = false
      break
    case 'j':
      keys.J.pressed = false
      break
  }
})