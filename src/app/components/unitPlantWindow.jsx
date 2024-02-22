"use client"
import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
// import FileApi from "../apis/fileApi";, useEffect, useRef 
import Area from "./area";
import Loading from "./loading";
// import "../styles/shiftChange.css"

import Draggable from 'react-draggable';

// let isDragg = false;

export default function UnitPlantWindow({place, report, setIsShow }) {

    console.log('unit:', place);
    const nodeRef = React.useRef(null); 
    const fname = report[0].handshake.fileID.split('.')[0]; 
    const [isDragg, setIsDragg] = useState(true);

    function toggleDragg(e) {
        setIsDragg(!isDragg); 
    }
    function toggleShow(e) {
        setIsShow(false);
    }


    return (

        <Draggable nodeRef={nodeRef} disabled={isDragg}>

            <div ref={nodeRef} className= {`UnitPlantWindow ${place}`}>

                <ResizableBox width={1070} height={325} minConstraints={[100, 100]} style={{ overflow: 'auto' }}>

                    {report ? (

                        <div className="mainContainer" >

                            {fname}

                            <div className="UnitPlantWindowBar" >

                                <button type="button" className="button" onClick={(e) => toggleShow(e)}>
                                    ❌
                                </button>

                                <button type="button" className="button" onClick={(e) => toggleDragg(e)}>
                                    {isDragg ? "📍" : "📌"}
                                </button>
                            </div>


                            <section className="areas-container">

                                {report[1].areas.map((area, indexArea) => (
                                    <div key={`area-${indexArea}`} className="area">

                                        <Area place={place} area={area} indexArea={indexArea} isMultimedia={false}/>

                                    </div>
                                ))}

                            </section>

                        </div>


                    ) : (

                        <Loading />

                    )}

                </ResizableBox>
            </div>
        </Draggable>







    );
}

