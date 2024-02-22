"use client"

import UnitPlantWindow from "./unitPlantWindow";
import { useRouter } from 'next/navigation'
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';

import FileApi from "../apis/fileApi";


export default function UnitPlantButtons({IreportReq}) {

  const router = useRouter();
  const units = ['unit1', 'unit2'];
  const [report, setReport] = useState(null);
  const [isShow, setIsShow] = useState(false);


  const clickOpenWindow = (unit) => { 
    IreportReq.place = unit; 
    FileApi.downloadJsonObj(IreportReq)
      .then(res => {
        setReport(res);
        setIsShow(true);
      })
      .catch((e) => { window.alert(`❌ ${e.message}`); });  
  };
 

  return (

    <div className="UnitPlantNav" >

      {units.map((unit, iunit) => (

        <div className="flex column" key={`unit-${iunit}`}>

          <button key={`btnup-${iunit}`}
            className="button units"
            onClick={() => router.push(`/pages/shiftChange/plantUnits/${unit}`)}>
            {`Ir a Unidad ${iunit + 1}`}
          </button>

          <button key={`btnuw-${iunit}`}
            className="button units"
            onClick={() => clickOpenWindow(unit)}>
            {`Abrir Unidad ${iunit + 1}`}
          </button>

        </div>

      ))}
 

      {report && isShow && <UnitPlantWindow place={IreportReq.place} report={report} setIsShow={setIsShow} />}  
      

    </div >

  )
}