// page3.js
const dateEl = document.getElementById('date');
const departEl = document.getElementById('depart');
const returnEl = document.getElementById('return');
const okBtn = document.getElementById('okBtn');

okBtn.addEventListener('click', ()=>{
  const date = dateEl.value;
  const depart = departEl.value;
  const ret = returnEl.value;
  if(!date || !depart || !ret){
    alert('Isi semua field ya :)');
    return;
  }
  // optional: cek depart < return
  if(depart >= ret){
    if(!confirm('Jam berangkat lebih besar atau sama dengan jam pulang. Lanjutkan?')) return;
  }
  localStorage.setItem('date', date);
  localStorage.setItem('depart', depart);
  localStorage.setItem('return', ret);
  window.location.href = 'page4.html';
});
