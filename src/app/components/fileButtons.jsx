import FileApi from "../apis/fileApi";
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import { useGlobalContext } from '../GlobalContext';


export default function FileButtons({ report, place, refToPDF }) {  

    const { globalDocIsBlock, setGlobalDocIsBlock } = useGlobalContext();
    const fileId = report[0].handshake.fileID;
    const pdfName = fileId.split('.')[0];
    console.log("FileButtons", fileId);

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



    const downloadPDF = () => {

        const scaleFactor = 0.58;
        const pageWidthA4 = 595;
        const pageHeightA4 = 842;
        const backgroundColor = 'black';
        const margin = 7; 
        const mainContainer = refToPDF.current;
        const prevGlobalDoc = globalDocIsBlock;

        setGlobalDocIsBlock('enablePdf');
        mainContainer.style.margin = '1px';

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

                        prevGlobalDoc === 'enabled' ? setGlobalDocIsBlock('enabled') : setGlobalDocIsBlock('disabled');
                        mainContainer.style.margin = '5px auto 5rem auto';
                    });

            }
        }, 500);

    };

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


    const saveJson = () => {

        FileApi.saveJson(report, place)
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