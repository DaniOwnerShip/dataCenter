import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function sspdf() {

    console.log("canvas");

    // const doc = new jsPDF(); 
    // doc.text("Hello world!", 10, 10);
    // doc.save("a4.pdf");


    const pdfInstance = new jsPDF('p', 'mm', 'a4');

    html2canvas(document.querySelector("body"), {
        scale: 1,
        logging: false,
        allowTaint: false, // Necesario para incluir fondos con imágenes externas
        useCORS: false, // Necesario para incluir fondos con imágenes externas
        backgroundColor: null, // Puede ser necesario si tienes fondos de colores o imágenes de fondo
        imageTimeout: 0, // Tiempo de espera para la carga de imágenes en milisegundos  
    }).then(canvas => {
        document.body.appendChild(canvas); 
    });
}

//  pdf.addImage(imageData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');

        // const imageData = canvas.toDataURL('image/png');
        // pdfInstance.addImage(imageData, 'PNG', 0, 0, 210, 297); // A4 size: 210mm × 297mm
        // if (pdfInstance) {
        //     pdfInstance.save('captured-page.pdf');
        // } else {
        //     console.error('PDF not generated yet');
        // }