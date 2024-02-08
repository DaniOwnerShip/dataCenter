"use client"

import React, { useState, useEffect } from 'react';
import APIReport from "../../apis/apiReport";
import Handshake from "../../components/handshake";
import Area from "../../components/areas";
import FileIO from "../../components/fileIO";
import Calendar from "../../components/calendar";
import Loading from "../../components/loading";



export default function ShiftChange() {

    const [informeR, setInformeR] = useState();

    useEffect(() => {

        if (!informeR) {

            APIReport.downloadJson("lastReport.json")
                .then(res => {
                    setInformeR(res);
                })
                .catch((e) => { window.alert(`page: ❌ ${e.message}`); });
        }
        else {

        }

    }, [informeR]);


    return (

        <div className="mainContainer" >

            {informeR ? (
                <>

                    <Handshake hs={informeR[0].handshake} setInformeR={setInformeR} />


                    {informeR[1].blocksAreas.map((area, indexArea) => (

                        <section key={`area-${indexArea}`} className="area">

                            <Area area={area} indexArea={indexArea} /> 

                        </section>

                    ))}


                    <div className="flex fileIO-bar" >

                        <FileIO informeR={informeR} />
                        <Calendar setInformeR={setInformeR} />

                    </div>


                </>

            ) : (

                <Loading />

            )}


        </div>


    );



}