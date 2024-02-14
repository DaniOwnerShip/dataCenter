"use client"

import React, { useState, useEffect } from 'react';
import APIReport from "../../apis/apiReport";
import Handshake from "../../components/handshake";
import Area from "../../components/areas";
import Loading from "../../components/loading";
import FileTransfer from "../../components/fileTransfer";
import ShocketInterface from "../../components/shocketinterface";
import { ContextData } from './context';


export default function ShiftChange() {

    const [report, setReport] = useState();

    const [contextIsReserved, setContextIsReserved] = React.useState({ isReserved: 'disabled', docId: null, userIP: '0.0.0.0' });

    useEffect(() => {

        if (!report) {

            APIReport.downloadJson("informe-last.json")
                .then(res => {
                    setReport(res);
                })
                .catch((e) => { window.alert(`❌ ${e.message}`); });
        }

    }, [report]);


    return (

        <div className="mainContainer" >

            {report ? (
                <div>

                    <ContextData.Provider value={{ contextIsReserved, setContextIsReserved }}>

                        <ShocketInterface fileID={report[0].handshake.fileID} />

                        <div className={contextIsReserved.isReserved} >


                            <Handshake hs={report[0].handshake} />


                            <section className="areas-container">

                                {report[1].areas.map((area, indexArea) => (
                                    <div key={`area-${indexArea}`} className="area">

                                        <Area area={area} indexArea={indexArea} />

                                    </div>
                                ))}

                            </section>


                            <FileTransfer report={report} setReport={setReport} />

                        </div>
                    </ContextData.Provider>
                </div>
            ) : (

                <Loading />

            )}



        </div >

    );



}