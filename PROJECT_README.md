🎯 Sistem Manajemen Tugas (Klon Trello)

Sebuah Sistem Manajemen Tugas modern dan responsif yang dibuat dengan React, Redux Toolkit, Tailwind CSS, dan Vite. Aplikasi ini menyediakan papan Kanban lengkap dengan fitur drag-and-drop untuk mengatur tugas secara efisien.

✨ Fitur

📧 Tambah & Edit Tugas: Buat tugas baru dengan judul, deskripsi, prioritas, dan status

🗑️ Hapus Tugas: Hapus tugas dengan dialog konfirmasi

🚀 Drag & Drop: Pindahkan tugas antar kolom dengan mulus menggunakan react-beautiful-dnd

💾 Simpan Otomatis: Semua perubahan otomatis tersimpan di localStorage

🎨 Warna Prioritas: Indikator visual untuk prioritas (Tinggi/Sedang/Rendah)

📱 Desain Responsif: Berfungsi dengan baik di desktop, tablet, dan mobile

⚡ Pembaruan Real-time: Manajemen state dengan Redux Toolkit

🎯 Papan Kanban: Tata letak tiga kolom (To-Do, In Progress, Done)

🛠️ Teknologi yang Digunakan

Frontend: React 19

Manajemen State: Redux Toolkit

Styling: Tailwind CSS

Build Tool: Vite

Package Manager: pnpm

Drag & Drop: react-beautiful-dnd

Ikon: Heroicons

Penyimpanan: localStorage

🚀 Memulai
Prasyarat

Node.js (versi 16 atau lebih tinggi)

pnpm (disarankan) atau npm

Instalasi

Clone repositori:

git clone <repository-url>
cd ReactTailwind/Reduxreact


Install dependency:

pnpm install


Jalankan server development:

pnpm run dev


Buka browser dan masuk ke http://localhost:5173

Script yang Tersedia

pnpm run dev - Jalankan server development dengan hot reload

pnpm run build - Build untuk produksi

pnpm run preview - Preview hasil build produksi

pnpm run lint - Jalankan ESLint

📁 Struktur Proyek
src/
├── components/
│   ├── Dashboard.jsx      # Dashboard utama dengan papan kanban
│   ├── TaskForm.jsx       # Form untuk tambah/edit tugas
│   ├── TaskList.jsx       # Komponen kolom untuk grup tugas
│   └── TaskCard.jsx       # Komponen kartu tugas individual
├── store/
│   ├── store.js           # Konfigurasi Redux store
│   └── tasksSlice.js      # Slice Redux untuk tugas
├── App.jsx                # Komponen utama App dengan Redux Provider
├── main.jsx               # Entry point aplikasi
└── index.css              # Style global dan import Tailwind

🎮 Cara Menggunakan

Tambah Tugas: Isi form di bagian atas dengan detail tugas lalu klik "Add Task"

Edit Tugas: Klik ikon pensil di kartu tugas

Hapus Tugas: Klik ikon tempat sampah lalu konfirmasi

Pindahkan Tugas: Drag kartu tugas ke kolom lain untuk ubah status

Prioritas: Tugas diberi warna berdasarkan prioritas (Merah = Tinggi, Kuning = Sedang, Hijau = Rendah)

📊 Properti Tugas

Judul: Nama tugas (wajib)

Deskripsi: Detail tugas (opsional)

Status: To-Do, In Progress, atau Done

Prioritas: Tinggi, Sedang, atau Rendah

Timestamps: Tanggal pembuatan & pembaruan otomatis

🎨 Fitur Desain

Header Gradasi: Latar belakang gradasi indah untuk header kolom

Efek Hover: Animasi halus saat hover

Shadow Depth: Efek bayangan untuk hierarki visual

Grid Responsif: Menyesuaikan dengan berbagai ukuran layar

Kode Warna: Berdasarkan prioritas tugas

Ikon Emoji: Emoji kontekstual untuk UX lebih baik

💡 Data Contoh

Aplikasi sudah berisi beberapa tugas contoh:

Learn TailwindCSS (To-Do, Prioritas Rendah)

Learn Next.js (To-Do, Prioritas Rendah)

Learn Redux (In Progress, Prioritas Sedang)

Learn React (Done, Prioritas Tinggi)

🔧 Kustomisasi

Mudah dikustomisasi, seperti:

Warna: Ubah class Tailwind di komponen

Properti Tugas: Tambahkan field baru di Redux slice

Kolom: Update pilihan status di TaskForm dan TaskList

Styling: Atur class Tailwind untuk tema berbeda

📱 Dukungan Browser

Chrome (disarankan)

Firefox

Safari

Edge

🤝 Kontribusi

Silakan ajukan issues atau pull request untuk pengembangan aplikasi ini.

📄 Lisensi

Proyek ini open source dengan lisensi MIT.

Dibuat dengan menggunakan React, Redux Toolkit, dan Tailwind CSS