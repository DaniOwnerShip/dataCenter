// "use client"
import shiftTemplate from "../shiftChangeTemplate.json"
import "../styles/shift.css"
// import React, { useRef } from 'react';

export default function ShiftChange() {

    // console.log("ShiftChange", template);

    console.log("shiftTemplate->", shiftTemplate[1].Seguridad[0].name);
    const seg = shiftTemplate[1].Seguridad;
    // const inputRef1 = useRef(null);

    return (
        <div className="container">

            <div className="container-head">
                <p>test header</p>
            </div>

            <div className="container-headBlock">
                <h3>{seg[0].name}</h3>
            </div>

            <div className="container-block">
                <div className="container-content">
                    <p>{seg[1].desc}</p>
                </div> 

                <div className="boxChecker" >
                    <div>
                        <label>OK</label>
                        <input type="checkbox" />
                    </div>
                    <div>
                        <label>NOK</label>
                        <input type="checkbox" />
                    </div>
                </div>

            <textarea className="textarea" placeholder="Escribe algo aquí"></textarea>  
            
            </div>

        </div>

    );
}