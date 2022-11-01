//hitboxları ayarladım, karakterimiz rectangle1 olacak düşman da rectangle2

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

//Dövüş sonuçlanırsa sayacı durdur ve sonucu ekrana yansıt
function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId)
  document.querySelector('#displayText').style.display = 'flex'
  if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Berabere'
  } else if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = '1. Oyuncu Kazandı'
  } else if (player.health < enemy.health) {
    document.querySelector('#displayText').innerHTML = '2. Oyuncu Kazandı'
  }
}
//bahsi geçen sayacı kurduğum yer
let timer = 60
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }
//kazananı sayaç ve canlara bakarak belirle
  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
  }
}
