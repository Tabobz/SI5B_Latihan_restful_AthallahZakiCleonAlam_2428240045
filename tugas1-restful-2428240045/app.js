const express = require("express");
const app = express();
app.use(express.json());

const residentFees = [
  {
    id: 1,
    namaWarga: "Pak Hasan",
    nomorRumah: "B-12",
    bulan: "2026-09",
    nominal: 150000,
    lunas: true
  },
  {
    id: 2,
    namaWarga: "Bu Sari",
    nomorRumah: "A-07",
    bulan: "2026-09",
    nominal: 150000,
    lunas: false
  },
  {
    id: 3,
    namaWarga: "Pak Andi",
    nomorRumah: "C-03",
    bulan: "2026-08",
    nominal: 150000,
    lunas: true
  }
];

let nextId = 4;

app.get("/", (req, res) => {
  res.json({
    nama: "Athallah Zaki Cleon Alam",
    nim: "2428240045",
    kelas: "SI5B",
    topik: 9,
    namaTopik: "Perumahan - Iuran Warga",
    resource: "resident-fees",
    endpoints: [
    ]
  });
});

app.get("/resident-fees", (req, res) => {
  res.json(residentFees);
});

app.get("/resident-fees/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const fee = residentFees.find((item) => item.id === id);

  if (!fee) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  res.json(fee);
});

app.post("/resident-fees", (req, res) => {
  const {
    namaWarga,
    nomorRumah,
    bulan,
    nominal,
    lunas
  } = req.body;

  // Validasi field wajib
  if (!namaWarga) {
    return res.status(400).json({
      status: "error",
      message: "Field namaWarga wajib diisi",
      data: null
    });
  }

  if (!nomorRumah) {
    return res.status(400).json({
      status: "error",
      message: "Field nomorRumah wajib diisi",
      data: null
    });
  }

  if (!bulan) {
    return res.status(400).json({
      status: "error",
      message: "Field bulan wajib diisi",
      data: null
    });
  }

  if (nominal === undefined || nominal === null || nominal === "") {
    return res.status(400).json({
      status: "error",
      message: "Field nominal wajib diisi",
      data: null
    });
  }

  if (typeof lunas !== "boolean") {
    return res.status(400).json({
      status: "error",
      message: "Field lunas harus bernilai boolean",
      data: null
    });
  }

  const baru = {
    id: nextId++,
    namaWarga,
    nomorRumah,
    bulan,
    nominal,
    lunas
  };

    residentFees.push(baru);

    res.status(201).json({
    status: "success",
    message: "Data iuran warga berhasil ditambahkan",
    data: baru
  });
});

app.put("/resident-fees/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = residentFees.findIndex((item) => item.id === id);

  // Validasi ID
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  const {
    namaWarga,
    nomorRumah,
    bulan,
    nominal,
    lunas
  } = req.body;

  // Validasi field wajib
  if (!namaWarga) {
    return res.status(400).json({
      status: "error",
      message: "Field namaWarga wajib diisi",
      data: null
    });
  }

  if (!nomorRumah) {
    return res.status(400).json({
      status: "error",
      message: "Field nomorRumah wajib diisi",
      data: null
    });
  }

  if (!bulan) {
    return res.status(400).json({
      status: "error",
      message: "Field bulan wajib diisi",
      data: null
    });
  }

  if (nominal === undefined || nominal === null || nominal === "") {
    return res.status(400).json({
      status: "error",
      message: "Field nominal wajib diisi",
      data: null
    });
  }

  if (typeof lunas !== "boolean") {
    return res.status(400).json({
      status: "error",
      message: "Field lunas harus bernilai boolean",
      data: null
    });
  }

  const diperbarui = {
    id,
    namaWarga,
    nomorRumah,
    bulan,
    nominal,
    lunas
  };

    residentFees[index] = diperbarui;

    res.status(200).json({
    status: "success",
    message: `Data iuran warga dengan id ${id} berhasil diperbarui`,
    data: diperbarui
  });
});

app.delete("/resident-fees/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = residentFees.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

    residentFees.splice(index, 1);

    res.status(200).json({
    status: "success",
    message: `Data iuran warga dengan id ${id} berhasil dihapus`,
    data: null
  });
});

app.get("/resident-fees", (req, res) => {
  const { bulan } = req.query;

  if (bulan) {
    const hasilFilter = residentFees.filter(
      (item) => item.bulan === bulan
    );

    return res.json(hasilFilter);
  }

  res.json(residentFees);
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null
  });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;