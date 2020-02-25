const guess = document.querySelector('#guessInput')
const form = document.querySelector('#guess-form')
const output=document.querySelector('.output')
const submitBtn = document.querySelector('#submit')
const messageInfo = document.querySelector('.output')


let maxNumber=10
 minNumber=1
 guessLeft=3;
 rightGuess = 3


submitBtn.addEventListener('click',guessStart);
form.addEventListener('mousedown',restartGame)


function restartGame(e){
  if(e.target.classList.contains('play-again')){
    window.location.reload()
  }
}

function guessStart(e){
  e.preventDefault()
  let guessValue = parseInt(guess.value);
  if( isNaN(guessValue) || guessValue<minNumber || guessValue>maxNumber){
    showMessage('check input','alert alert-danger');
  }else{
    if( guessValue != rightGuess){
      guessLeft = guessLeft-1;
      showMessage(`wrong, ${guessLeft} is left`,'alert alert-warning')
      guess.value=''
      if(guessLeft === 0){
        gameOver();
      }
    }else{
      showMessage('you win,good boy','alert alert-success')
      gameOver();
    }
  }
}

function gameOver(){
  guess.disabled=true;
  submitBtn.value='play again?'
  submitBtn.className='play-again'
}


function showMessage(msg,className){
  clearMessage()
  messageInfo.appendChild(document.createTextNode(msg))
  messageInfo.className=className
  setTimeout(() => {
    clearMessage()
  }, 2000);
}

function clearMessage(){
  if(messageInfo.firstChild){
    messageInfo.textContent=''
    messageInfo.className=''
  }
}