"use client"
import React, { useState, useRef, useEffect } from 'react';
import Area from "./area";
import Loading from "./loading";
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import FileMetadata from "./fileMetadata";
// import 'react-resizable/css/styles.css';  


export default function UnitPlantWindow({ _spot, report, setIsShow }) {

    const nodeRef = useRef(null);
    const fname = report[0].metaData.fileID.split('.')[0];
    console.log('UnitPlantWindow fname', fname);
    const [isDisableDragg, setIsDisableDragg] = useState(true);
    const spot = _spot;

    const unitN = '_' + spot.split('-')[1];
    console.log('unitN', unitN);
    const [windowStyle, setWindowStyle] = useState({ place: unitN, isDraggable: '', isDragging: '' });

    const toggleShow = () => { setIsShow(false); }

    const toggleDragg = () => {
        setIsDisableDragg(!isDisableDragg);
        const isDrg = isDisableDragg ? 'isDraggable' : '';
        setWindowStyle(style => ({ ...style, isDraggable: isDrg }));
    }

    const startDrag = () => {
        setWindowStyle(style => ({ ...style, isDragging: 'isDragging' }));
    };

    const stopDrag = () => {
        setWindowStyle(style => ({ ...style, isDragging: '' }));
    };

    useEffect(() => {
        setWindowStyle(style => ({ ...style, place: unitN }));
    }, [spot]);


    return (

        <Draggable
            nodeRef={nodeRef}
            disabled={isDisableDragg}
            onStart={startDrag}
            onStop={stopDrag}
        >

            <div ref={nodeRef} className={`UnitPlantWindow ${Object.values(windowStyle).join(' ')}`}>

                <ResizableBox width={870} height={250} minConstraints={[100, 100]} style={{ overflow: 'auto' }}>

                    <div className='resizableWindow'>

                        {report ? (

                            <div className="mainContainer window" >

                                <FileMetadata reportMetadata={report[0].metaData} />


                                <div className="UnitPlantWindowBar" >
                                    <button type="button" className="button" onClick={toggleShow}>
                                        ❌
                                    </button>
                                    <button type="button" className="button" onClick={toggleDragg}>
                                        {isDisableDragg ? "📍" : "📌"}
                                    </button>
                                </div>

                                <section className="areas-container">
                                    {report[2].areas.map((area, indexArea) => (
                                        <div key={`areaw-${indexArea}`} className="area">
                                            <Area report={report} spot={spot} _area={area} indexArea={indexArea} windowKey={'w2'} />
                                        </div>
                                    ))}
                                </section>

                            </div>

                        ) : (

                            <Loading />

                        )}

                    </div>

                </ResizableBox>

            </div>

        </Draggable>







    );
}

