
export default async function downloadPDF() {
    console.log('try download');
    // const conf = window.confirm("¿Descargar Informe?");
    // if (conf) {

        try {

            // fetch('http://localhost:3001/apiHs/download-pdf', {
            //     method: 'GET',
            //     credentials: 'include', // Incluye las credenciales en la solicitud
            //     headers: { 
            //         'Accept': 'application/pdf', 
            //     },
            // })
            // .then(response => {
            //     const customHeader = response.headers.get('Content-Metadata');
            //     console.log('Content-Metadata', customHeader);
            //     return response.text();
            // })
            // .then(body => {
            //     console.log('Cuerpo de la respuesta:', body);
            // })
            // .catch(error => {
            //     console.error('Error de red:', error);
            // });

            const response = await fetch('http://localhost:3001/apiHs/download-pdf', {
                method: 'GET',
                credentials: 'include', // Incluye las credenciales en la solicitud
                headers: {
                    'Accept': 'application/pdf',
                },
            })

            if (!response.ok) { console.error(`Error en la descarga: ${response.status}`); return; }

            const cd = response.headers.get('Content-Disposition');
            const fileName = cd ? cd.split('filename=')[1].replace(/"/g, '') : 'unknwofile.pdf';

            const blob = await response.blob();  

            const downloadLink = document.createElement('a');
            const url = window.URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            window.URL.revokeObjectURL(url);



            //  const resFileName = response.headers.get('content-disposition');
            // const resFileName = response.headers['content-disposition'];

            // console.log("resFileName" , resFileName);
            // console.log("response" , response.headers.get("filename")); 

            // const IsMatchName = resFileName && resFileName.match(/filename=["']?([^"']+)/);
            // const fileName = IsMatchName ? IsMatchName[1] : 'nameunknow.pdf';




            // const IsMatchName = resFileName && resFileName.match(/filename="(.+?)"/);
            // const fileName = IsMatchName ? IsMatchName[1] : 'nameunknow.pdf';



            // const downloadLink = document.createElement('a');
            // downloadLink.href = URL.createObjectURL(blob);
            // downloadLink.download = fileName;
            // downloadLink.click(); 


        } catch (error) {

            console.error('Error de red:', error);

        }
    // }

};

