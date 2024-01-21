
export default async function downloadPDF() {
    console.log('try download');

    try {

        const response = await fetch('http://localhost:3001/download-pdf');
        const blob = await response.blob();

        const resFileName = response.headers.get('Content-Disposition');
        const IsMatchName = resFileName && resFileName.match(/filename="(.+?)"/);
        const fileName = IsMatchName ? IsMatchName[1] : 'nameunknow.pdf';

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = fileName;

        window.confirm("¿Descargar Informe?") ? downloadLink.click() : undefined;


    } catch (error) {

        console.error('Error de red:', error);

    }


};

