import FileButtons from "./fileButtons";
import FileCalendar from "./fileCalendar";


export default function FileBar({ report, setReport, place, refToPDF }) {


    return (

        <div className="flex fileTransfer" >

            <FileButtons report={report} place={place} refToPDF={refToPDF} />
            <FileCalendar setReport={setReport} place={place} />

        </div>

    );


}

