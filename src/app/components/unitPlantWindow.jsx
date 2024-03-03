"use client"
import React, { useState, useRef, useEffect} from 'react';
import Area from "./area";
import Loading from "./loading";
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';  
 

export default function UnitPlantWindow({ place, report, setIsShow }) {

    const nodeRef = useRef(null);
    const fname = report[0].handshake.fileID.split('.')[0];
    const [isDisableDragg, setIsDisableDragg] = useState(true);
    const unit = place;
    const [windowStyle, setWindowStyle] = useState({ place: unit, isDraggable: '', isDragging: '' });

    const toggleDragg = () => {
        setIsDisableDragg(!isDisableDragg);
        const isDrg = isDisableDragg ? 'isDraggable' : '';
        setWindowStyle(style => ({ ...style, isDraggable: isDrg }));
    }
    const toggleShow = () => { setIsShow(false); }

    const startDrag = () => {
        setWindowStyle(style => ({ ...style, isDragging: 'isDragging' }));
    };

    const stopDrag = () => {
        setWindowStyle(style => ({ ...style, isDragging: '' }));
    };

    useEffect(() => {  
        setWindowStyle(style => ({ ...style, place: unit })); 
    }, [unit]);



    return (

        <Draggable
            nodeRef={nodeRef}
            disabled={isDisableDragg}
            onStart={startDrag}
            onStop={stopDrag}  
            >

            <div ref={nodeRef} className={`UnitPlantWindow ${Object.values(windowStyle).join(' ')}`}>

                <ResizableBox width={580} height={250} minConstraints={[100, 100]} style={{ overflow: 'auto' }}>

                    <div className='resizableWindow'>
                    
                        {report ? (

                            <div className="mainContainer window" >

                                {fname}

                                <div className="UnitPlantWindowBar" > 
                                    <button type="button" className="button" onClick={toggleShow}>
                                        ❌
                                    </button> 
                                    <button type="button" className="button" onClick={toggleDragg}>
                                        {isDisableDragg ? "📍" : "📌"}
                                    </button>
                                </div> 

                                <section className="areas-container"> 
                                    {report[1].areas.map((area, indexArea) => (
                                        <div key={`area-${indexArea}`} className="area"> 
                                            <Area place={unit} area={area} indexArea={indexArea} isMultimedia={false} /> 
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

