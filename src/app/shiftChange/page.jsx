"use client"
import "../styles/shift.css"
import shiftTemplate from "../shiftChangeTemplate.json"
import CardHandShake from "../components/cardHandShake"; 
import BlocksAreas from "../components/blocksAreas";
// import downloadJson from "../utils/downloadJson"; 
import downloadPDF from "../utils/downloadPDF";


//MAIN
export default function ShiftChange() {

    const handShake = shiftTemplate[0].handShake;
    const blocksAreas = shiftTemplate[1].blocksAreas;

    // const seg = shiftTemplate[1].Seguridad;
    // const production = shiftTemplate[2].Produccion;

    console.log('headData :', handShake);

    const startDownload = () => {
        downloadPDF();
    };

    return (
        <div className="mainContainer">

            {/* <h2>Cambio de Turno</h2> */}

            <CardHandShake hs={handShake} />  
            {/* <NameColumns /> */}
            <BlocksAreas blocksAreas={blocksAreas} />
{/* 
            <NameColumns />

            <CardSimple data={seg} />
            <CardDouble data={production} /> */}

            <button
                onClick={startDownload}
            >
                DescargarPDF
            </button>

        </div>

    );
}