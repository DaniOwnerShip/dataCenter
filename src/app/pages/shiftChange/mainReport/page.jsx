"use client"

import React, { useState, useEffect, useRef } from 'react';
import APIReport from "../../../apis/fileApi";
import Handshake from "../../../components/handshake";
import Area from "../../../components/area";
import Loading from "../../../components/loading";
import FileBar from "../../../components/fileBar";
import ShocketInterface from "../../../components/shocketInterface";
import UnitPlantButtons from "../../../components/unitPlantButtons"; 


export default function ShiftChange() {

    const [report, setReport] = useState();
    const refToPDF = useRef(null);
    const IreportReq = {
        file: "informe",
        place: "main1",
        date: "last",
        type: ".json"
    }
 
    useEffect(() => { 

        if (!report) { 
            APIReport.downloadJsonObj(IreportReq)
                .then(res => {  setReport(res);  })
                .catch((e) => { window.alert(`❌ ${e.message}`); });
        } 

    }, [report]);


    return (

        <div className="allUnitsContainer">

            <UnitPlantButtons IreportReq={IreportReq}/>

            {report ? (

                <div className="mainContainer" ref={refToPDF}>

                    <ShocketInterface fileID={report[0].handshake.fileID} />

                    <Handshake hs={report[0].handshake} />

                    <section className="areas-container">

                        {report[1].areas.map((area, indexArea) => (
                            <div key={`area-${indexArea}`} className="area">

                                <Area place={'main1'} area={area} indexArea={indexArea} isMultimedia={true}/>

                            </div>
                        ))}

                    </section>


                    <FileBar report={report} setReport={setReport} place={'main1'} refToPDF={refToPDF} />


                </div>
            ) : (

                <Loading />

            )}


        </div>

    );



}