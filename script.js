//Defining variables 
const cell=document.querySelectorAll('.cell');
const message=document.getElementById('message');
const closeBtn=document.querySelector('.close-modal')
const modal=document.querySelector('.modal');
const overlay=document.querySelector('.overlay');
const endMessage=document.querySelector('.end-message');
const newGameModal=document.querySelector('.new-game-modal');
const newButton=document.querySelector('.new-game-btn');
const tossButton=document.querySelector('.toss-button');
const tossModal=document.querySelector('.toss-modal');
const activeModal=document.querySelector('.modal-active');
const activeModalClose=document.querySelector('.active-modal-close')
const tossText=document.querySelector('.toss-text');

const list=['O','X'];
let activePlayer=0;
let cellList = ['', '', '', '', '', '', '', '', ''];

function randomGen()
{
    return Math.trunc(Math.random()*2);
}


function toss()
{
  tossModal.style.display='none';
  activeModal.classList.remove('hidden');
  activePlayer=randomGen();
  tossText.textContent=`Player ${list[activePlayer]} will play first`;
  message.textContent=`Player ${list[activePlayer]}'s turn`;
}
//Toss button function 
tossButton.addEventListener('click',toss)


activeModalClose.addEventListener('click',function()
{
  activeModal.classList.add('hidden');
})

//Function to check winners
function checkWinner() {
  // Checking rows
  for (let i = 0; i < 3; i++) {
    const startIndex = i * 3;
    if (cellList[startIndex] !== '' && cellList[startIndex] === cellList[startIndex + 1] && cellList[startIndex + 1] === cellList[startIndex + 2]) {
      return cellList[startIndex];
    }
  }

  // Checking columns
  for (let j = 0; j < 3; j++) {
    if (cellList[j] !== '' && cellList[j] === cellList[j + 3] && cellList[j + 3] === cellList[j + 6]) {
      return cellList[j]; 
    }
  }

  // Checking diagonals
  if (cellList[0] !== '' && cellList[0] === cellList[4] && cellList[4] === cellList[8]) {
    return cellList[0]; 
  }
  if (cellList[2] !== '' && cellList[2] === cellList[4] && cellList[4] === cellList[6]) {
    return cellList[2];
  }

  // Returnin null in case of
  return null;
}


//All cells are filled
function noWin()
{
  if(cellList.includes(''))
  {
    return null; 
  }
  else{
    newGameModal.classList.remove('hidden');
    endMessage.textContent='No winner';
  }
}

//User Clicks 
for(let i=0;i<cell.length;i++)
{
    cell[i].addEventListener('click',function()
    {
        
        if( document.querySelector(`.cell-${i}-img`).classList.contains('hidden'))
        {
            document.querySelector(`.cell-${i}-img`).classList.remove('hidden');
            document.querySelector(`.cell-${i}-img`).src=`${list[activePlayer]}.png`;
            cellList[i]=`${list[activePlayer]}`
            console.log(cellList);
            activePlayer=activePlayer==0 ? 1:0;
            message.textContent=`Player ${list[activePlayer]}'s turn`;
        }
        else{
           modal.classList.remove('hidden');
           overlay.classList.remove('hidden');
        }

        const winner = checkWinner();
        if(winner!==null)
        {
            newGameModal.classList.remove('hidden');
            endMessage.textContent=`Player ${winner==='X' ? 'X' :'O'} wins `
        }
        else{
            console.log('No winner');
        }
        noWin()
    })
}

//Close button function 
closeBtn.addEventListener('click',function()
{
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
})

overlay.addEventListener('click',function()
{
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
})

newButton.addEventListener('click',function()
{
  newGameModal.classList.add('hidden');
  cellList = ['', '', '', '', '', '', '', '', ''];
  for(let i=0;i<cell.length;i++)
  {
    document.querySelector(`.cell-${i}-img`).classList.add('hidden');
  }
  tossModal.style.display='block';
})