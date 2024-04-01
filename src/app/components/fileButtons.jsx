import FileApi from "../apis/fileApi";
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';   


export default function FileButtons({ report, refToPDF, setTemplate }) {

    const fileId = report[0].metaData.fileID;
    const pdfName = fileId.split('.')[0]; 


    const saveJson = () => {

        let isNew = false;
        if (report[0].metaData.checksum) {
            return window.alert('⚠️ El archivo ya está completado y no puede ser editado');
        } else if (report[0].metaData.isComplete) {
            isNew = true;
        }
 

        FileApi.saveJson(report, isNew)
            .then(res => {
                if (res != false) {
                    window.alert(`✅ ${res}`);
                    setTemplate({ isTemplate: false, type: "" });
                    window.location.reload();
                }
            })
            .catch((e) => { window.alert(`❌ ${e.message}`); });
    };



    const downloadPDF = () => {

        const scaleFactor = 0.6;
        const pageWidthA4 = 595;
        const pageHeightA4 = 842;
        const backgroundColor = 'black';
        const margin = 1;
        const mainContainer = refToPDF.current; 
 
        mainContainer.style.backgroundColor = 'black';

        setTimeout(() => {

            if (mainContainer) {

                domtoimage.toPng(mainContainer)
                    .then(function (blob) {
                        const containerWidth = mainContainer.offsetWidth * scaleFactor;
                        const containerHeight = mainContainer.offsetHeight * scaleFactor;
                        const totalPages = Math.ceil(containerHeight / pageHeightA4);
                        const pdf = new jsPDF('p', 'pt', [pageWidthA4, pageHeightA4]);

                        pdf.setFillColor(backgroundColor);
                        pdf.rect(0, 0, pageWidthA4, pageHeightA4, 'F');

                        for (let i = 0; i < totalPages; i++) {
                            const startY = -i * pageHeightA4;

                            const cropOptions = {
                                width: containerWidth,
                                height: Math.min(pageHeightA4, containerHeight - i * pageHeightA4),
                                x: 0,
                                y: Math.max(i * pageHeightA4, 0)
                            };
                            pdf.addImage(blob, 'PNG', margin, startY + margin, containerWidth - 2 * margin, containerHeight - 2 * margin, null, 'NONE', 0, 0, cropOptions);

                            if (i < totalPages - 1) {
                                pdf.addPage();
                                pdf.setFillColor(backgroundColor);
                                pdf.rect(0, 0, pageWidthA4, pageHeightA4, 'F');
                            }
                        }

                        pdf.save(`${pdfName}.pdf`);
 
                        mainContainer.style.backgroundColor = '#383945';
                    });

            }
        }, 500);

    };


    return (

        <div className="filebuttonsBox" >
            <button type="button" className="button sidebar" onClick={saveJson}>🔼 Guardar Informe</button>
            <button type="button" className="button sidebar" onClick={downloadPDF}>🔽 Descargar PDF</button>
        </div>

    );


}











    // const downloadPDFss = () => {
    //     domtoimage.toPng(document.getElementById('mainContainer'))
    //         .then(function (blob) {

    //             // var pdf = new jsPDF('l', 'pt', [$('#mainContainer').width(), $('#mainContainer').height()]);
    //             // pdf.addImage(blob, 'PNG', 0, 0, $('#mainContainer').width(), $('#mainContainer').height());
    //             // var pdf = new jsPDF('p', 'pt', 'A4', true); // 'p' para portrait (vertical), 'a4' para tamaño A4 
    //             var pdf = new jsPDF(); // 'p' para portrait (vertical), 'a4' para tamaño A4 
    //             pdf.addImage(blob, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

    //             pdf.save("test.pdf");

    //             that.options.api.optionsChanged();
    //         });
    // };



    // const downloadPDFsss = () => {

    //     const conf = window.confirm("¿Descargar Informe?");
    //     if (conf) {

    //         FileApi.downloadPDF(fileId)
    //             .then(res => {
    //                 window.alert(`✅ Descarga completada: ${res.fileName} \n última actualización: ${res.lm}`);
    //             })
    //             .catch((e) => { window.alert(`❌ ${e.message}`); });

    //     }
    // };





    // async function  downloadPDF () {

    //     console.log("report.fileID", report[0].handshake.fileID); 

    //     const docID = report[0].handshake.fileID;


    //     try {
    //         const url = `http://localhost:3001/apiHs/testConn?docID=${docID}`;

    //         const res = await fetch(url, {
    //             method: 'GET',
    //             mode: 'cors',
    //             credentials: 'include',
    //             headers: {
    //                 'Accept': 'application/json'
    //             }
    //         });

    //         const resData = await res.json();

    //         if (!res.ok) {
    //             throw new Error(`${resData} \n ${res.status} ${res.statusText}`);
    //         }

    //         return resData;
    //     }

    //     catch (e) {
    //         throw e;
    //     }
    // };  


    /*
    $('#downloadPDF').click(function () {
    
    });
    
    
    */
