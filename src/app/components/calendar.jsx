import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 

import React, { useState } from "react";
import APIReport from "../apis/apiReport";


 
const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2); 
  return `${day}-${month}-${year}`;
};



export default function Calendar(  {setInformeR}  ) {
  
  console.log("Calendar" ); 

  const [startDate, setStartDate] = useState(new Date());

  const handleClick = () => {
    const fileName = `informe${formatDate(startDate)}.json`;
    console.log("formatDate", fileName); 
    APIReport.getReportByName(fileName)
      .then(data => {
        console.log("data", data);
        setInformeR(data);
      });
  };


  return (
    <div className="flex">
      <DatePicker
        id="calendar" 
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd-MM-yy"
      />
      <input type="button" value="Descargar informe" className="button" onClick={handleClick} />
      {/* <div className="blockItem-calendar-button">
        zz asasas
      </div> */}
    </div>

  );




  // const [startDate, setStartDate] = useState(new Date());
  // console.log("startDate", startDate);
  // return (
  //   <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  // );



}

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// const Example = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   return (
//     <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
//   );
// };


// Uso básico
{/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> */ }
