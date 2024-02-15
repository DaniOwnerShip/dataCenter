"use client"

import React, { useState, useEffect } from 'react';
import APIReport from "../../apis/apiReport";
import Handshake from "../../components/handshake";
import Area from "../../components/areas";
import Loading from "../../components/loading";
import FileTransfer from "../../components/fileTransfer";
import ShocketInterface from "../../components/shocketinterface";


export default function ShiftChange() {

    const [report, setReport] = useState();
    const [isEnableDoc, setIsEnableDoc] = useState('disabled');

    useEffect(() => {

        if (!report) {

            APIReport.downloadJson("informe-last.json")
                .then(res => {
                    setReport(res);
                })
                .catch((e) => { window.alert(`❌ ${e.message}`); });
        }

    }, [report]);


    const isEnabled = (x) => {
        x ? setIsEnableDoc('enabled') : setIsEnableDoc('disabled');
    }
    // className={isEnableDoc}

    return (

        <>
            {report ? (

                <div className="mainContainer"> 

                    <ShocketInterface fileID={report[0].handshake.fileID} isEnabled={isEnabled} />

                    <Handshake hs={report[0].handshake} isEnableDoc={isEnableDoc} />


                    <section className="areas-container">

                        {report[1].areas.map((area, indexArea) => (
                            <div key={`area-${indexArea}`} className="area">

                                <Area area={area} indexArea={indexArea} isEnableDoc={isEnableDoc} />

                            </div>
                        ))}

                    </section>


                    <FileTransfer report={report} setReport={setReport} />


                </div>
            ) : (

                <Loading />

            )}



        </>

    );



}