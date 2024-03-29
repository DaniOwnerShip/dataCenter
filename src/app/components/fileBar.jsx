import FileButtons from "./fileButtons";
// import FileCalendar from "./fileCalendar";


export default function FileBar({ report, setReport, spot, refToPDF }) {


    return (

        <div className="flex fileTransfer enabled" >

            <FileButtons report={report} setReport={setReport} spot={spot} refToPDF={refToPDF} />
            {/* <FileCalendar setReport={setReport} spot={spot} callbackDatePicker={callbackDatePicker} />, callbackDatePicker */}

        </div>

    );


}

