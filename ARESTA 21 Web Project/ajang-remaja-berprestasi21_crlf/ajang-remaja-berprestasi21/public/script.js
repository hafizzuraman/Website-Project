const form = document.getElementById("formPendaftaran");
const pesan = document.getElementById("pesan");
const btnLoad = document.getElementById("btnLoad");
const jsonList = document.getElementById("jsonList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/daftar", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      pesan.textContent = result.message;
      pesan.style.color = "green";
      form.reset();
    } else {
      pesan.textContent = result.error || "Terjadi error.";
      pesan.style.color = "red";
    }
  } catch (error) {
    console.error(error);
    pesan.textContent = "Terjadi kesalahan koneksi.";
    pesan.style.color = "red";
  }
});

btnLoad.addEventListener("click", async () => {
  try {
    const res = await fetch("/api/peserta");
    const data = await res.json();
    jsonList.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    jsonList.textContent = "Gagal memuat data.";
  }
});
