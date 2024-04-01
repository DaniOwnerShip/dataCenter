import { useEffect, useState } from "react"; 
import MediaTabs from "./mediaTabs";  


export default function Area({report, spot, _area, indexArea, windowKey, isTemplate, isDocReserved}) { 

    const [expandArea, setExpandArea] = useState(true);    
 
    const unitN = spot.split('-')[1]; 

    return (
        <>
            <AreaTittle spot={spot} area={_area} expandArea={expandArea} setExpandArea={setExpandArea} />
           
            {expandArea && <div className="area-items-container">

                {_area.areaItems.map((item, indexItem) => (
                    <div key={`item-${indexArea}-${indexItem}`} className="area-items" > 
                        <AreaItem area={item} uKey={`${windowKey}-${spot}-${indexArea}-${indexItem}`} /> 
                    </div>
                ))}
                
                {unitN === '0' && <MediaTabs report={report} _area={_area} indexArea={indexArea} isTemplate={isTemplate} isDocReserved={isDocReserved}/>}

            </div>}  
        </> 
    );
}



function AreaTittle({ spot, area, expandArea, setExpandArea }) {
    
    const unitN = '_' + spot.split('-')[1]; 
    
    return (
        <div className={` ${expandArea ? `area-tittle expand ${unitN}` : `area-tittle ${unitN}`} `} >
             {area.areaName} 
            <div className="flex center">{area.units} </div>
             Comentarios 
            <button type="button" className="button expandArea"
                onClick={() => setExpandArea(!expandArea)}
            >
                {`${expandArea ? "➖" : "➕"}`}
            </button>
        </div>
    );
}



function AreaItem({ area, uKey }) {
    return (
        <>
            {area.desc} 
            <ButtonsStates areaItem={area} uKey={uKey} />
            <Commensts areaItem={area} uKey={uKey} />
        </>
    );
}



function ButtonsStates({ areaItem, uKey }) {
  
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
                    type="button"
                    key={`btnstate-${uKey}-${indexstate}`} 
                    className="button states"
                    id={`btnstate-${uKey}-${indexstate}`}
                    onClick={() => buttonState(indexstate)}
                >
                    {`${states ? '✅' : '❌'}`}
                </button>
            ))}

        </div>
    );
}




function Commensts({ areaItem, uKey }) { 

    const id = `txtarea-${uKey}`
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

            <button type="button" id={`tbt-${uKey}`} className="textarea-button" onClick={() => toggletxtareaButton()}>
                {`${isExpanded ? '-' : '+'}`}
            </button>
 
            <textarea className="textarea"
                id={id}
                placeholder="comentarios"
                value={areaItem.comments}
                onChange={(e) => onChangeTxtarea(e)}
            >
            </textarea>

        </div>

    );
}


