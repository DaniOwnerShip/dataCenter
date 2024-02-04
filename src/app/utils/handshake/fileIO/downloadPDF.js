
export default async function downloadPDF() { 

    const response = await fetch('http://localhost:3001/apiHs/download-pdf', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/pdf',
        },
    })
    
    if (!response.ok) {
        const e = await response.text();
        window.alert(`❌${e} \n Error: ${response.status} \n ${response.statusText}`);
    }

    const headers = response.headers;
    const cd = headers.get('Content-Disposition');
    const cl = headers.get('content-length');
    const ct = headers.get('content-type');
    const lm = headers.get('last-modified');
    const content = cd ? cd.split(';')[0] : 'undefined';

    if (cl > 10 * (1024 ** 2) || !ct.startsWith('application/pdf') || content != 'attachment') {
        window.alert("La respuesta del servidor no cumple los requisitos. Contacte con el administrador");
        return;
    }

    const fileName = cd.split('filename=')[1].replace(/"/g, ''); 
    const blob = await response.blob();

    const downloadLink = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(url);
    window.alert(`✅ Descarga completada \n ${fileName}  \n última actualización: ${lm}`); 

};

