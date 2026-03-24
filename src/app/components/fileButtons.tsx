import FileApi from "../apis/fileApi";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import type { ReportDocument } from "@/types/report";

type Props = {
  setReport?: React.Dispatch<any>;
  report: ReportDocument;
  refToPDF: React.RefObject<HTMLDivElement>;
  setTemplate?: React.Dispatch<React.SetStateAction<{ isTemplate: boolean; type: string }>>;
};

export default function FileButtons({ report, refToPDF, setTemplate }: Props) {
  const fileId = report[0].metaData.fileID;
  const pdfName = fileId.split(".")[0];

  const saveJson = () => {
    let isNew = false;
    if (report[0].metaData.checksum) return window.alert("⚠️ El archivo ya está completado y no puede ser editado");
    if (report[0].metaData.isComplete) isNew = true;

    FileApi.saveJson(report, isNew)
      .then((res) => {
        if (res != false) {
          window.alert(`✅ ${res}`);
          if (setTemplate) setTemplate({ isTemplate: false, type: "" });
          window.location.reload();
        }
      })
      .catch((e) => {
        window.alert(`❌ ${e.message}`);
      });
  };

  const downloadPDF = () => {
    const scaleFactor = 0.6;
    const pageWidthA4 = 595;
    const pageHeightA4 = 842;
    const backgroundColor = "black";
    const margin = 1;
    const mainContainer = refToPDF.current;
    if (!mainContainer) return;
    mainContainer.style.backgroundColor = "black";

    setTimeout(() => {
      domtoimage.toPng(mainContainer).then((blob: string) => {
        const containerWidth = mainContainer.offsetWidth * scaleFactor;
        const containerHeight = mainContainer.offsetHeight * scaleFactor;
        const totalPages = Math.ceil(containerHeight / pageHeightA4);
        const pdf = new jsPDF("p", "pt", [pageWidthA4, pageHeightA4]);
        pdf.setFillColor(backgroundColor);
        pdf.rect(0, 0, pageWidthA4, pageHeightA4, "F");

        for (let i = 0; i < totalPages; i++) {
          const startY = -i * pageHeightA4;
          const cropOptions = {
            width: containerWidth,
            height: Math.min(pageHeightA4, containerHeight - i * pageHeightA4),
            x: 0,
            y: Math.max(i * pageHeightA4, 0),
          };
          (pdf as any).addImage(blob, "PNG", margin, startY + margin, containerWidth - 2 * margin, containerHeight - 2 * margin, null, "NONE", 0, 0, cropOptions);
          if (i < totalPages - 1) {
            pdf.addPage();
            pdf.setFillColor(backgroundColor);
            pdf.rect(0, 0, pageWidthA4, pageHeightA4, "F");
          }
        }

        pdf.save(`${pdfName}.pdf`);
        mainContainer.style.backgroundColor = "#383945";
      });
    }, 500);
  };

  return (
    <div className="filebuttonsBox">
      <button type="button" className="button sidebar" onClick={saveJson}>
        🔼 Guardar Informe
      </button>
      <button type="button" className="button sidebar" onClick={downloadPDF}>
        🔽 Descargar PDF
      </button>
    </div>
  );
}
