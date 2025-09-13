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
        });
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

    // Data Pengalaman Magang
    const experiencesData = {
        1: {
            title: "Bekerja di PT Cipta Wira Edukasi",
            company: "PT Cipta Wira Edukasi",
            start: "Oktober 2024",
            end: "Masih Bekerja",
            result: "Saya bertanggung jawab menyusun dan menyampaikan materi pembelajaran siswa sesuai dengan kurikulum di sekolah, serta membantu kesulitan siswa dalam mengerjakan tugas sekolah",
            skills: "kemampuan komunikasi efektif, Kemampuan problem solving, pengorganisasian dan perencanaan",
            fullDesc: "",
            images: [
                'img/magang-cwe-1.jpg',
                'img/magang-cwe-2.jpg',
                'img/magang-cwe-3.jpg'
            ]
        },
        2: {
            title: "Magang di PT Mavens Mitra Perkasa",
            company: "PT Mavens Mitra Perkasa",
            start: "Agustus 2023",
            end: "Oktober 2023",
            result: "Saya bertanggungjawab untuk mengumpulkan data biaya produksi dan pengeluaran rumah tangga petani, peternak, dan pembudidaya ikan serta melakukan entry data yang tepat pada Gsheets untuk Keperluan analisis Nilai Tukar Petani",
            skills: "Analisis data dan statistik, pemahaman konsep ekonomi dan pertanian khususnya pada analisis nilai tukar petani",
            fullDesc: "",
            images: [
                'img/magang-mmp-1.jpg',
                'img/magang-mmp-2.jpg'
            ]
        },
        3: {
            title: "MBKM di PT BISI International Tbk",
            company: "PT BISI International Tbk",
            start: "Februari 2023",
            end: "Juni 2023",
            result: "Saya bertanggung jawab untuk memahami dan melakukan tugas-tugas administratif di departemen RnD hingga Product and Market Development",
            skills: "Alur Produksi Benih, Analisis Data Pertanian, Sertifikasi dan Pengendalian Mutu Benih, Kemampuan Kerjasama Tim, Kemampuan beradaptasi dan Pemecahan Masalah",
            fullDesc: "",
            images: [
                'img/magang-bisi-1.jpg',
                'img/magang-bisi-2.jpg',
                'img/magang-bisi-3.jpg'
            ]
        }
    };

    const experienceModal = document.getElementById('experience-modal');
    const closeBtn = experienceModal.querySelector('.close-btn');
    const swiperWrapper = experienceModal.querySelector('.experience-swiper .swiper-wrapper');
    let mySwiper = null;

    document.querySelectorAll('.btn-detail').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            const data = experiencesData[id];
            
            if (mySwiper) {
                mySwiper.destroy(true, true);
            }
            swiperWrapper.innerHTML = '';
            
            data.images.forEach(imageSrc => {
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');
                swiperSlide.innerHTML = `<img src="${imageSrc}" alt="Gambar Magang" class="modal-photo">`;
                swiperWrapper.appendChild(swiperSlide);
            });

            mySwiper = new Swiper('.experience-swiper', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
            });

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
        if (mySwiper) {
            mySwiper.destroy(true, true);
            mySwiper = null;
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === experienceModal) {
            experienceModal.style.display = 'none';
            if (mySwiper) {
                mySwiper.destroy(true, true);
                mySwiper = null;
            }
        }
    });

    // Data Galeri
    const galleryPhotos = [
        'img/magang-cwe-1.jpg',
        'img/magang-cwe-2.jpg',
        'img/magang-cwe-3.jpg',
        'img/magang-mmp-1.jpg',
        'img/magang-mmp-2.jpg',
        'img/magang-bisi-1.jpg',
        'img/magang-bisi-2.jpg',
        'img/magang-bisi-3.jpg'
    ];

    const galleryModal = document.getElementById('gallery-modal');
    const galleryGrid = galleryModal.querySelector('.gallery-grid');
    const showGalleryBtn = document.getElementById('show-gallery');
    const galleryCloseBtn = galleryModal.querySelector('.close-btn');
    const imageModal = document.getElementById('image-modal');
    const imageModalPhoto = imageModal.querySelector('.modal-image');
    const imageModalCloseBtn = imageModal.querySelector('.close-btn');

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
        }, 20);
    }

    function startAllAnimations() {
        circularCharts.forEach(animateChart);
    }
    
    startAllAnimations();

    setInterval(startAllAnimations, 2000);

    // Data Sertifikasi
    const certificationsData = [
        {
            id: 'cert1',
            thumb: 'img/sertifikat-1-thumb.jpg',
            full: 'img/sertifikat-1-full.jpg',
            tahun: 2025,
            lembaga: 'PT Learnbyte Edukarya Nusantara',
            hasil: 'Penyelesaian program "Microsoft Excel Level Menengah".'
        },
        {
            id: 'cert2',
            thumb: 'img/sertifikat-2-thumb.jpg',
            full: 'img/sertifikat-2-full.jpg',
            tahun: 2025,
            lembaga: 'PT Learnbyte Edukarya Nusantara',
            hasil: 'Penyelesaian program "Microsoft Excel Level Menengah"'
        },
        {
            id: 'cert3',
            thumb: 'img/sertifikat-3-thumb.jpg',
            full: 'img/sertifikat-3-full.jpg',
            tahun: 2023,
            lembaga: 'Educational Testing Service',
            hasil: 'Sertifikasi "TOEFL".'
        },
        {
            id: 'cert4',
            thumb: 'img/sertfikat-4-thumb.jpg',
            full: 'img/sertfikat-4-full.jpg',
            tahun: 2023,
            lembaga: 'Trust Training Partner',
            hasil: 'Sertifikasi "Teknologi dan Informasi".'
        },
        {
            id: 'cert5',
            thumb: 'img/sertifikat-5-thumb.jpg',
            full: 'img/sertifikat-5-full.jpg',
            tahun: 2023,
            lembaga: 'PT BISI International Tbk',
            hasil: 'Sertifikasi "Magang Merdeka Belajar Kampus Merdeka".'
        },
        {
            id: 'cert6',
            thumb: 'img/sertifikat-6-thumb.jpg',
            full: 'img/sertifikat-6-full.jpg',
            tahun: 2023,
            lembaga: 'PT Mavens Mitra Perkasa',
            hasil: 'Sertifikasi "Magang Kerja" Analisis nilai tukar petani.'
        }
        
    ];

    const certificationGrid = document.querySelector('.certification-grid');
    const showCertificatesBtn = document.getElementById('show-certificates-btn');
    const certificationModal = document.getElementById('certification-modal');
    const certModalCloseBtn = certificationModal.querySelector('.close-btn');
    const certificationDetailContainer = certificationModal.querySelector('.certification-detail-container');

    certificationsData.forEach(cert => {
        const img = document.createElement('img');
        img.src = cert.thumb;
        img.alt = cert.lembaga;
        img.classList.add('certification-img');
        certificationGrid.appendChild(img);
    });

    showCertificatesBtn.addEventListener('click', () => {
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

    certModalCloseBtn.addEventListener('click', () => {
        certificationModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === certificationModal) {
            certificationModal.style.display = 'none';
        }
    });
});
