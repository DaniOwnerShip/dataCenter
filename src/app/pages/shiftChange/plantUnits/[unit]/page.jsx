"use client"

import React, { useState, useEffect, useRef } from 'react'; 
import FileApi from "@/apis/fileApi";
import Area from "@/components/area";
import Loading from "@/components/loading";
import FileBar from "@/components/fileBar";
import FileMetadata from "@/components/fileMetadata";
import SocketInterface from "@/components/socketInterface";
import SocketFastReq from "@/components/socketFastReq";
import Handshake from "@/components/handshake";
import "@/styles/shiftChange.css"
import "@/styles/scrollbar.css" 
import "react-resizable/css/styles.css";


 
export default function PlantUnit({ params }) {

  const unit = params.unit; 
  const refToPDF = useRef(null);
  const reportMetadata = useRef();

  const [report, setReport] = useState();
  const [isDocReserved, setIsDocReserved] = useState(false); 
  const [isFastSocket, setIsFastSocket] = useState(false); 
  const [isExpanded, setIsExpanded] = useState(true); 

  const toggleExpandApp = () => {
    setIsExpanded(!isExpanded);
  };


  let fileNameReq = `informe-${unit}-last.json`; 
 

  const callbackDatePicker = (_fileNameReq) => { 
    getReport(_fileNameReq, true);
  };  
  
 
  const getReport = (_fileNameReq, isFromDatePicker = false) => {
    console.log('getReport');
    FileApi.downloadjson(_fileNameReq)
      .then(res => {
        setReport(res.resData); 
        reportMetadata.current = {...res.resData[0].metaData, lastEdit: res.modDate};
        // reportMetadata.current = res.resData[0].metaData;
        // reportMetadata.current.lastEdit = res.modDate; 
        if (isFromDatePicker) {
          window.alert(`✅ Documento descargado: ${_fileNameReq}`);
        }
      })
      .catch((e) => { window.alert(`❌ ${e.message}`); });
  };


  useEffect(() => { 
    console.log('useEffect UNIT isDocReserved:', isDocReserved);
    if (!report) {
      getReport(fileNameReq);
      console.log('useEffectxx');
    }    
  }, [report]);

  const callbackSocket = (isDocReserve, isFast) => {
    setIsDocReserved(isDocReserve);
    setIsFastSocket(isFast);
    console.log('callbackFastSocket');
  }


  return (

    <>

      {report ? (

        <div className="app" >

          {!isFastSocket ? (
            <SocketInterface fileID={report[0].metaData.fileID} callbackSocket={callbackSocket} isDocReserved={isDocReserved} />) :
            (<div className="socket-interface"><p><em><strong>Fast Reserve</strong></em></p>
              <div className="lineAnim-background"></div>
              <div className="lineAnim"></div>
            </div>)
          }


          <div className="mainContainer">

            <div className="fileContent" ref={refToPDF}>


              <div className="flex center rightpos">
                <SocketFastReq callbackSocket={callbackSocket} isDocReserved={isDocReserved} />
                {isDocReserved ? '🔓' : '🔒'}&nbsp;&nbsp;
                <button type="button" className="button" onClick={() => toggleExpandApp()}>  {`${isExpanded ? "➖" : "➕"}`}</button>
              </div>


              <FileMetadata reportMetadata={reportMetadata.current} unit={unit} />



              {isExpanded && <div className={`areas-container ${isDocReserved ? 'enabled' : 'disabled'}`}>

                {unit === 'main1' &&
                  <Handshake hs={report[1].handshake} />
                }

                <section className="areas-container">
                  {report[2].areas.map((area, indexArea) => (
                    <div key={`area-${indexArea}`} className="area">
                      <Area report={report} unit={unit} area={area} indexArea={indexArea} windowKey={'w1'} />
                    </div>
                  ))}
                </section>

                <FileBar report={report} setReport={setReport} place={unit} refToPDF={refToPDF} callbackDatePicker={callbackDatePicker} />

              </div>}



            </div>

          </div>

        </div>


      ) : (

        <Loading />

      ) 

      } 

    </>

  );

}









