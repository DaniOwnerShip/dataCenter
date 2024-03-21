import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from "react";




export default function FileCalendar({ place, callbackDatePicker }) {

  const [startDate, setStartDate] = useState(new Date());


  const requestFile = () => {
    const fileName = `informe-${place}-${formatDate(startDate)}.json`;
    callbackDatePicker(fileName);

  };

  return (

    <div className="flex center datepicker">

      <button type="button" className="button" onClick={requestFile}>
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
