import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from "react";
import APIReport from "../apis/apiReport";

 


export default function Calendar({ setReport }) {

  const [startDate, setStartDate] = useState(new Date()); 


  const downloadjson = () => {
 
    const fileName = `informe-${formatDate(startDate)}.json`;
 
    APIReport.downloadJson(fileName)
      .then(data => {
        setReport(data);
        window.alert(`✅ Datos descargados al formualario \n\n archivo: ${fileName}`);
      })
      .catch((e) => { window.alert(`❌ ${e.message}`); });   

  };

  return (

    <div className="flex center datepicker">

      <button className="button" onClick={downloadjson}>
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
