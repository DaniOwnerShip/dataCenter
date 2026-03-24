import type { ReportMetadata } from "@/types/report";

export default function FileMetadata({ reportMetadata }: { reportMetadata: ReportMetadata }) {
  return (
    <div className="flex fileMetadata">
      <h4 className="noMargin">{reportMetadata.place}&nbsp;</h4>
      <h4 className="noMargin paddingL">📑Informe {reportMetadata.dayDate}</h4>
      <p className="noMargin">&nbsp;&nbsp;{`${reportMetadata.DayNight === "dia" ? "Turno de día" : "Turno de noche"}`}</p>
      <p className="noMargin paddingL">Estado:&nbsp;&nbsp;</p>
      <h4 className="noMargin">{reportMetadata.checksum ? "completado📗" : "en edición📖"}</h4>
    </div>
  );
}
