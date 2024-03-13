"use client"

import React, { useState, useEffect, useRef } from 'react';
import FileApi from "@/apis/fileApi";
import Handshake from "@/components/handshake";
import Area from "@/components/area";
import Loading from "@/components/loading";
import FileBar from "@/components/fileBar";
import DocReserve from '../docReserve';
import UnitPlantButtons from "@/components/unitPlantButtons";
import SocketInterface, { fastReserve, Isocket } from "@/components/socketInterface";

const reserveStates = { disabled: 'disabled', enabled: 'enabled', enablePdf: 'enablePdf' }; //se usa para css..

export default function ShiftChange() {

    const [report, setReport] = useState();
    // const [docState, setDocState] = useState(DocReserve.state);
    const [fileMetadata, setFileMetadata] = useState({ name: "", lastMod: "" }); 
    const refToPDF = useRef(null);
    const [isExpanded, setIsExpanded] = useState(true);
    const [, setIsDocReserved] = useState(false);
    const initFileName = 'informe-main1-last.json'


    // const [fastReserve, setFastReserve] = useState(true);


    const toggleExpandApp = () => {
        setIsExpanded(!isExpanded);
    };

    const newfastReserve = () => {
        console.log('newfastReserve:', Isocket);
        if (!Isocket.isOn) {
            Isocket.fastdocreserve.isReq = true;
            Isocket.fastdocreserve.initFn();  
            console.log('isOn:' );
            return;
        }
        if (Isocket.fastdocreserve.isActive) {
            console.log('isActive:' );
            Isocket.fastdocreserve.endFn();
        } 
    };


    useEffect(() => {

        if (!report) {
            FileApi.downloadjson(initFileName)
                .then(res => {
                    setReport(res.resData);
                    setFileMetadata({
                        name: res.resData[0].handshake.fileID.split('.')[0].replace('-main1', ''),
                        lastMod: res.modDate
                    });
                    console.log('fileMetadata:', fileMetadata);
                    // DocReserve.engage(setDocState);
                })
                .catch((e) => { window.alert(`❌ ${e.message}`); });
        }

    }, [report]);


    return (

        <>
            <h1 className="flex center header"> Cambio de Turno</h1>

            {report ? (

                <div className="app" >

                    <div className="sideBarLeft">
                        <div className="sidebarBox flex column" >
                            <UnitPlantButtons />
                        </div>
                        <SocketInterface fileID={report[0].handshake.fileID} setIsDocReserved={setIsDocReserved} ={}/>
                    </div>


                    <div className="mainContainer" ref={refToPDF}>

                        <div className="fileContent">

                            <div className="flex fileMetadata">
                                <h4 className="noMargin">🏛️Termosol&nbsp;</h4>
                                <h4 className="noMargin paddingL">📑{fileMetadata.name}</h4>
                                <p className="noMargin paddingL">Última edición:&nbsp;&nbsp;</p>
                                <h4 className="noMargin">{fileMetadata.lastMod}</h4>
                                <p className="noMargin paddingL">Completado:&nbsp;&nbsp;</p>
                                <h4 className="noMargin">{report[0].handshake.isComplete ? "sí" : "no"}</h4>
                                <div className="flex rightpos">
                                    {/* {connectionsState.socket ? '⚡' : '📡'} &nbsp; */}
                                    <button type="button" className="button" onClick={newfastReserve}>  {`${ ? '⚡' : '📡'}`}</button>
                                    { ? '🔓' : '🔒'} &nbsp;&nbsp;
                                    <button type="button" className="button" onClick={() => toggleExpandApp()}>  {`${isExpanded ? "➖" : "➕"}`}</button>

                                </div>
                            </div>
                            {isExpanded && <div className={`areas-container ${ ? 'enabled' : 'disabled'}`}>

                                <Handshake hs={report[0].handshake} />




                                {/*fileBody <section className={`areas- ${docState}`}> */}
                                <section className="areas-container">

                                    {report[1].areas.map((area, indexArea) => (
                                        <div key={`area-${indexArea}`} className="area">

                                            <Area place={'main1'} area={area} indexArea={indexArea} isMultimedia={true} />

                                        </div>
                                    ))}

                                </section>

                                <FileBar report={report} setReport={setReport} place={'main1'} refToPDF={refToPDF} />

                            </div>}

                        </div>

                    </div>

                </div>



            ) : (

                <Loading />

            )}


        </ >

    );



}