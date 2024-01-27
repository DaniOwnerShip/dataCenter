

export default class APIReport {


    static async getReportByName(fileName) {

        const res = await fetch(`http://localhost:3001/apiHs/download-json?fileName=${fileName}`);

        if (!res.ok) {
            console.error('`error load file from server:');
            throw new Error(`error load file from server: ${res.status} ${res.statusText}`);
        }
        // console.log(fileName, " loaded");
        const informe = await res.json();
        return informe; 
    }

    // static async getLastReport() {
    //     const res = await fetch(`http://localhost:3001/apiHs/load-json?fileName=lastReport.json`)
    //     const informe = await res.json()
    //     console.log('fetch:');
    //     return informe
    // } 


}


