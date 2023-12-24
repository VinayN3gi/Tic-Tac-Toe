
const cell=document.querySelectorAll('.cell');
const message=document.getElementById('message');
const closeBtn=document.querySelector('.close-modal')
const modal=document.querySelector('.modal');
const overlay=document.querySelector('.overlay');
const endMessage=document.querySelector('.end-message');
const newGameModal=document.querySelector('.new-game-modal');

const list=['O','X'];
let activePlayer=0;
let cellList = ['', '', '', '', '', '', '', '', ''];

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
