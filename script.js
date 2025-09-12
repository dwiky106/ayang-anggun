document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navText = navToggle.querySelector('.nav-text');
    const dropdownIcon = navToggle.querySelector('.dropdown-icon');
    
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            navText.textContent = 'Tutup';
            dropdownIcon.textContent = '▲';
        } else {
            navText.textContent = 'Lihat Selengkapnya';
            dropdownIcon.textContent = '▼';
        }
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            navMenu.classList.remove('active');
            navText.textContent = 'Lihat Selengkapnya';
            dropdownIcon.textContent = '▼';
        }
        );
    });

    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navText.textContent = 'Lihat Selengkapnya';
                dropdownIcon.textContent = '▼';
            }
        }
    });

    const skillBoxes = document.querySelectorAll('.skill-box');
    
    skillBoxes.forEach(box => {
        const toggleBtn = box.querySelector('.dropdown-toggle');
        const content = box.querySelector('.dropdown-content');
        toggleBtn.addEventListener('click', function() {
            document.querySelectorAll('.dropdown-content.show').forEach(openContent => {
                if (openContent !== content) {
                    openContent.classList.remove('show');
                    const openToggle = openContent.previousElementSibling;
                    if (openToggle && openToggle.classList.contains('dropdown-toggle')) {
                        openToggle.classList.remove('active');
                    }
                }
            });
            toggleBtn.classList.toggle('active');
            content.classList.toggle('show');
        });
    });

    const experiencesData = {
        1: {
            title: "Magang PT. Agribisnis Jaya ",
            company: "PT. Agribisnis Jaya",
            start: "Januari 2023",
            end: "Juni 2023",
            result: "Membuat laporan analisis pasar dan meningkatkan efisiensi panen sebesar 15%.",
            skills: "Analisis data, Manajemen proyek, Komunikasi",
            fullDesc: "Selama magang, saya bertanggung jawab melakukan analisis data hasil panen menggunakan tools berbasis IoT. Saya juga berpartisipasi aktif dalam tim manajemen proyek untuk mengimplementasikan strategi baru yang berhasil meningkatkan efisiensi panen."
        },
        2: {
            title: "Magang di PT. Petani Modern",
            company: "PT. Petani Modern",
            start: "Juli 2022",
            end: "Desember 2022",
            result: "Mengembangkan sistem irigasi otomatis dan menyusun laporan evaluasi kualitas produk.",
            skills: "Sistem irigasi, Evaluasi kualitas, Riset lapangan",
            fullDesc: "Saya terlibat dalam proyek pengembangan sistem irigasi otomatis di lahan budidaya hidroponik. Selain itu, saya juga melakukan riset dan evaluasi untuk memastikan kualitas produk memenuhi standar pasar."
        },
        3: {
            title: "Magang di CV. Horti Sejahtera",
            company: "CV. Horti Sejahtera",
            start: "Maret 2021",
            end: "Agustus 2021",
            result: "Membantu proses pemasaran produk sayuran organik dan menyusun strategi penjualan.",
            skills: "Pemasaran digital, Analisis tren pasar, Penjualan",
            fullDesc: "Pengalaman ini berfokus pada pemasaran produk hortikultura. Saya belajar banyak tentang strategi pemasaran digital, mengelola media sosial perusahaan, dan menganalisis tren pasar untuk meningkatkan penjualan produk."
        }
    };

    const experienceModal = document.getElementById('experience-modal');
    const closeBtn = experienceModal.querySelector('.close-btn');

    document.querySelectorAll('.btn-detail').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            const data = experiencesData[id];
            
            experienceModal.querySelector('.modal-photo').src = `img/magang-${id}.jpg`;
            experienceModal.querySelector('.modal-title').textContent = data.title;
            experienceModal.querySelector('.modal-company span').textContent = data.company;
            experienceModal.querySelector('.modal-time span').textContent = data.start;
            experienceModal.querySelector('.modal-time-end span').textContent = data.end;
            experienceModal.querySelector('.modal-result span').textContent = data.result;
            experienceModal.querySelector('.modal-skills span').textContent = data.skills;
            experienceModal.querySelector('.modal-full-desc').textContent = data.fullDesc;

            experienceModal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        experienceModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === experienceModal) {
            experienceModal.style.display = 'none';
        }
    });

    const galleryModal = document.getElementById('gallery-modal');
    const galleryGrid = galleryModal.querySelector('.gallery-grid');
    const showGalleryBtn = document.getElementById('show-gallery');
    const galleryCloseBtn = galleryModal.querySelector('.close-btn');
    const imageModal = document.getElementById('image-modal');
    const imageModalPhoto = imageModal.querySelector('.modal-image');
    const imageModalCloseBtn = imageModal.querySelector('.close-btn');

    const galleryPhotos = [
        'img/magang-1.jpg',
        'img/magang-2.jpg',
        'img/magang-3.jpg'
    ];

    showGalleryBtn.addEventListener('click', () => {
        galleryGrid.innerHTML = '';
        
        galleryPhotos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo;
            img.classList.add('gallery-photo');
            galleryGrid.appendChild(img);
        });

        galleryModal.style.display = 'flex';
    });

    galleryCloseBtn.addEventListener('click', () => {
        galleryModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
        }
    });
    
    // Fitur baru untuk menampilkan foto galeri secara besar
    galleryGrid.addEventListener('click', function(e) {
        if (e.target.classList.contains('gallery-photo')) {
            imageModalPhoto.src = e.target.src;
            imageModal.style.display = 'flex';
        }
    });

    imageModalCloseBtn.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

});

document.addEventListener('DOMContentLoaded', function() {
    // --- Bagian yang Diubah untuk Animasi Berulang ---
    
    // Fungsionalitas untuk chart melingkar
    const circularCharts = document.querySelectorAll('.circular-chart');

    function animateChart(chart) {
        const targetPercentage = parseInt(chart.dataset.percentage, 10);
        const circle = chart.querySelector('.circle');
        const percentageText = chart.querySelector('.percentage');
        
        let currentPercentage = 100;
        circle.style.strokeDasharray = `${currentPercentage}, 100`;
        percentageText.textContent = `${currentPercentage}%`;

        const interval = setInterval(() => {
            if (currentPercentage > targetPercentage) {
                currentPercentage--;
                circle.style.strokeDasharray = `${currentPercentage}, 100`;
                percentageText.textContent = `${currentPercentage}%`;
            } else {
                clearInterval(interval);
            }
        }, 20); // Kecepatan animasi, 20ms per langkah
    }

    // Fungsi untuk memulai animasi pada semua chart
    function startAllAnimations() {
        circularCharts.forEach(animateChart);
    }
    
    // Panggil animasi pertama kali
    startAllAnimations();

    // Set interval untuk memulai ulang animasi setiap 2 detik
    setInterval(startAllAnimations, 2000); // 2000ms = 2 detik
    
    // --- Akhir Bagian yang Diubah ---
});
document.addEventListener('DOMContentLoaded', function() {
    // ... (kode JavaScript yang sudah ada) ...

    // Data Sertifikasi (Anda dapat menyesuaikan ini)
    const certificationsData = [
        {
            id: 'cert1',
            thumb: 'img/sertifikat-1-thumb.jpg',
            full: 'img/sertifikat-1-full.jpg',
            tahun: 2022,
            lembaga: 'Dicoding Academy',
            hasil: 'Penyelesaian program "Belajar Machine Learning untuk Pemula".'
        },
        {
            id: 'cert2',
            thumb: 'img/sertifikat-2-thumb.jpg',
            full: 'img/sertifikat-2-full.jpg',
            tahun: 2023,
            lembaga: 'BNSP',
            hasil: 'Sertifikasi Kompetensi Analis Agribisnis.'
        },
        {
            id: 'cert3',
            thumb: 'img/sertifikat-3-thumb.jpg',
            full: 'img/sertifikat-3-full.jpg',
            tahun: 2024,
            lembaga: 'Coursera',
            hasil: 'Sertifikasi "Agribusiness Management" dari University of Illinois.'
        },
        {
            id: 'cert3',
            thumb: 'img/sertifikat-3-thumb.jpg',
            full: 'img/sertifikat-3-full.jpg',
            tahun: 2024,
            lembaga: 'Coursera',
            hasil: 'Sertifikasi "Agribusiness Management" dari University of Illinois.'
        }
    ];

    const certificationGrid = document.querySelector('.certification-grid');
    const showCertificatesBtn = document.getElementById('show-certificates-btn');
    const certificationModal = document.getElementById('certification-modal');
    const modalCloseBtn = certificationModal.querySelector('.close-btn');
    const certificationDetailContainer = certificationModal.querySelector('.certification-detail-container');

    // Mengisi grid foto kecil di halaman utama
    certificationsData.forEach(cert => {
        const img = document.createElement('img');
        img.src = cert.thumb;
        img.alt = cert.lembaga;
        img.classList.add('certification-img');
        certificationGrid.appendChild(img);
    });

    // Menampilkan modal dengan detail sertifikasi
    showCertificatesBtn.addEventListener('click', () => {
        // Kosongkan container detail sebelum mengisi ulang
        certificationDetailContainer.innerHTML = '';
        
        certificationsData.forEach(cert => {
            const item = document.createElement('div');
            item.classList.add('certification-item');
            item.innerHTML = `
                <img src="${cert.full}" alt="Sertifikat ${cert.lembaga}" class="certification-full-img">
                <div class="certification-description">
                    <p><strong>Tahun Diperoleh:</strong> ${cert.tahun}</p>
                    <p><strong>Lembaga Penyelenggara:</strong> ${cert.lembaga}</p>
                    <p><strong>Hasil Perolehan:</strong> ${cert.hasil}</p>
                </div>
            `;
            certificationDetailContainer.appendChild(item);
        });

        certificationModal.style.display = 'flex';
    });

    // Menutup modal saat tombol silang diklik
    modalCloseBtn.addEventListener('click', () => {
        certificationModal.style.display = 'none';
    });

    // Menutup modal saat area luar modal diklik
    window.addEventListener('click', (e) => {
        if (e.target === certificationModal) {
            certificationModal.style.display = 'none';
        }
    });

    // ... (kode JavaScript lainnya) ...
});


