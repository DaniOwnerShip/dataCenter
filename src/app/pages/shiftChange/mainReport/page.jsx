"use client"

import React, { useState, useEffect, useRef } from 'react';
import FileApi from "@/apis/fileApi";
import Handshake from "@/components/handshake";
import Area from "@/components/area";
import Loading from "@/components/loading";
import FileBar from "@/components/fileBar";
import SideBarLeft from "@/components/sideBarLeft";
import DocReserve from '../docReserve';
import ShocketInterface from "@/components/shocketInterface";

export default function ShiftChange() {

    const [report, setReport] = useState();
    const [docState, setDocState] = useState(DocReserve.state);
    const refToPDF = useRef(null);

    const initFileName = 'informe-main1-last.json'

    useEffect(() => {

        if (!report) {
            FileApi.downloadjson(initFileName)
                .then(res => {
                    setReport(res);
                    DocReserve.engage(setDocState);
                })
                .catch((e) => { window.alert(`❌ ${e.message}`); });
        }

    }, [report]);


    return (

        <>

            <h1 className="flex center header"> Cambio de Turno{docState === DocReserve.states.enabled ? '🔓' : '🔒'} </h1>


            {report ? (

                <div className="app" >

                    <SideBarLeft fileID={report[0].handshake.fileID} />

                    <ShocketInterface fileID={report[0].handshake.fileID} />


                    <div className="mainContainer" ref={refToPDF}>

                        <h4>📑 {report[0].handshake.fileID.split('.')[0].replace('-main1', '')}</h4>

                        <Handshake hs={report[0].handshake} />

                        <section className={`areas-container ${docState}`}>

                            {report[1].areas.map((area, indexArea) => (
                                <div key={`area-${indexArea}`} className="area">

                                    <Area place={'main1'} area={area} indexArea={indexArea} isMultimedia={true} />

                                </div>
                            ))}

                        </section>


                        <FileBar report={report} setReport={setReport} place={'main1'} refToPDF={refToPDF} />


                    </div>

                </div>



            ) : (

                <Loading />

            )}


        </ >

    );



}