"use client"

import CardHandshake from "../../components/cardHandshake"; 
// import NameColumns from "../components/nameColumns";
import BlocksAreas from "../../components/blocksAreas"; 
import {expandAreas} from "../../components/blocksAreas";
import Loading from "../../components/loading"; 
import saveReportJson from "../../utils/handshake/fileIO/saveReportJson"; 

import downloadPDF from "../../utils/handshake/fileIO/downloadPDF";
import React, { useState, useEffect } from 'react';
import APIReport from "../../apis/apiReport";  


//MAIN
export default function Handshake() {

    console.log('Handshake');
    // const areaRef = useRef(null);
    const [informeR, setInformeR] = useState();

    useEffect(() => {
          console.log("Handshake useEffect");
        if (!informeR) {
            // console.log("gettingInforme");
            APIReport.getReportByName("lastReport.json")
                .then(data => {
                    // console.log("data>>", data);
                    setInformeR(data);
                    // console.log("data", informeR);
                })
                .catch(error => {
                    console.error("Error al obtener el informe:", error); 
                });
        }

    }, [informeR]);


    const startdownloadPDF = () => {
        // if (areaRef.current) {
        //     areaRef.current.expandAreas();
        //   }
        downloadPDF();
       // saveReportJson(informeR);
        //sspdf();
    };
    const startsaveReportJson = () => { 
        saveReportJson(informeR);
        //sspdf();
    };


    return (
        <>
            {informeR ? (
                <div  >
                    <CardHandshake hs={informeR[0].handshake} setInformeR={setInformeR} />
                    {/* <NameColumns /> */} 
                    {/* <ImageUploader /> */}
                    <BlocksAreas blocksAreas={informeR[1].blocksAreas}/>
                    {/* <BlocksAreas blocksAreas={informeR[1].blocksAreas}   ref={areaRef}/>
                    <BlocksAreas blocksAreas={informeR[1].blocksAreas} />
                    <BlocksAreas blocksAreas={informeR[1].blocksAreas} /> */}

                    <button className="button-io" onClick={startdownloadPDF}>DescargarPDF</button>
                    <button className="button-io" onClick={startsaveReportJson}>saveReport</button>

                </div>
            ) : (
                <Loading />
            )}
        </>
    );




    // return (
    //     <>
    //         {informeR ? (
    //             <div className="mainContainer">

    //                 {/* <Calendar setInforme={setInforme} />*/}
    //                 <h1>{informeR[0].handshake.tittle}</h1>

    //                 <CardHandshake hs={informeR[0].handshake} setInformeR={setInformeR} />
    //                 {/* <NameColumns /> */}
    //                 <BlocksAreas blocksAreas={informeR[1].blocksAreas} />

    //                 <button onClick={startDownload}>DescargarPDF</button>

    //             </div>
    //         ) : (
    //             <Loading />
    //         )}
    //     </>
    // );



    // return (
    //     <>
    //         <Suspense fallback={<Loading />}>

    //             {informeR && <div className="mainContainer">

    //                 {/* <Calendar setInforme={setInforme} />*/}
    //                 <h1>{informeR[0].handshake.tittle}</h1>

    //                 <CardHandshake hs={informeR[0].handshake} setInformeR={setInformeR} />
    //                 {/* <NameColumns /> */}
    //                 <BlocksAreas blocksAreas={informeR[1].blocksAreas} />

    //                 <button onClick={startDownload}>DescargarPDF</button>

    //             </div>}
    //         </Suspense>

    //     </>

    // );
}