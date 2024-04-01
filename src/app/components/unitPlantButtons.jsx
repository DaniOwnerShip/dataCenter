"use client"

import UnitPlantWindow from "./unitPlantWindow";
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import FileApi from "../apis/fileApi";
import SocketAPI from "../apis/socketAPI";


export default function UnitPlantButtons({ spot, pickerDate }) {

  const router = useRouter();

  const spots = [
    ['Termosol-0-dia', 'Termosol-0-noche'],
    ['Termosol-1-dia', 'Termosol-1-noche'],
    ['Termosol-2-dia', 'Termosol-2-noche']];

  const [report, setReport] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [activeSpot, setActiveSpot] = useState('');
  const [btnUrlActive, setBtnUrlActive] = useState(spot);
  const [btnWindowActive, setBtnWindowActive] = useState(null);  

  const clickOpenWindow = (_spot) => {
    const fileName = `informe_${_spot}_${pickerDate}.json` 

    FileApi.downloadjson(fileName)
      .then(res => {
        if (res.fileType === 'Plantilla hidratada') {
          return window.alert('❌ no existe el archivo : ' + fileName.split('.')[0]);
        }
        setReport(res.data);
        setIsShow(true);
        setActiveSpot(_spot);
        setBtnWindowActive(_spot);
      })
      .catch((e) => { window.alert(`❌ ${e.message}`); });

  };




  const clickToUnit = (_spot) => {

    if (SocketAPI.socket.isOn) {
      window.alert('necesita desconectar la interfaz');
      return;
    }

    router.push(`/pages/termosolreport/${_spot}`);
    setBtnUrlActive(_spot);

  }



  return (

    <>

      {spots.map((_spot, index) => (

        <div className="button-sidebar-Box" key={`x-${index}`}>

          <p className="noMargin">Termosol {index === 0 ? 'Admin' : index}</p>

           {_spot.map((spotDN, iunit) => (
           
           <div key={`spot-${index}-${iunit}`}>

           <div className="flex" key={`spot-${index}-${iunit}`}>
              <button type="button"  
                className={`button sidebar ${btnUrlActive === spotDN ? 'BSactive' : ''}`}
                onClick={() => clickToUnit(spotDN)}>
                {`${spotDN.split('-')[2]}`} 
              </button>

              <button type="button"  
                className={`button BSWindow ${btnWindowActive === spotDN && isShow ? 'BSactive' : ''}`}
                onClick={() => clickOpenWindow(spotDN)}> 
                {`🔎`}
              </button> 

            </div>

          </div>
          
          ))}
          
        </div>))}


      {report && isShow && <UnitPlantWindow _spot={activeSpot} report={report} setIsShow={setIsShow} />}


    </>

  )
}