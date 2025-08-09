// page2.js
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const otherText = document.getElementById('otherText');

// daftar destinasi (tambahkan / ubah sesuka kamu)
const DESTS = [
  {id:'bioskop', label:'Nonton Bioskop', img:'images/cinema.jpg'},
  {id:'coffee', label:'Coffee Shop', img:'images/cafe.jpg'},
  {id:'photobox', label:'Photobox / Photobooth', img:'images/foto.jpg'},
  {id:'dinner', label:'Dinner', img:'images/dinner.jpg'},
  {id:'timezone', label:'Main Timezone', img:'images/timezone.jpg'},
  // rekomendasi tambahan
  // {id:'picnic', label:'Picnic di taman', img:'https://source.unsplash.com/400x300/?picnic,park'},
  // {id:'rooftop', label:'Rooftop / Sunset', img:'https://source.unsplash.com/400x300/?rooftop,view'},
  {id:'museum', label:'Museum', img:'images/museum.jpg'},
  {id:'bookstore', label:'Bookstore', img:'images/bookstore.jpg'}
];

function makeChoiceHTML(d){
  return `
    <label class="choice" data-id="${d.id}">
      <img src="${d.img}" alt="${d.label}" />
      <div style="flex:1">
        <strong>${d.label}</strong>
      </div>
      <input type="checkbox" value="${d.id}" />
    </label>
  `;
}
choicesEl.innerHTML = DESTS.map(makeChoiceHTML).join('');

choicesEl.querySelectorAll('.choice').forEach(label=>{
  label.addEventListener('click', (e)=>{
    const cb = label.querySelector('input[type=checkbox]');
    cb.checked = !cb.checked;
  });
});

nextBtn.addEventListener('click', ()=>{
  const selected = Array.from(choicesEl.querySelectorAll('input[type=checkbox]'))
    .filter(i=>i.checked).map(i=>i.value);
  const other = otherText.value.trim();
  if(other) selected.push(other);

  if(selected.length === 0){
    alert('Pilih minimal satu destinasi ya :)');
    return;
  }
  // simpan ke localStorage
  localStorage.setItem('destinations', JSON.stringify(selected));
  window.location.href = 'page3.html';
});
