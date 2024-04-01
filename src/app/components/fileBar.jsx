import FileButtons from "./fileButtons"; 


export default function FileBar({ report, setReport, spot, refToPDF }) {


    return (

        <div className="flex fileTransfer enabled" >

            <FileButtons report={report} setReport={setReport} spot={spot} refToPDF={refToPDF} />
           
        </div>

    );


}

