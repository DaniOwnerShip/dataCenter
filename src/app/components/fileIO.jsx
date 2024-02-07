import APIReport from "../apis/apiReport";


export default function FileIO({ informeR }) {

    
    const downloadPDF = () => {

        const conf = window.confirm("¿Descargar Informe?");
        if (conf) {

            APIReport.downloadPDF()
                .then(res => {
                    window.alert(`✅ Descarga completada: ${res.fileName} \n última actualización: ${res.lm}`);
                })
                .catch((e) => { window.alert(`❌ ${e.message}`); });

        }
    }; 



    const saveJson = () => {

        APIReport.saveJson(informeR)
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