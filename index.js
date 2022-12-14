const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

c.fillStyle = 'black'
c.fillRect(0, 0, canvas.width, canvas.height)


canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 1.8
const friction = 0.9

function addBorders() {
  if (player.position.x < 0) {
    player.position.x = 0
  }
  if (player.position.x + player.width > canvas.width) {
    player.position.x = canvas.width - player.width
  }
  if (player.position.y < 0) {
    player.position.y = 0
  }
  if (player.position.y + player.height > canvas.height) {
    player.position.y = canvas.height - player.height
  }

  if (enemy.position.x < 0) {
    enemy.position.x = 0
  }
  if (enemy.position.x + enemy.width > canvas.width) {
    enemy.position.x = canvas.width - enemy.width
  }
  if (enemy.position.y < 0) {
    enemy.position.y = 0
  }
  if (enemy.position.y + enemy.height > canvas.height) {
    enemy.position.y = canvas.height - enemy.height
  }
}


const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/ww1.png',
  framesMax: 4,
})

const shop = new Sprite({
  position: {
    x: 1025,
    y: 577
  },
  imageSrc: './img/shop.png',
  scale: 2.75,
  framesMax: 6
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
  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 90
  },
  sprites: {
    idle: {
      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/samuraiMack/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/samuraiMack/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/samuraiMack/Attack2.png',
      framesMax: 6
    },
    takeHit: {
      imageSrc: './img/samuraiMack/Take Hit.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/samuraiMack/Death.png',
      framesMax: 6
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
this.jumping = false;

/*const enemy = new Fighter({
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
    x: -50,
    y: 0
  },
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 100
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/kenji/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/kenji/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/kenji/Death.png',
      framesMax: 7
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
})*/

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
    x: -50,
    y: 0
  },
  imageSrc: './img/martialHero/Idle.png',
  framesMax: 10,
  scale: 2.5,
  offset: {
    x: 200,
    y: -15
  },
  sprites: {
    idle: {
      imageSrc: './img/martialHero/Idle.png',
      framesMax: 10
    },
    run: {
      imageSrc: './img/martialHero/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/martialHero/Jump.png',
      framesMax: 3
    },
    fall: {
      imageSrc: './img/martialHero/Fall.png',
      framesMax: 3
    },
    attack1: {
      imageSrc: './img/martialHero/Attack2.png',
      framesMax: 6
    },
    takeHit: {
      imageSrc: './img/martialHero/Take Hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/martialHero/Death.png',
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
  shop.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  // oyuncunun hareketi
  
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

const borders = {
  top: 0,
  bottom: canvas.height - player.height,
  left: 0,
  right: canvas.width - player.width
}
const enemyBorders = {
  top: 0,
  bottom: canvas.height - enemy.height,
  left: 0,
  right: canvas.width - enemy.width
}

//borders so characters stay in frame
function bordersCollision({ player, borders }) {
  if (player.position.y < borders.top) {
    player.position.y = borders.top
  }
  if (object.position.y > borders.bottom) {
    player.position.y = borders.bottom
  }
  if (player.position.x < borders.left) {
    player.position.x = borders.left
  }
  if (player.position.x > borders.right) {
    player.position.x = borders.right
  }
}
function enemyBordersCollision({ enemy, borders }) {
  if (enemy.position.y < borders.top) {
    enemy.position.y = borders.top
  }
  if (enemy.position.y > borders.bottom) {
    enemy.position.y = borders.bottom
  }
  if (enemy.position.x < borders.left) {
    enemy.position.x = borders.left
  }
  if (enemy.position.x > borders.right) {
    enemy.position.x = borders.right
  }
}