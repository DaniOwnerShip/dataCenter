import APIReport from "../apis/apiReport";


export default function FileIO({ report }) { 


    async function  downloadPDF () {

        console.log("report.fileID", report[0].handshake.fileID); 

        const docID = report[0].handshake.fileID;


        try {
            const url = `http://localhost:3001/apiHs/testConn?docID=${docID}`;

            const res = await fetch(url, {
                method: 'GET',
                mode: 'cors',
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
    };  
    
    // const downloadPDF = () => {

    //     const conf = window.confirm("¿Descargar Informe?");
    //     if (conf) {

    //         APIReport.downloadPDF()
    //             .then(res => {
    //                 window.alert(`✅ Descarga completada: ${res.fileName} \n última actualización: ${res.lm}`);
    //             })
    //             .catch((e) => { window.alert(`❌ ${e.message}`); });

    //     }
    // };  


    const saveJson = () => {

        APIReport.saveJson(report)
            .then(res => {
                window.alert(`✅ ${res}`);
            })
            .catch((e) => { window.alert(`❌ ${e.message}`); });

    };   


    return (

        <div className="flex" >
            <button className="button" onClick={downloadPDF}>🔽 Descargar PDF</button>
            <button className="button" onClick={saveJson}>⏏️ Guardar Informe</button>
        </div>

    );


}