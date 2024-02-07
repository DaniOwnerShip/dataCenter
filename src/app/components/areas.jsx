import { useEffect, useMemo, useState } from "react"; 
import Multimedia from "./multimedia";

 

export default function Areas({ blocksAreas }) {

    const allocE = useMemo(() => Array(blocksAreas.length).fill(true)); 
    const [expandArea, setExpandArea] = useState(allocE);  


    const toggleShowArea = (indexArea) => {  
        const b = [...expandArea];
        b[indexArea] = !b[indexArea];
        setExpandArea(b);  
    };  


    return (
        <> 
            {blocksAreas.map((area, indexArea) => (

                <section key={`area-${indexArea}`} className="area">

                    <AreaTittle name={area.areaName} units={area.units} toggleShowArea={toggleShowArea} expandArea={expandArea} indexArea={indexArea} />


                    {expandArea[indexArea] && <>

                        <div className="area-items-container">

                            {area.areaItems.map((item, indexItem) => (

                                <div key={`item-${indexArea}-${indexItem}`} className="area-items">

                                    <p>{item.desc}</p>

                                    <Buttons blocksAreas={blocksAreas} indexArea={indexArea} indexItem={indexItem} />

                                    <Commensts blocksAreas={blocksAreas} indexArea={indexArea} indexItem={indexItem} />

                                </div>

                            ))}

                        </div>

                        <Multimedia blocksAreas={blocksAreas} indexArea={indexArea} />

                    </>}


                </section>


            ))}

        </> 

    ); 

} 




function AreaTittle({ name, units, toggleShowArea, expandArea, indexArea }) { 

    return (

        <div className="area-tittle">
            <h4 >{name}</h4>
            <h4 className="flex center">{units}</h4>
            <h4>Comentarios</h4>
            <button className="button-area-expand"
                onClick={() => toggleShowArea(indexArea)}>
                {`${expandArea[indexArea] ? "➖" : "➕"}`}
            </button>
        </div>

    );
}



function Commensts({ blocksAreas, indexArea, indexItem }) {

    const ekey = (indexArea + "-" + indexItem).toString();
    const id = `txtarea-${ekey}`
    const item = blocksAreas[indexArea].areaItems[indexItem];
    const [isExpanded, setIsExpanded] = useState(true);
    const [forceRender, setForceRender] = useState(false);

    const onChangeTxtarea = (e) => {
        item.comments = e.target.value;
        const txtObj = e.target;
        txtObj.style.height = 'auto';
        txtObj.style.height = txtObj.scrollHeight + 'px';
        setForceRender(!forceRender);
    }

    const toggletxtareaButton = () => {
        const txtObj = document.getElementById(id);
        if (!txtObj) { return; }
        if (isExpanded) {
            txtObj.style.height = '1rem';
        } else {
            txtObj.style.height = 'auto';
            txtObj.style.height = txtObj.scrollHeight + 'px';
        }
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const txtObj = document.getElementById(id);
        const lines = txtObj.value.split('\n').length;
        if (lines === 1) {
            txtObj.style.height = '1.2rem';
            return;
        }
        txtObj.style.height = 'auto';
        txtObj.style.height = txtObj.scrollHeight + 'px';
    }, [ekey]);


    return (

        <div className="textarea-container">

            <button id={`tbt-${ekey}`} className="textarea-button" onClick={() => toggletxtareaButton()}>
                {`${isExpanded ? '-' : '+'}`}
            </button>

            <textarea
                id={id}
                placeholder="comentarios"
                value={blocksAreas[indexArea].areaItems[indexItem].comments}
                onChange={(e) => onChangeTxtarea(e)}
            >
            </textarea>

        </div>

    );
}





function Buttons({ blocksAreas, indexArea, indexItem }) {

    const ekey = (indexArea + "-" + indexItem).toString();
    const [forceRender, setForceRender] = useState(false);
    const buttonStates = blocksAreas[indexArea].areaItems[indexItem].state;

    const buttonState = () => {
        buttonStates[indexArea] = !buttonStates[indexArea];
        setForceRender(!forceRender);
    }

    return (
        
        <div className="flex center">

            {blocksAreas[indexArea].areaItems[indexItem].state.map((states, indexstate) => (

                <button
                    key={`states-${ekey}-${indexstate}`}
                    className="button-area-item-state"
                    id={`button-${ekey}-${indexstate}`}
                    onClick={() => buttonState()}
                >
                    {`${states ? '✅' : '❌'}`}

                </button>

            ))}

        </div>
    );
}


