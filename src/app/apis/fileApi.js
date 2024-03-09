import  {Isocket} from '../components/shocketInterface'


export default class FileApi { 

    static async downloadjson(fileName) {

        try { 

            const url = `http://192.168.1.100:3001/apiHs/downloadjson?fileName=${fileName}`;

            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

            const res = await fetch(url, options);  
            const resData = await res.json();

            if (!res.ok) {
                throw new Error(`${resData} \n ${res.status} ${res.statusText}`);
            }    
 
            const modDate = res.headers.get('last-modified'); 
            console.log('lm:', modDate); 

            return {resData, modDate};

        }
        catch (e) {
            throw e;
        }
    }




    static async saveJson(report, place) { 
        
        try {

            const dateNow = new Date();
            const dateFormat = dateNow.toLocaleDateString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit' });
            const fileName = `informe-${place}-${dateFormat.replace(/\//g, '-')}.json`; 
            report[0].handshake.fileID = fileName;

            const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json", });

            // const url = 'http://localhost:3001/apiHs/saveJson';
            const url = 'http://192.168.1.100:3001/apiHs/saveJson'; 

            const options = {
                method: 'POST',
                body: blob,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await fetch(url, options)

            if (!res.ok) {

                const ct = res.headers.get('Content-Type');

                if (ct && ct.includes('application/json')) {
                    const resData = await res.json();
                    throw new Error(JSON.stringify(resData));
                }

                throw new Error(`${res.status}, ${res.statusText}`);

            }

            const resData = await res.json();

            // isSaveJson.upload = true;
            Isocket.broadcastFn();

            return resData;

        }
        catch (e) {
            throw e;
        }
    }




    static async downloadPDF( fileId ) {

        console.log("downloadPDF", fileId); 

        return;
        try {
 
            const url = `http://localhost:3001/apiHs/download-pdf?fileId=${fileId}`;

            const options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/pdf',
                }
            }

            const res = await fetch(url, options)

            if (!res.ok) {
                throw new Error(`download PDF Error: ${res.status},  ${res.statusText}`);
            } else {
 
                const h = res.headers; 
                const cd = h.get('Content-Disposition'); 
                const cl = h.get('content-length');
                const ct = h.get('content-type');
                const lm = h.get('last-modified');
                const content = cd ? cd.split(';')[0] : 'undefined'; 

                if (cl > 10 * (1024 ** 2) || !ct.startsWith('application/pdf') || content != 'attachment') {
                    throw new Error(`Error: La respuesta no cumple los requisitos`);
                }

                const blob = await res.blob();
                const fileName = cd.split('filename=')[1].replace(/"/g, '');
                const downloadLink = document.createElement('a');
                const Wurl = window.URL.createObjectURL(blob);

                downloadLink.href = Wurl;
                downloadLink.download = fileName;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                window.URL.revokeObjectURL(Wurl);

                return { fileName, lm };
            }
        }

        catch (e) {
            throw e;
        }
    }





    static async uploadImage(formData) {

        try {
            const response = await fetch('http://localhost:3001/apiHs/upload-img', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}, ${response.statusText}`);
            }

            const responseData = await response.json();
            return responseData;

        }

        catch (e) {
            throw e;
        }
    }




    static async uploadVideo(formData) {

        try {
            const response = await fetch('http://localhost:3001/apiHs/uploadvideo', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}, ${response.statusText}`);
            }

            const responseData = await response.json();
            return responseData;
        }

        catch (e) {
            throw e;
        }
    }







    static async deleteFile(urlFile) {

        console.log("deleteFile", urlFile);

        try {

            const url = `http://localhost:3001/apiHs/delete-file?urlFile=${urlFile}`;

            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`delete-image Error: ${res.status}, ${res.statusText}`);
            }

            const data = await res.json();
            return data;
        }

        catch (e) {
            throw e;
        }
    }










}


