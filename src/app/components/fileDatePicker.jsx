"use client"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from "react";
// import FileButtons from "./fileButtons";

import FileApi from "../apis/fileApi";
import crypto from 'crypto';


export default function FileDatePicker({ setReport, spot, setPickerDate }) {
  console.log('FileDatePicker');

  const [pickDate, setPickDate] = useState(new Date());
  const [isStart, setIsStart] = useState(false);

  const pickDateFormated = formatDate(pickDate);
  console.log('pickDateFormated<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', pickDateFormated);
  const fileRequested = `informe_${spot}_${pickDateFormated}.json`;
  // const fileRequested = `informe_${spot}_last.json`; 

  console.log('fileRequested', fileRequested);

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
    console.log('requestFile fileName', fileName);
    getReport(fileName)
  };

  useEffect(() => {
    console.log('useEffect pickDate', pickDateFormated);
    if (!isStart) {
      console.log('isStartisStartisStart');
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

    console.log('_fileNameReq', _fileNameReq);

    FileApi.downloadjson(_fileNameReq)
      .then(res => {
        if (res.data[0].metaData.isComplete) {
          if (!checkChecksum(res.data)) {
            return window.alert('❌ Error de integridad en la firma de seguridad. Es posible que el archivo haya sido alterado después de haberlo completado.');
          }
        }
        if (res.fileType === 'Plantilla hidratada') {
          const lastDate = res.data[0].metaData.lastEdit;
          window.alert('⚠️ El archivo solicitado no existe. Como alternativa, se ha proporcionado una plantilla predefinida, que contiene datos del último documento guardado el día ' + lastDate );
          res.data[0].metaData.dayDate = pickDateFormated;
          res.data[0].metaData.fileID = fileRequested;

        } else {
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

    <div className="datepicker"> 

      <DatePicker
        id="calendar"
        selected={pickDate}
        onChange={(date) => setPickDate(date)}
        dateFormat="dd-MM-yy"
      />

      <button type="button" className="button sidebar" onClick={requestFile}>
        ▶️ Cargar informe
      </button>

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
