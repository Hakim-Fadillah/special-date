// page4.js
const summaryEl = document.getElementById('summary');
const statusEl = document.getElementById('status');

const partnerName = localStorage.getItem('partnerName') || '[nama]';
const destinations = JSON.parse(localStorage.getItem('destinations')||'[]');
const date = localStorage.getItem('date') || '';
const depart = localStorage.getItem('depart') || '';
const ret = localStorage.getItem('return') || '';

summaryEl.innerHTML = `
  Hai <strong>${partnerName}</strong> — rencana: <em>${destinations.join(', ')}</em><br/>
  Tanggal: <strong>${date}</strong>, Berangkat: <strong>${depart}</strong>, Pulang: <strong>${ret}</strong>
`;

/*
  === KIRIM EMAIL (Formspree) ===
  - Rekomendasi: pakai Formspree untuk situs statis (atur penerima di dashboard Formspree).
  - Ganti FORMSPREE_ENDPOINT dengan endpointmu (contoh: https://formspree.io/f/abcdxyz)
  Docs: https://formspree.io/ & https://help.formspree.io/hc/en-us/articles/360013470814-Submit-forms-with-JavaScript-AJAX
  (lihat instruksi di README di bawah).
*/
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mldlajgy'; // <--- ganti ini

function sendNotification(){
  const payload = {
    partnerName,
    destinations: destinations.join(', '),
    date, depart, ret,
    subject: `Notifikasi: ${partnerName} mau jalan`
  };

  fetch(FORMSPREE_ENDPOINT, {
    method:'POST',
    headers:{ 'Accept':'application/json','Content-Type':'application/json' },
    body: JSON.stringify(payload)
  })
  .then(async res=>{
    if(res.ok){
      statusEl.textContent = 'Notifikasi terkirim ke emailmu. ✅';
    } else {
      const text = await res.text();
      statusEl.textContent = 'Gagal kirim notifikasi. Cek console. ❌';
      console.error('Formspree error', res.status, text);
    }
  })
  .catch(err=>{
    console.error(err);
    statusEl.textContent = 'Error mengirim notifikasi. Cek console. ❌';
  });
}

// panggil
sendNotification();

/* Alternatif: EmailJS (client-side, but membutuhkan account EmailJS).
   docs: https://www.emailjs.com/docs/ (jika mau, aku sertakan contoh) */
