document.addEventListener('DOMContentLoaded', () => {
    // COMENTADO PARA V2.0: Selector de modo descartado temporalmente para V1.0
    // const modeSelect = document.getElementById('qr-mode');
    // const vcardFields = document.getElementById('vcard-fields');
    
    const urlFields = document.getElementById('url-fields');
    const generateBtn = document.getElementById('generate-btn');
    const qrResult = document.getElementById('qr-result');
    const qrOutputSection = document.getElementById('qr-output-section');
    
    const downloadImgBtn = document.getElementById('download-img-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');

    /* COMENTADO PARA V2.0: Control de intercambio de modos e inicialización de limpieza
    modeSelect.addEventListener('change', (e) => {
        qrResult.innerHTML = ''; 
        qrOutputSection.classList.add('hidden'); 

        if (e.target.value === 'url') {
            urlFields.classList.remove('hidden');
            vcardFields.classList.add('hidden');
        } else {
            urlFields.classList.add('hidden');
            vcardFields.classList.remove('hidden');
        }
    });
    */

    // Generar el código QR con los datos correspondientes
    generateBtn.addEventListener('click', () => {
        qrResult.innerHTML = ''; // Limpiar el renderizado anterior
        
        // Forzamos que en V1.0 el modo sea estrictamente 'url'
        const mode = 'url'; 
        let data = '';

        if (mode === 'url') {
            data = document.getElementById('url-input').value;
        } 
        /* COMENTADO PARA V2.0: Extracción de datos para formato vCard
        else {
            const name = document.getElementById('vc-name').value;
            const title = document.getElementById('vc-title').value;
            const phone = document.getElementById('vc-phone').value;
            const email = document.getElementById('vc-email').value;

            data = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTITLE:${title}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
        }
        */

        // Validación básica de campos vacíos
        if (!data || data.trim() === "") {
            alert('Por favor, completa los campos necesarios.');
            qrOutputSection.classList.add('hidden');
            return;
        }

        // Generar QR usando la librería qrcode.js
        new QRCode(qrResult, {
            text: data,
            width: 128,
            height: 128
        });

        // Hacer visible la sección inferior con el QR y las opciones de descarga
        qrOutputSection.classList.remove('hidden');
    });

    // Lógica para descargar como Imagen (PNG)
    downloadImgBtn.addEventListener('click', () => {
        const img = qrResult.querySelector('img');
        if (!img) {
            alert('Por favor, genera un código QR primero.');
            return;
        }

        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'quickclicker-qr.png';
        link.click();
    });

    // Lógica para descargar como documento PDF
    downloadPdfBtn.addEventListener('click', () => {
        const img = qrResult.querySelector('img');
        if (!img) {
            alert('Por favor, genera un código QR primero.');
            return;
        }

        // Ajustes para que el PDF renderice únicamente la imagen limpia del código QR
        const opciones = {
            margin:       0.5,
            filename:     'quickclicker-qr.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 3 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Ejecutar la exportación usando html2pdf
        html2pdf().set(opciones).from(img).save();
    });
});