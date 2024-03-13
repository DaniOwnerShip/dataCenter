"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import FileApi from "@/apis/fileApi";
import Area from "@/components/area";
import Loading from "@/components/loading";
import FileBar from "@/components/fileBar";
import SocketInterface from "@/components/socketInterface";

export default function PlantUnit({ params }) {

  const unit = params.unit;
  const [report, setReport] = useState();
  const router = useRouter();
  const refToPDF = useRef(null);


  const fileName = `informe-${unit}-last.json`


  useEffect(() => {

    if (!report) {

      FileApi.downloadjson(fileName)
        .then(res => {
          setReport(res.resData);
        })
        .catch((e) => { window.alert(`❌ ${e.message}`); });
    }

  }, [report]);




  return (

    <>
      {report ? (

        <div className="app" >

          <div className="sideBarLeft">
            <div className="sidebarBox" >
              <button type="button" className="button sidebar" onClick={() => router.push(`/pages/shiftChange/mainReport`)}>
                Ir a Cambio de turno
              </button>
            </div>
            <SocketInterface fileID={report[0].handshake.fileID} />
          </div> 

          <div className="mainContainer unit" ref={refToPDF}>

            {report[0].handshake.fileID.replace(/\.json$/, '')}

            <button type="button" className="button" onClick={() => router.push(`/pages/shiftChange/mainReport`)}>
              Main
            </button>

            <section className="areas-container">

              {report[1].areas.map((area, indexArea) => (
                <div key={`area-${indexArea}`} className="area">

                  <Area place={unit} area={area} indexArea={indexArea} isMultimedia={false} />

                </div>
              ))}

            </section>


            <FileBar report={report} setReport={setReport} place={unit} refToPDF={refToPDF} />

          </div>

        </div>

      ) : (

        <Loading />

      )



      }



    </>

  );

}









