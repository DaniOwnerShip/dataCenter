import { useEffect, useState } from "react";
import Multimedia from "./multimedia";


export default function Area({ area, indexArea }) {

    const [expandArea, setExpandArea] = useState(true);

    return (
        <>
            <AreaTittle area={area} expandArea={expandArea} setExpandArea={setExpandArea} />

            {expandArea && <div className="area-items-container">
                {area.areaItems.map((area, indexItem) => (
                    <div key={`item-${indexArea}-${indexItem}`} className="area-items" >

                        <AreaItem area={area} ikey={`${indexArea}-${indexItem}`} />

                    </div>
                ))}

                <Multimedia area={area} indexArea={indexArea} />

            </div>}

        </>

    );
}



function AreaTittle({ area, expandArea, setExpandArea }) {
    return (
        <div className=    {` ${expandArea ? "area-tittle-expand" :  "area-tittle" } ` }   >
            <h4 >{area.areaName}</h4>
            <h4 className="flex center">{area.units}</h4>
            <h4>Comentarios</h4>
            <button className="button-area-expand"
                onClick={() => setExpandArea(!expandArea)}>
                {`${expandArea ? "➖" : "➕"}`}
            </button>
        </div>
    );
}



function AreaItem({ area, ikey }) {
    return (
        <>
            <p>{area.desc}</p>
            <ButtonsStates areaItem={area} ikey={ikey} />
            <Commensts areaItem={area} ikey={ikey} />
        </>
    );
}



function ButtonsStates({ areaItem, ikey }) {

    const [forceRender, setForceRender] = useState(false);
    const buttonStates = areaItem.state;

    const buttonState = (indexstate) => {
        buttonStates[indexstate] = !buttonStates[indexstate];
        setForceRender(!forceRender);
    }

    return (

        <div className="flex center">

            {areaItem.state.map((states, indexstate) => (
                <button
                    key={`btnstate-${ikey}-${indexstate}`}
                    className="button-area-item-state"
                    id={`btnstate-${ikey}-${indexstate}`}
                    onClick={() => buttonState(indexstate)}
                >
                    {`${states ? '✅' : '❌'}`}
                </button>
            ))}

        </div>
    );
}




function Commensts({ areaItem, ikey }) {

    const id = `txtarea-${ikey}`
    const item = areaItem;
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
    }, [id]);


    return (

        <div className="textarea-container">

            <button id={`tbt-${ikey}`} className="textarea-button" onClick={() => toggletxtareaButton()}>
                {`${isExpanded ? '-' : '+'}`}
            </button>

            <textarea
                id={id}
                placeholder="comentarios"
                value={areaItem.comments}
                onChange={(e) => onChangeTxtarea(e)}
            >
            </textarea>

        </div>

    );
}


