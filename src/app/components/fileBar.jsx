import FileButtons from "./fileButtons";
import FileCalendar from "./fileCalendar";


export default function FileBar({ report, setReport, place, refToPDF, callbackDatePicker }) {


    return (

        <div className="flex fileTransfer enabled" >

            <FileButtons report={report} setReport={setReport} place={place} refToPDF={refToPDF} />
            <FileCalendar setReport={setReport} place={place} callbackDatePicker={callbackDatePicker} />

        </div>

    );


}

