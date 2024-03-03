import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from "react";
import FileApi from "../apis/fileApi";

 


export default function FileCalendar({ setReport, place }) {

  const [startDate, setStartDate] = useState(new Date()); 

  const reportReq = {
    file: "informe",
    place: place,
    date: formatDate(startDate),
    type: ".json"
}

 

  const downloadjson = () => {
 
    const fileName = `informe-${place}-${formatDate(startDate)}.json`;
 
    FileApi.downloadJsonObj(reportReq)
      .then(data => {
        setReport(data);
        window.alert(`✅ Datos descargados al formualario \n\n archivo: ${fileName}`);
      })
      .catch((e) => { window.alert(`❌ ${e.message}`); });   

  };

  return (

    <div className="flex center datepicker">

      <button type="button" className="button" onClick={downloadjson}>
        ▶️ Descargar informe
      </button>

      <DatePicker
        id="calendar"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd-MM-yy"
      />


    </div>

  ); 

 
}
 
 


const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;
};
