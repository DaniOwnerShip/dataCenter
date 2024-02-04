import APIReport from "../apis/apiReport";


export default function FileIO({ informeR }) {

    const startDownloadPDF = () => {
        const conf = window.confirm("¿Descargar Informe?");
        if (conf) {
            APIReport.downloadPDF();
        }
    };


    const startSaveJson = () => {
        APIReport.saveJson(informeR);
    };


    return (

        <div className="flex" >
            <button className="button" onClick={startDownloadPDF}>🔽 Descargar PDF</button>
            <button className="button" onClick={startSaveJson}>⏏️ Guardar Informe</button>
        </div>

    );


}