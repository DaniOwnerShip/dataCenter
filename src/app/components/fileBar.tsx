import FileButtons from "./fileButtons";
import type { ReportDocument } from "@/types/report";

type Props = {
  report: ReportDocument;
  setReport: React.Dispatch<any>;
  spot: string;
  refToPDF: React.RefObject<HTMLDivElement>;
};

export default function FileBar({ report, setReport, spot, refToPDF }: Props) {
  void setReport;
  void spot;
  return (
    <div className="flex fileTransfer enabled">
      <FileButtons report={report} refToPDF={refToPDF} />
    </div>
  );
}
