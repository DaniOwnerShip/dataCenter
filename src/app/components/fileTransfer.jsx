import FileIO from "./fileIO";
import Calendar from "./calendar";


export default function FileTransfer({ report, setReport }) {


    return (

        <div className="flex fileTransfer" >

            <FileIO report={report} />
            <Calendar setReport={setReport} />

        </div>

    );


}

