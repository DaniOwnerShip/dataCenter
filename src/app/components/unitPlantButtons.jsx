"use client"

import UnitPlantWindow from "./unitPlantWindow";
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import { Isocket } from "./shocketInterface";
import FileApi from "../apis/fileApi";


export default function UnitPlantButtons() {

  const router = useRouter();
  const units = ['unit1', 'unit2'];
  const [report, setReport] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [activeUnit, setActiveUnit] = useState('');

  
  const clickOpenWindow = (unit) => {

    if (isShow) {
      return setIsShow(false);
    }

    const fileName = `informe-${unit}-last.json`

    FileApi.downloadjson(fileName)
      .then(res => {
        setReport(res.resData);
        setIsShow(true);
        setActiveUnit(unit);
      })
      .catch((e) => { window.alert(`❌ ${e.message}`); });

  };


  const clickToUnit = (unit) => { 

    if (Isocket.isOn) {
      window.alert('necesita desconectar la interfaz');
      return;
    }

    router.push(`/pages/shiftChange/plantUnits/${unit}`);

  }



  return (

    <>

      {units.map((unit, iunit) => (

        <div className="flex" key={`unit-${iunit}`}>

          <button type="button" key={`btnup-${iunit}`}
            className="button sidebar"
            onClick={() => clickToUnit(unit)}>
            {`Ir a Unidad ${iunit + 1}`}
          </button>

          <button type="button" key={`btnuw-${iunit}`}
            className="button sidebar"
            onClick={() => clickOpenWindow(unit)}>
            {`Abrir Unidad ${iunit + 1}`}
          </button>

        </div>

      ))}


      {report && isShow && <UnitPlantWindow place={activeUnit} report={report} setIsShow={setIsShow} />}


    </>

  )
}