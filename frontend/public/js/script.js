// Ambil elemen utama
const form = document.getElementById('formPendaftaran');
const pesan = document.getElementById('pesan');
const btnLoad = document.getElementById('btnLoad');
const jsonList = document.getElementById('jsonList');

// === HANDLE FORM PENDAFTARAN ===
if (form) {
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
}

// === HANDLE LOAD DATA PESERTA ===
if (btnLoad && jsonList) {
  btnLoad.addEventListener('click', async () => {
    try {
      const res = await fetch('/api/peserta');
      const data = await res.json();
      jsonList.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      console.error(err);
      jsonList.textContent = 'Gagal memuat data';
    }
  });
}

// === FORM PENDAFTARAN TIM / INDIVIDU ===
const jenisLomba = document.getElementById('jenisLomba');
    const formIndividu = document.getElementById('formIndividu');
    const formTim = document.getElementById('formTim');

    jenisLomba.addEventListener('change', () => {
      const value = jenisLomba.value;
      formIndividu.classList.add('hidden');
      formTim.classList.add('hidden');

      if (value === 'individu') {
        formIndividu.classList.remove('hidden');
      } else if (value === 'tim') {
        formTim.classList.remove('hidden');
      }
    });