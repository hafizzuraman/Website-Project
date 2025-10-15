const form = document.getElementById('formPendaftaran');
const pesan = document.getElementById('pesan');
const btnLoad = document.getElementById('btnLoad');
const jsonList = document.getElementById('jsonList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  pesan.textContent = 'Mengirim...';
  pesan.style.color = '#374151';

  const formData = new FormData(form);

  try {
    const res = await fetch('/api/daftar', { method: 'POST', body: formData });
    const data = await res.json();
    if (res.ok) {
      pesan.textContent = data.message || 'Pendaftaran berhasil';
      pesan.style.color = 'green';
      form.reset();
    } else {
      pesan.textContent = data.error || 'Terjadi error';
      pesan.style.color = 'red';
    }
  } catch (err) {
    console.error(err);
    pesan.textContent = 'Gagal koneksi ke server';
    pesan.style.color = 'red';
  }
});

btnLoad.addEventListener('click', async () => {
  try {
    const res = await fetch('/api/peserta');
    const data = await res.json();
    jsonList.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    jsonList.textContent = 'Gagal memuat data';
  }
});
