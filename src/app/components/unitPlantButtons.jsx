"use client"

import UnitPlantWindow from "./unitPlantWindow";
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import FileApi from "../apis/fileApi";
import SocketAPI from "../apis/socketAPI";


export default function UnitPlantButtons() {

  const router = useRouter();

  const units = [
    'Termosol-dia',
    'Termosol-noche',
    'Termosol-1-dia',
    'Termosol-1-noche',
    'Termosol-2-dia',
    'Termosol-2-noche'];
    
  const [report, setReport] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [activeUnit, setActiveUnit] = useState('');


  const clickOpenWindow = (unit) => {

    const fileName = `informe-${unit}-last.json`

    FileApi.downloadjson(fileName)
      .then(res => {
        setReport(res);
        setIsShow(true);
        setActiveUnit(unit);
      })
      .catch((e) => { window.alert(`❌ ${e.message}`); });

  };




  const clickToUnit = (unit) => {

    if (SocketAPI.socket.isOn) {
      window.alert('necesita desconectar la interfaz');
      return;
    }

    router.push(`/pages/shiftchangedoc/${unit}`);

  }



  return (

    <>

      {units.map((unit, iunit) => (

        <div className="flex" key={`unit-${iunit}`}>

          <button type="button" key={`btnup-${iunit}`}
            className="button sidebar"
            onClick={() => clickToUnit(unit)}>
            {`${unit}`}
            {/* {`Ir a Unidad ${iunit + 1}`} */}
          </button>

          <button type="button" key={`btnuw-${iunit}`}
            className="button sidebar"
            onClick={() => clickOpenWindow(unit)}>
            {`Abrir ${unit}`}
          </button>

        </div>

      ))}


      {report && isShow && <UnitPlantWindow place={activeUnit} report={report} setIsShow={setIsShow} />}


    </>

  )
}