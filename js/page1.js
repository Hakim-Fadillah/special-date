// page1.js
const partnerSpan = document.getElementById('partnerName');
const mauBtn = document.getElementById('mauBtn');
const tidakBtn = document.getElementById('tidakBtn');
const avatar = document.getElementById('avatar');

let moveCount = 0;
const MAX_MOVES = 5;

// load saved name
const savedName = localStorage.getItem('partnerName');
if(savedName){
  partnerSpan.textContent = savedName;
  avatar.textContent = initials(savedName);
} else {
  partnerSpan.textContent = 'future';
  avatar.textContent = 'AK';
}

// // click name to edit
// partnerSpan.addEventListener('click', ()=>{
//   const v = prompt('Masukkan nama perempuan yang akan kamu ajak:', partnerSpan.textContent==='[future]'?'':partnerSpan.textContent);
//   if(v !== null && v.trim() !== ''){
//     partnerSpan.textContent = v.trim();
//     avatar.textContent = initials(v.trim());
//     localStorage.setItem('partnerName', v.trim());
//   }
// });

function initials(name){
  return name.split(' ').map(s=>s[0]?.toUpperCase()||'').slice(0,2).join('');
}

// behavior for "Tidak"
tidakBtn.style.position = 'relative';
tidakBtn.addEventListener('click', (e)=>{
  moveCount++;
  if(moveCount >= MAX_MOVES){
    alert('please mau dong...');
    return;
  }
  moveButton();
});

function moveButton(){
  const container = document.getElementById('card');
  const rect = container.getBoundingClientRect();
  // get random pos inside card
  const x = Math.random()*(rect.width - 120); // keep space
  const y = Math.random()*(rect.height - 60);
  tidakBtn.style.position = 'absolute';
  tidakBtn.style.left = `${x}px`;
  tidakBtn.style.top = `${y}px`;
  tidakBtn.style.transition = 'left 0.25s, top 0.25s';
}

// "Mau" goes to page2
mauBtn.addEventListener('click', ()=>{
  // ensure name saved
  const name = partnerSpan.textContent;
  if(name && name !== '[nama]') localStorage.setItem('partnerName', name);
  window.location.href = 'page2.html';
});
