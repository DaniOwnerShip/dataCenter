"use client"
import shiftTemplate from "../shiftChangeTemplate.json"
import CardSimple from "../components/cardSimple";
import CardDouble from "../components/cardDouble";
import downloadTxt from "../utils/downloader"; 
import genPDFweb from "../utils/genPDFweb";

import "../styles/shift.css" 

export default function ShiftChange() {

    // console.log("ShiftChange", template);

    // console.log("shiftTemplate->", shiftTemplate[1].Seguridad[0].name);
    const seg = shiftTemplate[1].Seguridad; 
    const production = shiftTemplate[2].Produccion; 
    // console.log("Produccion", production);
    const pushButton = () => {
        console.log('data :', shiftTemplate ); 
        // downloadTxt(shiftTemplate);
        genPDFweb('public/output.pdf');
    };

    return (
        <div className="container">

            <div className="container-head">
                <p>test header</p>
            </div> 

            <CardSimple data={seg} />
            <CardDouble data={production} />  
 
            <button 
            onClick={pushButton}
            >
                 Check 
            </button>

        </div>

    );
}