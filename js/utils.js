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

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId)
  document.querySelector('#displayText').style.display = 'flex'
  if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Berabere <br> <br> <a style="align-items:center;  padding:10px;" href="index.html"><img style="width:2em;" src="img/home.png"></a>'
  } else if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = '<br> <br> <p style="padding-left:1em;">1.Oyuncu Kazandı </p><br> <a style="align-items:center; padding:10px; padding-top:6em; padding-right:4em;" href="index.html"><img style="width:4em;" src="img/home.png"></a>'
  } else if (player.health < enemy.health) {
    document.querySelector('#displayText').innerHTML = '2.Oyuncu Kazandı <br> <br> <a style="align-items:center;  padding:10px;" href="index.html"><img style="width:2em;" src="img/home.png"></a>'
  }
}

let timer = 60
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }
  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
  }
}

let tl = gsap.timeline()

tl.to(".baslik", { y: 600, duration: 2 }, 1);

// insert at the start of the previous animation
tl.to(".purple", { x: 600, duration: 1 }, "<");

// insert 1 second after the end of the timeline (a gap)
tl.to(".orange", { x: 600, duration: 1 }, "+=1");