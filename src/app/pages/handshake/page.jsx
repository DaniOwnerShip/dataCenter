"use client"

import CardHandshake from "../../components/cardHandshake";
// import NameColumns from "../../components/nameColumns";
import BlocksAreas from "../../components/blocksAreas";
import { expandAreas } from "../../components/blocksAreas";
import Loading from "../../components/loading";

import downloadPDF from "../../utils/handshake/fileIO/downloadPDF";
import React, { useState, useEffect } from 'react';
import APIReport from "../../apis/apiReport";
import FileIO from "../../components/fileIO";

import Calendar from "../../components/calendar";

function resizeAllTxtareas(blocksAreas) {
    blocksAreas.map((ai, iai) => {
        ai.areaItems.map((i, ii) => {
            const textarea = document.getElementById(`txtarea-${iai}-${ii}`);
            // textarea.style.height = 'auto'; 
            textarea.style.height = textarea.scrollHeight + 'px';
        });
    });
}
function resizeOneAreaTxtareas(blocksArea, indexArea) {
    console.log("indexArea", indexArea);
    blocksArea[indexArea].areaItems.map((i, ii) => {
        const textarea = document.getElementById(`txtarea-${indexArea}-${ii}`);
        // textarea.style.height = 'auto'; 
        textarea.style.height = textarea.scrollHeight + 'px';
    });
}
//MAIN
export default function Handshake() {

    console.log('Handshake');

    const [informeR, setInformeR] = useState();
    const [showArea, setShowArea] = useState();
    const [needResizeTxt, setNeedResizeTxt] = useState({ need: false, i: 0 });

    function expandAreas(indexArea) {
        console.log("expandAreas");
        const b = [...showArea];
        b[indexArea] = !b[indexArea];
        setShowArea(b);
        if (b[indexArea]) {
            setNeedResizeTxt({ need: true, i: indexArea })
        }
    }


    useEffect(() => {
        console.log("Handshake useEffect");
        if (!informeR) {
            APIReport.downloadJson("lastReport.json")
                .then(data => {
                    setInformeR(data);
                    const nAreas = data[1].blocksAreas.length;
                    const na = Array.from({ length: nAreas }, () => true);
                    setShowArea(na);
                    resizeAllTxtareas(data[1].blocksAreas);
                })
                .catch(() => { console.error('error json'); });
        }

        if (needResizeTxt.need) {

            console.log("needResizeTxt", needResizeTxt.need);
            resizeOneAreaTxtareas(informeR[1].blocksAreas, needResizeTxt.i);
            setNeedResizeTxt({ need: false, i: 0 })
        }

    }, [informeR, needResizeTxt]);


    return (
        <div className="mainContainer" >
            {informeR ? (

                <  >

                    <CardHandshake hs={informeR[0].handshake} setInformeR={setInformeR} />


                    <BlocksAreas blocksAreas={informeR[1].blocksAreas} showArea={showArea} setShowArea={setShowArea} expandAreas={expandAreas} />



                    <div className="flex fileIO-bar" >
                        <FileIO informeR={informeR} showArea={showArea} setShowArea={setShowArea} />
                        <Calendar setInformeR={setInformeR} />
                    </div>


                </ >


            ) : (
                <Loading />
            )}

        </div>


    );



}