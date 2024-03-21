// "use client"

// import React, { useState, useEffect, useRef } from 'react';
// import FileApi from "@/apis/fileApi";
// import Handshake from "@/components/handshake";
// import Area from "@/components/area";
// import FileBar from "@/components/fileBar";
// import Loading from "@/components/loading";
// import FileMetadata from "@/components/fileMetadata";
// import UnitPlantButtons from "@/components/unitPlantButtons";
// import SocketInterface, { Isocket } from "@/components/socketInterface";

  
   
// export default function ShiftChange() {

//     const [report, setReport] = useState();  
//     const [isExpanded, setIsExpanded] = useState(true);
//     const [isDocReserved, setIsDocReserved] = useState(false);
//     const refToPDF = useRef(null);
//     let fileNameReq = 'informe-main1-last.json';

//     const reportMetadata = useRef({
//         lastEdit: "",
//         name: "",
//         daynight: "",
//         isComplete: false
//       });
    

//       const callbackDatePicker = (_fileNameReq) => {
//         console.log('callbackDatePicker:', _fileNameReq  ); 
//         getReport(_fileNameReq, true);
//     };

//     const toggleExpandApp = () => {
//         setIsExpanded(!isExpanded);
//     };

//     const newfastReserve = () => {
//         console.log('newfastReserve:', Isocket);
//         if (!Isocket.isOn) {
//             Isocket.fastdocreserve.isReq = true;
//             Isocket.fastdocreserve.initFn();
//             console.log('isOn:');
//             return;
//         } else if (!Isocket.fastdocreserve.isActive) {
//             window.alert('ya tienes una conexión activa');
//             return;
//         }
//         console.log('isActive:');
//         Isocket.fastdocreserve.endFn();
//     };


//     const getReport = (_fileNameReq, needAlert = false) => {    
//         console.log('reportx');
//         FileApi.downloadjson(_fileNameReq)
//             .then(res => {
//                 setReport(res.resData);  
//                 reportMetadata.current = res.resData[0].metaData;
//                 reportMetadata.current.lastEdit = res.modDate; 
//                 if (needAlert) {
//                 window.alert(`✅ Datos descargados al formualario \n\n archivo: ${_fileNameReq}`); 
//                 }
//             })
//             .catch((e) => { window.alert(`❌ ${e.message}`); });  
//     };

//     useEffect(() => {     
//         if (!report) {
//             getReport(fileNameReq);
//         console.log('useEffectxx');
//     }  

//     }, [report]);


//     return (

//         <>
//             <h1 className="flex center header"> Cambio de Turno</h1>

//             {report ? (

//                 <div className="app" >

//                     <div className="sideBarLeft">
//                         <div className="sidebarBox flex column" >
//                             <UnitPlantButtons />
//                         </div>
//                         <SocketInterface fileID={report[0].metaData.fileID} setIsDocReserved={setIsDocReserved} isDocReserved={isDocReserved} />
//                     </div>


//                     <div className="mainContainer">

//                         <div className="fileContent" ref={refToPDF}>

//                             <div className="flex center rightpos">
//                                 <button title='reserva rápida' type="button" className="button" onClick={newfastReserve}>  {`${isDocReserved ? '📖' : '📙'}`}</button>
//                                 {isDocReserved ? '🔓' : '🔒'}&nbsp;&nbsp;
//                                 <button type="button" className="button" onClick={() => toggleExpandApp()}>  {`${isExpanded ? "➖" : "➕"}`}</button>

//                             </div>

//                             <FileMetadata reportMetadata={reportMetadata.current}/> 


//                             {isExpanded && <div className={`areas-container ${isDocReserved ? 'enabled' : 'disabled'}`}>

//                                 <Handshake hs={report[1].handshake} />

//                                 <section className="areas-container">

//                                     {report[2].areas.map((area, indexArea) => (
//                                         <div key={`area-${indexArea}`} className="area">

//                                             <Area report={report} place={'main1'} area={area} indexArea={indexArea} isMultimedia={true} />

//                                         </div>
//                                     ))}

//                                 </section>

//                                 <FileBar report={report} setReport={setReport} place={'main1'} refToPDF={refToPDF} callbackDatePicker={callbackDatePicker} />

//                             </div>}

//                         </div>

//                     </div>

//                 </div>



//             ) : (

//                 <Loading />

//             )}


//         </ >

//     );



// }