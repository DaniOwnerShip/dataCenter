


export default class APIReport {

    // mode: 'cors',
    // credentials:'omit' 'include',serverExpress.use(cors({ origin: 'http://192.168.1.100:3000' }));
    // ,
    //                 credentials: 'include',
    //                 headers: {
    //                     'Accept': 'application/json'
    //                 }
    // ,
    //                 mode: 'cors',  
    //                 credentials: 'same-origin',  
    //                 headers: {
    //                   'Content-Type': 'application/json',   
    //                 },
    static async downloadJson(fileName) {

        try {

            // const url = `http://localhost:3001/apiHs/downloadjson?fileName=${fileName}`;
            // const url = `http://127.0.0.1:3001/apiHs/downloadjson?fileName=${fileName}`;
            const url = `http://192.168.1.100:3001/apiHs/downloadjson?fileName=${fileName}`;

            const res = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const resData = await res.json();

            if (!res.ok) {
                throw new Error(`${resData} \n ${res.status} ${res.statusText}`);
            }

            return resData;
        }

        catch (e) {
            throw e;
        }
    }




    static async saveJson(data) {

        try {

            const dateNow = new Date();
            const dateFormat = dateNow.toLocaleDateString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit' });
            const fileName = `informe-${dateFormat.replace(/\//g, '-')}.json`;

            data[0].handshake.fileID = fileName;

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json", });

            const url = 'http://localhost:3001/apiHs/saveJson';

            const res = await fetch(url, {
                method: 'POST',
                body: blob,
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if (!res.ok) {

                const ct = res.headers.get('Content-Type');

                if (ct && ct.includes('application/json')) {
                    const resData = await res.json();
                    throw new Error(JSON.stringify(resData));
                }

                throw new Error(`${res.status}, ${res.statusText}`);

            }

            const resData = await res.json();
            return resData;

        }
        catch (e) {
            throw e;
        }
    }




    static async downloadPDF() {

        try {

            const url = 'http://localhost:3001/apiHs/download-pdf';

            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/pdf',
                },
            })

            if (!res.ok) {
                throw new Error(`download PDF Error: ${res.status},  ${res.statusText}`);
            }

            const headers = res.headers;
            const cd = headers.get('Content-Disposition');
            const cl = headers.get('content-length');
            const ct = headers.get('content-type');
            const lm = headers.get('last-modified');
            const content = cd ? cd.split(';')[0] : 'undefined';

            if (cl > 10 * (1024 ** 2) || !ct.startsWith('application/pdf') || content != 'attachment') {
                throw new Error(`Error: La respuesta no cumple los requisitos`);
            }

            const fileName = cd.split('filename=')[1].replace(/"/g, '');
            const blob = await res.blob();
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


