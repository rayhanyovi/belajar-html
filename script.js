const submitButton = document.getElementById("submitbuku");
const deleteButtonButton = document.getElementById("hapusbuku");

function menambahkanData() {
  const id = new Date().getTime();
  const inputJudul = document.getElementById("judul").value;
  const inputPenulis = document.getElementById("penulis").value;
  const inputTahun = document.getElementById("tahun").value;
  const isComplete = document.getElementById("isComplete").checked;

  const newDataBuku = {
    id: id,
    judul: inputJudul,
    penulis: inputPenulis,
    tahun: inputTahun,
    isComplete: isComplete,
  };

  let dataBuku = [];
  if (localStorage.getItem("dataBuku")) {
    dataBuku = JSON.parse(localStorage.getItem("dataBuku"));
  }

  dataBuku.push(newDataBuku);
  localStorage.setItem("dataBuku", JSON.stringify(dataBuku));

  menampilkanData();
}

function mengambilData() {
  return JSON.parse(localStorage.getItem("dataBuku")) || [];
}

function menampilkanData() {
  const dataBuku = mengambilData();
  const currentBooks = document.getElementById("currentBooks");
  const doneBooks = document.getElementById("doneBooks");

  currentBooks.innerHTML = "";
  doneBooks.innerHTML = "";

  for (let buku of dataBuku) {
    let newCard = document.createElement("div");
    newCard.className = "book-item";
    newCard.innerHTML = "<h2>" + buku.judul + "</h2>";
    newCard.innerHTML += "<h3>" + buku.penulis + "</h3>";
    newCard.innerHTML += "<p>" + buku.tahun + "</p>";

    if (buku.isComplete) {
      newCard.innerHTML +=
        '<button class="status-btn" data-id="' +
        buku.id +
        '">BELUM DIBACA</button>';
    } else {
      newCard.innerHTML +=
        '<button class="status-btn" data-id="' +
        buku.id +
        '">SUDAH DIBACA</button>';
    }

    newCard.innerHTML +=
      '<button class="hapus-btn" data-id="' + buku.id + '">HAPUS BUKU</button>';

    if (buku.isComplete) {
      doneBooks.appendChild(newCard);
    } else {
      currentBooks.appendChild(newCard);
    }
  }

  const deleteButtons = document.querySelectorAll(".hapus-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const bukuId = button.getAttribute("data-id");
      konfirmasiHapusBuku(bukuId);
    });
  });

  const statusButtons = document.querySelectorAll(".status-btn");
  statusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const bukuId = button.getAttribute("data-id");
      ubahStatusBuku(bukuId);
    });
  });
}

function menghapusData(bukuId) {
  let dataBuku = mengambilData();
  dataBuku = dataBuku.filter((buku) => buku.id != bukuId);
  localStorage.setItem("dataBuku", JSON.stringify(dataBuku));
  menampilkanData();
}

function ubahStatusBuku(bukuId) {
  let dataBuku = mengambilData();
  dataBuku = dataBuku.map((buku) => {
    if (buku.id == bukuId) {
      buku.isComplete = !buku.isComplete;
    }
    return buku;
  });
  localStorage.setItem("dataBuku", JSON.stringify(dataBuku));
  menampilkanData();
}

function konfirmasiHapusBuku(bukuId) {
  const konfirmasi = confirm("Apakah Anda yakin ingin menghapus buku ini?");
  if (konfirmasi) {
    menghapusData(bukuId);
  }
}

// Panggil fungsi menampilkanData() saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  menampilkanData();
});

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  menambahkanData();
});

deleteButtonButton.addEventListener("click", function (event) {
  const bukuId = deleteButtonButton.getAttribute("data-id");
  konfirmasiHapusBuku(bukuId);
});
