"use client"
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from "react";
// import FileButtons from "./fileButtons";

import FileApi from "../apis/fileApi";
import crypto from 'crypto'; 


export default function FileDatePicker({ setReport, spot, setPickerDate, setTemplate }) {

  const [pickDate, setPickDate] = useState(new Date());
  const [isStart, setIsStart] = useState(false);

  const pickDateFormated = formatDate(pickDate);
  
  const fileRequested = `informe_${spot}_${pickDateFormated}.json`;
  

  const checkChecksum = (_report) => {
    const reportchecksum = _report[0].metaData.checksum; 
    _report[0].metaData.checksum = "";
    const hash = crypto.createHash('sha256');
    hash.update(JSON.stringify(_report));
    const checksum = hash.digest('hex');
    _report[0].metaData.checksum = reportchecksum; 
    if (_report[0].metaData.checksum !== checksum) {
      return false;
    }
    return true;
  }


  const requestFile = () => {
    const fileName = `informe_${spot}_${formatDate(pickDate)}.json`;
    getReport(fileName);
  };

  useEffect(() => {
    if (!isStart) {
      getReport(fileRequested)
    }
    setIsStart(true); // if (!report) {
      
  setPickerDate(pickDateFormated);
    //   getReport(fileNameReq);
    // }
    // FileApi.downloadjson(fileRequested)
    //   .then(res => {
    //     ISetReport(res); 
    //   })
    //   .catch((e) => { window.alert(`❌ ${e.message}`); });

    // callbackDatePicker(fileRequested);
  });

  const getReport = (_fileNameReq) => {

    const docName = _fileNameReq.split('.')[0];

    FileApi.downloadjson(_fileNameReq)
      .then(res => {
        if (res.data[0].metaData.isComplete) {
          if (!checkChecksum(res.data)) {
            return window.alert('❌ Error de integridad en la firma de seguridad. Es posible que el archivo haya sido alterado después de haberlo completado.');
          }
        }
        if (res.fileType === 'Plantilla hidratada') {
          setTemplate({isTemplate: true, type: 'Plantilla hidratada'});
          const lastDate = res.data[0].metaData.lastEdit;
          const dayNight = spot.split('-')[2];
          console.log('dayNightdayNightdayNightdayNight', dayNight);
          res.data[0].metaData.dayDate = pickDateFormated;
          res.data[0].metaData.fileID = fileRequested;
          res.data[0].metaData.DayNight = dayNight; 
          window.alert(`⚠️ El archivo solicitado [ ${docName} ] no existe. Como alternativa, se ha proporcionado una plantilla, con datos del último documento guardado el día ${lastDate}`);
         
 
        } else {
          setTemplate({isTemplate: false, type: ''});
          window.alert(`✅ Documento descargado: ${fileRequested.split('.')[0]}`);
        }
        setReport(res);
        // if (!isStart) {
        //   window.alert(`✅ Documento descargado: ${_fileNameReq}`);
        // }
      })
      .catch((e) => { window.alert(`❌ ${e.message}`); });


  };

  return (

    <div className="flex"> 

      <DatePicker
        id="calendar"
        locale="es" 
        selected={pickDate}
        onChange={(date) => setPickDate(date)}
        dateFormat="dd-MM-yy"
        popperPlacement="top"
      />

      <button type="button" className="button" onClick={requestFile}>▶️</button>

      {/* <FileButtons spot={params.spot}/> */}

    </div>

  );


}




const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;
};
