document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nota-form');
    const produkSelect = document.getElementById('produk');
    const statusPembayaranSelect = document.getElementById('status_pembayaran');
    const dynamicFields = document.getElementById('dynamic-form-fields');
    const pricingFields = document.getElementById('pricing-fields');
    const notaArea = document.getElementById('nota-area');
    const outputDetailArea = document.getElementById('output-detail-area');
    const watermarkStatus = document.getElementById('watermark-status');
    const downloadBtn = document.getElementById('download-btn');
    // Variabel ini tetap "harga_pokok" sesuai ID di HTML
    const hargaPokokInput = document.getElementById('harga_pokok'); 
    const biayaAdminInput = document.getElementById('biaya_admin');
    const totalDisplay = document.getElementById('total_display');

    // KONFIGURASI HARGA TOKEN LISTRIK (Simulasi)
    // Properti di sini namanya tetap 'harga' untuk membedakan dari 'admin'
    const tokenPriceConfig = {
        "20000": { harga: 20500, admin: 1000 },
        "25000": { harga: 25500, admin: 1000 },
        "50000": { harga: 50500, admin: 1000 },
        "100000": { harga: 100500, admin: 1000 },
        "200000": { harga: 200500, admin: 1000 },
        "500000": { harga: 500500, admin: 1000 },
        "1000000": { harga: 1000500, admin: 1000 },
    };

    // Fungsi untuk memformat angka menjadi mata uang Rupiah
    const formatRupiah = (angka) => {
        if (typeof angka !== 'number' || isNaN(angka)) {
            angka = parseFloat(angka) || 0;
        }
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka).replace('IDR', 'Rp');
    };

    // Fungsi untuk menghitung dan menampilkan total secara real-time
    const updateTotalPrice = () => {
        const harga = parseFloat(hargaPokokInput.value) || 0;
        const admin = parseFloat(biayaAdminInput.value) || 0;
        const total = harga + admin;
        totalDisplay.textContent = formatRupiah(total);
    };

    // Event listener untuk menghitung total saat input harga berubah
    hargaPokokInput.addEventListener('input', updateTotalPrice);
    biayaAdminInput.addEventListener('input', updateTotalPrice);

    // Objek untuk menyimpan label dan ID input yang dibutuhkan untuk setiap produk
    const productConfig = {
        // Daftar konfigurasi produk yang sama seperti sebelumnya
        PULSA: [{ label: "Nomor HP Pelanggan", id: "input_no_hp", required: true }, { label: "Nominal Pulsa", id: "input_nominal", required: true }, { label: "Nomor SN/Ref", id: "input_sn", required: true }],
        PAKET_DATA: [{ label: "Nomor HP Pelanggan", id: "input_no_hp", required: true }, { label: "Nama Paket Data", id: "input_nominal", required: true }, { label: "Nomor SN/Ref", id: "input_sn", required: true }],
        TOKEN_LISTRIK: [{ label: "ID Pelanggan", id: "input_id_pelanggan", required: true }, { label: "Pilih Nominal Token", id: "input_nominal_token", type: 'select', options: Object.keys(tokenPriceConfig), required: true }, { label: "Nomor Token (20 Digit)", id: "input_no_token", required: true }],
        TAGIHAN_LISTRIK: [{ label: "ID Pelanggan", id: "input_id_pelanggan", required: true }, { label: "Jumlah Tagihan (Bulan)", id: "input_jml_tagihan", required: true }, { label: "KWH", id: "input_kwh", required: true }],
        BAYAR_BRIVA: [{ label: "Sumber Dana", id: "input_sumber_dana", type: 'fixed', value: "BRI DWIKY FITRIAN PRAYOGA", required: true }, { label: "No. Rek Pengirim", id: "input_rek_pengirim", type: 'fixed', value: "80990100*******", required: true }, { label: "Tujuan No VA", id: "input_no_va", required: true }, { label: "Atas Nama VA", id: "input_atas_nama", required: true }, { label: "Jumlah Tagihan", id: "input_jml_tagihan", required: true }],
        TARIK_TUNAI_QRIS: [{ label: "Nominal Tarik Tunai (Rp)", id: "input_nominal_tunai", type: 'number', required: true }],
        TOP_UP_GOPAY: [{ label: "Nomor E-Wallet/HP", id: "input_no_ewallet", required: true }, { label: "Atas Nama E-Wallet", id: "input_atas_nama", required: true }, { label: "Jumlah Top Up (Rp)", id: "input_jml_topup", type: 'number', required: true }],
        TOP_UP_SHOPEE: [{ label: "Nomor E-Wallet/HP", id: "input_no_ewallet", required: true }, { label: "Atas Nama E-Wallet", id: "input_atas_nama", required: true }, { label: "Jumlah Top Up (Rp)", id: "input_jml_topup", type: 'number', required: true }],
        TOP_UP_DANA: [{ label: "Nomor E-Wallet/HP", id: "input_no_ewallet", required: true }, { label: "Atas Nama E-Wallet", id: "input_atas_nama", required: true }, { label: "Jumlah Top Up (Rp)", id: "input_jml_topup", type: 'number', required: true }],
        TOP_UP_LINK_AJA: [{ label: "Nomor E-Wallet/HP", id: "input_no_ewallet", required: true }, { label: "Atas Nama E-Wallet", id: "input_atas_nama", required: true }, { label: "Jumlah Top Up (Rp)", id: "input_jml_topup", type: 'number', required: true }],
    };

    // Fungsi untuk merender input form dinamis (tidak ada perubahan substansial pada logika ini)
    const renderDynamicForm = (productKey) => {
        dynamicFields.innerHTML = ''; 
        
        if (!productKey || !productConfig[productKey]) {
            pricingFields.style.display = 'none';
            return;
        }

        const fields = productConfig[productKey];

        fields.forEach(field => {
            const wrapper = document.createElement('div');
            wrapper.style.gridColumn = 'span 2'; 

            let inputElement;

            if (field.type === 'fixed') {
                inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.id = field.id;
                inputElement.value = field.value;
                inputElement.readOnly = true;
                wrapper.style.gridColumn = 'span 1'; 
            } else if (field.type === 'select') {
                inputElement = document.createElement('select');
                inputElement.id = field.id;
                inputElement.required = field.required;
                
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = '-- Pilih --';
                inputElement.appendChild(defaultOption);

                field.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt;
                    option.textContent = formatRupiah(parseInt(opt));
                    inputElement.appendChild(option);
                });
                wrapper.style.gridColumn = 'span 1'; 

                // KHUSUS TOKEN LISTRIK: Auto-fill harga saat nominal dipilih
                if (productKey === 'TOKEN_LISTRIK') {
                    inputElement.addEventListener('change', (e) => {
                        const nominal = e.target.value;
                        if (nominal && tokenPriceConfig[nominal]) {
                            hargaPokokInput.value = tokenPriceConfig[nominal].harga;
                            biayaAdminInput.value = tokenPriceConfig[nominal].admin;
                        } else {
                            hargaPokokInput.value = 0;
                            biayaAdminInput.value = 0;
                        }
                        updateTotalPrice();
                    });
                }
            } else {
                inputElement = document.createElement('input');
                inputElement.type = field.type || 'text';
                inputElement.id = field.id;
                inputElement.required = field.required;
                if (field.type === 'number') {
                    inputElement.min = 0;
                    wrapper.style.gridColumn = 'span 1';
                } else {
                    wrapper.style.gridColumn = 'span 2';
                }
            }

            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.textContent = field.label + ':';
            
            wrapper.appendChild(label);
            wrapper.appendChild(inputElement);
            dynamicFields.appendChild(wrapper);
        });

        // Tampilkan area harga
        pricingFields.style.display = 'grid';
        pricingFields.style.gridTemplateColumns = '1fr 1fr';
        
        // Reset/Update harga
        const isTokenListrikSelected = productKey === 'TOKEN_LISTRIK';
        const nominalTokenInput = document.getElementById('input_nominal_token');

        if (!isTokenListrikSelected || (isTokenListrikSelected && !nominalTokenInput) || (nominalTokenInput && !nominalTokenInput.value)) {
             hargaPokokInput.value = 0;
             biayaAdminInput.value = 0;
        }
        updateTotalPrice();
    };

    // Event listener saat produk diubah
    produkSelect.addEventListener('change', (e) => {
        renderDynamicForm(e.target.value);
    });
    
    // Fungsi untuk mengupdate watermark status
    const updateStatusWatermark = (status) => {
        watermarkStatus.textContent = status.toUpperCase();
        watermarkStatus.className = 'watermark-dynamic'; // Reset class
        
        if (status === 'Lunas') {
            watermarkStatus.classList.add('status-lunas');
        } else if (status === 'Belum Lunas') {
            watermarkStatus.classList.add('status-belum-lunas');
        } else {
            watermarkStatus.textContent = ''; // Kosongkan jika tidak ada status
        }
    };
    
    // Event listener saat status pembayaran diubah
    statusPembayaranSelect.addEventListener('change', (e) => {
        updateStatusWatermark(e.target.value);
    });


    // 1. Logika Update Nota (Saat Submit)
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const selectedProduct = produkSelect.value;
        const selectedStatus = statusPembayaranSelect.value; 
        
        if (!selectedProduct) {
            alert("Harap pilih produk/layanan terlebih dahulu.");
            return;
        }
        if (!selectedStatus) {
            alert("Harap pilih status pembayaran terlebih dahulu.");
            return;
        }

        // Cek validitas formulir dan ambil data dinamis
        const fields = productConfig[selectedProduct];
        const dynamicData = {};
        let isFormValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            if (input && input.required && !input.value) {
                isFormValid = false;
            }
            
            if (input && input.tagName === 'SELECT' && input.value) {
                dynamicData[field.id] = input.options[input.selectedIndex].textContent; 
            } else if (input) {
                dynamicData[field.id] = input.value;
            } else {
                dynamicData[field.id] = '';
            }
        });
        
        if (!isFormValid) {
             alert("Harap lengkapi semua bidang yang diperlukan.");
             return;
        }

        // Ambil data harga dan cek total
        const harga = parseFloat(hargaPokokInput.value) || 0;
        const biaya_admin = parseFloat(biayaAdminInput.value) || 0;
        const total = harga + biaya_admin;
        
        if (total <= 0) {
            alert("Total Harga harus lebih besar dari Rp 0.");
            return;
        }
        
        // --- PROSES GENERASI NOTA ---
        
        // Update Watermark Status
        updateStatusWatermark(selectedStatus);

        // Tampilkan Tanggal dan Waktu Realtime
        const today = new Date();
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        document.getElementById('nota-tanggal').textContent = today.toLocaleDateString('id-ID', options).replace(',', ' |');

        // Update Konten Nota Dinamis
        outputDetailArea.innerHTML = '';
        
        outputDetailArea.innerHTML += `
            <tr><td>Produk/Layanan</td><td>${selectedProduct.replace(/_/g, ' ')}</td></tr>
        `;

        // Tambahkan detail berdasarkan produk yang dipilih (sama seperti sebelumnya)
        switch (selectedProduct) {
            case 'PULSA':
            case 'PAKET_DATA':
                outputDetailArea.innerHTML += `<tr><td>No. HP Pelanggan</td><td>${dynamicData.input_no_hp}</td></tr><tr><td>Nominal/Paket</td><td>${dynamicData.input_nominal}</td></tr><tr><td>Nomor SN/Ref</td><td>${dynamicData.input_sn}</td></tr>`;
                break;
            case 'TOKEN_LISTRIK':
                outputDetailArea.innerHTML += `<tr><td>ID Pelanggan</td><td>${dynamicData.input_id_pelanggan}</td></tr><tr><td>Nominal Token</td><td>${dynamicData.input_nominal_token}</td></tr><tr><td>Nomor Token</td><td>${dynamicData.input_no_token}</td></tr>`;
                break;
            case 'TAGIHAN_LISTRIK':
                outputDetailArea.innerHTML += `<tr><td>ID Pelanggan</td><td>${dynamicData.input_id_pelanggan}</td></tr><tr><td>Jumlah Tagihan</td><td>${dynamicData.input_jml_tagihan} Bulan</td></tr><tr><td>KWH</td><td>${dynamicData.input_kwh}</td></tr>`;
                break;
            case 'BAYAR_BRIVA':
                outputDetailArea.innerHTML += `<tr><td>Sumber Dana</td><td>${dynamicData.input_sumber_dana}</td></tr><tr><td>No. Rek Pengirim</td><td>${dynamicData.input_rek_pengirim}</td></tr><tr><td>Tujuan No VA</td><td>${dynamicData.input_no_va}</td></tr><tr><td>Atas Nama</td><td>${dynamicData.input_atas_nama}</td></tr><tr><td>Jml Tagihan</td><td>${dynamicData.input_jml_tagihan}</td></tr>`;
                break;
            case 'TARIK_TUNAI_QRIS':
                outputDetailArea.innerHTML += `<tr><td>Nominal Tarik Tunai</td><td>${formatRupiah(parseInt(dynamicData.input_nominal_tunai))}</td></tr>`;
                break;
            case 'TOP_UP_GOPAY':
            case 'TOP_UP_SHOPEE':
            case 'TOP_UP_DANA':
            case 'TOP_UP_LINK_AJA':
                outputDetailArea.innerHTML += `<tr><td>No. E-Wallet/HP</td><td>${dynamicData.input_no_ewallet}</td></tr><tr><td>Atas Nama</td><td>${dynamicData.input_atas_nama}</td></tr><tr><td>Jumlah Top Up</td><td>${formatRupiah(parseInt(dynamicData.input_jml_topup))}</td></tr>`;
                break;
        }

        // Update Biaya
        document.getElementById('output-harga').textContent = formatRupiah(harga);
        document.getElementById('output-biaya_admin').textContent = formatRupiah(biaya_admin);
        document.getElementById('output-total').textContent = formatRupiah(total);

        // Aktifkan tombol download setelah preview
        downloadBtn.disabled = false;
    });

    // 2. Logika Download Gambar (Tidak Berubah)
    downloadBtn.addEventListener('click', function() {
        html2canvas(notaArea, {
            scale: 3, 
            logging: false, 
            allowTaint: true,
            useCORS: true
        }).then(canvas => {
            const imageURL = canvas.toDataURL("image/png");

            const a = document.createElement('a');
            a.href = imageURL;
            a.download = `Nota_AnggunCell_${produkSelect.value}_${Date.now()}.png`; 
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            alert('Gambar nota berhasil diunduh!');
        });
    });
});
