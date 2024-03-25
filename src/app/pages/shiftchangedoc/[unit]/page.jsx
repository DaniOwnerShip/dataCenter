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

import crypto from 'crypto';

export default function PlantUnit({ params }) {

  const unit = params.unit;
  const refToPDF = useRef(null);

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

  const checkChecksum = (report) => { 
    const reportchecksum = report[0].metaData.checksum;  
    report[0].metaData.checksum = "" 
    const hash = crypto.createHash('sha256');
    hash.update(JSON.stringify(report));
    const checksum = hash.digest('hex');    
    report[0].metaData.checksum = reportchecksum;    
    if (report[0].metaData.checksum !== checksum) { 
      return false;
    }
    return true;
  }

  const getReport = (_fileNameReq, isFromDatePicker = false) => { 
    FileApi.downloadjson(_fileNameReq)
      .then(resData => {  
        if (resData[0].metaData.isComplete) { 
          if (!checkChecksum(resData)) {
            return window.alert('❌ Error de integridad en la firma de seguridad. Es posible que el archivo haya sido alterado después de haberlo completado.');
          }
        }  
        setReport(resData);
        if (isFromDatePicker) {
          window.alert(`✅ Documento descargado: ${_fileNameReq}`);
        }
      })
      .catch((e) => { window.alert(`❌ ${e.message}`); });
  };


  useEffect(() => { 
    if (!report) {
      getReport(fileNameReq);
      console.log('useEffectxx');
    }
  }, [report]);

  const callbackSocket = (isDocReserve, isFast) => {
    setIsDocReserved(isDocReserve);
    setIsFastSocket(isFast); 
  }


  return (

    <>

      {report ? (

        <div className="app" >

          {!isFastSocket ? (
            <SocketInterface report={report} callback={callbackSocket} isDocReserved={isDocReserved} />)
            :
            (<div className="socket-interface"><h4><em> &nbsp;reserva rápida&nbsp; </em></h4>
              <div className="lineAnim-background"></div> <div className="lineAnim"></div></div>)
          }


          <div className="mainContainer">

            <div className="fileContent" ref={refToPDF}>


              <div className="flex center rightpos">
                {!report[0].metaData.checksum && <>
                  <SocketFastReq docID={report[0].metaData.fileID} callback={callbackSocket} />
                {isDocReserved ? '🔓' : '🔒'}&nbsp;&nbsp;</>
                }


                <button type="button" className="button" onClick={() => toggleExpandApp()}>  {`${isExpanded ? "➖" : "➕"}`}</button>

              </div>


              <FileMetadata reportMetadata={report[0].metaData} unit={unit} />



              {isExpanded && <div className={`areas-container ${isDocReserved ? 'enabled' : 'disabled'}`}>

                {unit === 'main1' &&
                  <Handshake report={report} />
                }
                {report[0].metaData.checksum &&
                  <p className="noMargin segSing paddingL enabled"><em>Firma de seguridad: </em><strong>{report[0].metaData.checksum}</strong></p>
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









