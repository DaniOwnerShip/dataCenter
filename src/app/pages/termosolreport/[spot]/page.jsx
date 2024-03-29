"use client"

import React, { useState, useEffect, useRef } from 'react';
//import FileApi from "@/apis/fileApi";
import Area from "@/components/area";
import Loading from "@/components/loading";
//import FileBar from "@/components/fileBar";
import FileMetadata from "@/components/fileMetadata";
import SocketInterface from "@/components/socketInterface";
import SocketFastReq from "@/components/socketFastReq";
import Handshake from "@/components/handshake";
import "@/styles/shiftChange.css"
import "@/styles/scrollbar.css"
import "react-resizable/css/styles.css";
import UnitPlantButtons from "@/components/unitPlantButtons";
import FileDatePicker from "@/components/fileDatePicker";
import FileButtons from "@/components/fileButtons";
// import crypto from 'crypto';
 

export default function Spot({ params }) {

  const spot = params.spot;

  const refToPDF = useRef(null);

  const [report, setReport] = useState();
  const [pickerDate, setPickerDate] = useState();
  const [foreceRender, setForeceRender] = useState(false);
  const [template, setTemplate] = useState('Plantilla hidratada');
  const [isDocReserved, setIsDocReserved] = useState(false);
  const [isFastSocket, setIsFastSocket] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);


  const toggleExpandApp = () => {
    setIsExpanded(!isExpanded);
  };


  // let fileNameReq = `informe_${spot}_last.json`;


  //  function datepikerReqReport(_spot) {
  //   console.log('datepikerReqReport' ); 
  // }

  // let unitNTiite = '_' + spot.split('-')[0];
  // unitNTiite = unitNTiite.replace('_','');


  // const callbackDatePicker = (_fileNameReq) => {
  //   getReport(_fileNameReq, true);
  // };

  // const checkChecksum = (report) => {
  //   const reportchecksum = report[0].metaData.checksum;
  //   report[0].metaData.checksum = ""
  //   const hash = crypto.createHash('sha256');
  //   hash.update(JSON.stringify(report));
  //   const checksum = hash.digest('hex');
  //   report[0].metaData.checksum = reportchecksum;
  //   if (report[0].metaData.checksum !== checksum) {
  //     return false;
  //   }
  //   return true;
  // }

  // const getReport = (_fileNameReq, isFromDatePicker = false) => {console.log('_fileNameReq', _fileNameReq);
  //   FileApi.downloadjson(_fileNameReq)
  //     .then(resData => {
  //       if (resData[0].metaData.isComplete) {
  //         if (!checkChecksum(resData)) {
  //           return window.alert('❌ Error de integridad en la firma de seguridad. Es posible que el archivo haya sido alterado después de haberlo completado.');
  //         }
  //       }
  //       setReport(resData);
  //       if (isFromDatePicker) {
  //         window.alert(`✅ Documento descargado: ${_fileNameReq}`);
  //       }
  //     })
  //     .catch((e) => { window.alert(`❌ ${e.message}`); });
  // };


  useEffect(() => {
    console.log('useEffectxx');
    // ISetReport = setReport;
    // if (!report) {
    //   getReport(fileNameReq);
    // }
  }, [report]);

  const callbackSocket = (isDocReserve, isFast) => {
    setIsDocReserved(isDocReserve);
    setIsFastSocket(isFast);
  }
  const clearTemplate = ( ) => {
    console.log('clearTemplate'); 
    report.data[2].areas.forEach(area => {
      area.areaItems.forEach(item => {
        item.state.forEach((_state, index) => { item.state[index] = false;});
        item.comments = ""; 
      });
    });
    setReport(report);
    setForeceRender(!foreceRender);
    setTemplate('Plantilla vacía');
  } 

  return (

    <>

      <div className="sideBarLeft">
        <div className="sidebarBox" >
          <UnitPlantButtons spot={spot} pickerDate={pickerDate}/>
          {/* <FileButtons spot={params.spot}/> setPickerDate*/}
        </div>
          {report && <FileButtons report={report.data} spot={spot} refToPDF={refToPDF} />}
          <FileDatePicker setReport={setReport} spot={spot} setPickerDate={setPickerDate} />
      </div>

      {report ? (<>

        <h1 className="flex center header">{report.data[0].metaData.tittle}</h1>

        {report.fileType === 'Plantilla hidratada' && 
        <div className="flex center header noMargin">
        <h3 ><em>{template}</em></h3> 

        {template === 'Plantilla hidratada' && <button type="button"  title='limpiar' className="button template" onClick={clearTemplate}>🧹</button>}

        </div>
        
        
        }





        {/* <h2 className="flex center header noMargin">{report[0].metaData.DayNight}&nbsp;{report[0].metaData.dayDate}</h2>  */}

        <div className="app" >

          {!isFastSocket ? (
            <SocketInterface report={report.data} callback={callbackSocket} isDocReserved={isDocReserved} />)
            :
            (<div className="socket-interface"><h4><em> &nbsp;reserva rápida&nbsp; </em></h4>
              <div className="lineAnim-background"></div> <div className="lineAnim"></div></div>)
          }


          <div className="mainContainer">

            <div className="fileContent" ref={refToPDF}>


              <div className="flex center rightpos">
                {!report.data[0].metaData.checksum && <>
                  <SocketFastReq docID={report.data[0].metaData.fileID} callback={callbackSocket} />
                  {isDocReserved ? '🔓' : '🔒'}&nbsp;&nbsp;</>
                }


                <button type="button" className="button" onClick={() => toggleExpandApp()}>  {`${isExpanded ? "➖" : "➕"}`}</button>

              </div>


              <FileMetadata reportMetadata={report.data[0].metaData} />



              {isExpanded && <div className={`areas-container ${isDocReserved ? 'enabled' : 'disabled'}`}>


                <Handshake report={report.data} />

                {report.data[0].metaData.checksum &&
                  <p className="noMargin segSing paddingL enabled"><em>Firma de seguridad: </em><strong>{report.data[0].metaData.checksum}</strong></p>
                }
                <section className="areas-container">
                  {report.data[2].areas.map((area, indexArea) => (
                    <div key={`area-${indexArea}`} className="area">
                      <Area report={report.data} spot={spot} _area={area} indexArea={indexArea} windowKey={'w1'} isDocReserved={isDocReserved}/>
                    </div>
                  ))}
                </section>

                {/* <FileBar report={report} setReport={setReport} spot={spot} refToPDF={refToPDF} callbackDatePicker={callbackDatePicker} />
                <FileBar report={report} setReport={setReport} spot={spot} refToPDF={refToPDF} /> */}

              </div>}



            </div>

          </div>

        </div>


      </>) : (

        <Loading />

      )

      }

    </>

  );

}









