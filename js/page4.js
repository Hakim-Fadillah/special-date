// page4.js
const summaryEl = document.getElementById('summary');
const statusEl = document.getElementById('status');

const partnerName = localStorage.getItem('partnerName') || '[future]';
const destinations = JSON.parse(localStorage.getItem('destinations')||'[]');
const date = localStorage.getItem('date') || '';
const depart = localStorage.getItem('depart') || '';
const ret = localStorage.getItem('return') || '';

summaryEl.innerHTML = `
  Hai <strong>${partnerName}</strong> <br>
  Rencana: <em>${destinations.join(', ')}</em><br/>
  Tanggal: <strong>${date}</strong>
  <br>Berangkat: <strong>${depart}</strong>
  <br>Pulang: <strong>${ret}</strong>
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
        subject: `💌 ${partnerName} mau jalan bareng kamu!`,
        "Nama Partner": partnerName,
        "Destinasi Pilihan": destinations.join(', '),
        "Tanggal Pergi": date,
        "Jam Berangkat": depart,
        "Jam Pulang": ret
      };      

  fetch(FORMSPREE_ENDPOINT, {
    method:'POST',
    headers:{ 'Accept':'application/json','Content-Type':'application/json' },
    body: JSON.stringify(payload)
  })
  .then(async res=>{
    if(res.ok){
      statusEl.textContent = 'Notifikasi udah ke kirim ke hakim!! ✅';
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
