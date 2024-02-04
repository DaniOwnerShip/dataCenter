import { useEffect, useMemo, useState } from "react";
import ImageUploader from "./imageUploader";
import VideoUploader from "./videoUploader";
import Multimedia from "./multimedia";
// import NameColumns from "./nameColumns";id={`txtarea-${ekey}`}

// function resizeAllTxtareas(blocksAreas) {
//     blocksAreas.map((ai, iai) => { 
//         ai.areaItems.map((i, ii) => {
//             const textarea = document.getElementById(`txtarea-${iai}-${ii}`);
//             // textarea.style.height = 'auto'; 
//             textarea.style.height = textarea.scrollHeight + 'px';
//         });
//     });
// }

// function resizeOneAreaTxtareas(indexArea) { 
//         ai.areaItems.map((i, ii) => {
//             const textarea = document.getElementById(`txtarea-${indexArea}-${ii}`);
//             // textarea.style.height = 'auto'; 
//             textarea.style.height = textarea.scrollHeight + 'px';
//         }); 
// }

// function resizeOneItemTxtareas(blocksAreas) {
//     blocksAreas.map((ai, iai) => { 
//         ai.areaItems.map((i, ii) => {
//             const textarea = document.getElementById(`txtarea-${iai}-${ii}`);
//             // textarea.style.height = 'auto'; 
//             textarea.style.height = textarea.scrollHeight + 'px';
//         });
//     });
// }

function mapStates(blocksAreas) {
    const itemsState = [];
    const itemsComments = [];
    blocksAreas.map((ai, iai) => {
        itemsState.push([]);
        itemsComments.push([]);
        ai.areaItems.map((i, ii) => {
            itemsState[iai].push(i.state);
            itemsComments[iai].push(i.comments);
        });
    });

    return { itemsState, itemsComments }
}


export default function BlocksAreas({ blocksAreas, showArea, setShowArea, expandAreas }) {

    const objetStates = useMemo(() => mapStates(blocksAreas), [blocksAreas]);

    const [buttons, setButtons] = useState(objetStates.itemsState);
    const [comments, setComments] = useState(objetStates.itemsComments);

    const toggleShowArea = (indexArea) => {
        // const b = [...showArea];
        // b[indexArea] = !b[indexArea];
        // setShowArea(b);
        expandAreas(indexArea);
        // resizeOneAreaTxtareas(indexArea);
    };

    useEffect(() => {
        setButtons(objetStates.itemsState);
        setComments(objetStates.itemsComments);
        // resizeTxtareas(blocksAreas);
    }, [blocksAreas]);




    return (
        <>

            {blocksAreas.map((area, indexArea) => (

                <section key={`area-${indexArea}`} className="area">

                    <AreaTittle name={area.areaName} units={area.units} toggleShowArea={toggleShowArea} showArea={showArea} indexArea={indexArea} />


                    {showArea[indexArea] && <>

                        <div className="area-items-container">

                            {area.areaItems.map((item, indexItem) => (

                                <div key={`item-${indexArea}-${indexItem}`} className="area-items">

                                    <p>{item.desc}</p>

                                    <Buttons blocksAreas={blocksAreas} indexArea={indexArea} indexItem={indexItem} setButtons={setButtons} />

                                    <Commensts blocksAreas={blocksAreas} indexArea={indexArea} indexItem={indexItem} setComments={setComments} comments={comments} />

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




function AreaTittle({ name, units, toggleShowArea, showArea, indexArea }) {
    return (
        <div className="area-tittle">
            <h4 >{name}</h4>
            <h4 className="flex center">{units}</h4>
            <h4>Comentarios</h4>
            <button className="button-area-expand"
                onClick={() => toggleShowArea(indexArea)}>
                {`${showArea[indexArea] ? "➖" : "➕"}`}
            </button>
        </div>
    );
}



function Commensts({ blocksAreas, indexArea, indexItem, setComments, comments }) {

    const ekey = (indexArea + "-" + indexItem).toString();
    const [isExpanded, setIsExpanded] = useState(true);

    const onChangeTxtarea = (event, indexArea, indexItem) => {
        blocksAreas[indexArea].areaItems[indexItem].comments = event.target.value;
        const textarea = event.target;
        textarea.style.height = 'auto';  
        textarea.style.height = textarea.scrollHeight + 'px';
        setComments(prevState => {
            const x = [...prevState];
            x[indexArea][indexItem] = event.target.value;
            blocksAreas[indexArea].areaItems[indexItem].comments = event.target.value;
            return x;
        });
        setIsExpanded(true);
    }

    const toggletxtarea = (e) => {
        console.log("toggletxtarea", e.target.id);
        console.log("toggletxtarea", `txtarea-${ekey}`);
        const txt = document.getElementById(`txtarea-${ekey}`);
        if (!txt) { return; }
        if (isExpanded) {
            txt.style.height = '1rem';
        } else {
            txt.style.height = 'auto';  
            txt.style.height = txt.scrollHeight + 'px';
        }
        setIsExpanded(!isExpanded);
    };

    return (

        <div className="textarea-container">

            <button id={`tbt-${ekey}`} className="textarea-button" onClick={(e) => toggletxtarea(e)}> {`${isExpanded ? '-' : '+'}`}   </button>

            <textarea
                id={`txtarea-${ekey}`}
                placeholder="comentarios"
                value={comments[indexArea][indexItem]}
                onChange={(event) => onChangeTxtarea(event, indexArea, indexItem)}
            >


            </textarea>


        </div>

    );
}





function Buttons({ blocksAreas, indexArea, indexItem, setButtons }) {

    const ekey = (indexArea + "-" + indexItem).toString();

    const onClickButton = (indexArea, indexItem, indexstate) => {

        let state = blocksAreas[indexArea].areaItems[indexItem].state[indexstate];
        state = !state;

        setButtons(prevState => {
            const x = [...prevState];
            x[indexArea][indexItem] = state;
            blocksAreas[indexArea].areaItems[indexItem].state[indexstate] = state;
            return x;
        });
    }

    return (
        <div className="flex center">
            {blocksAreas[indexArea].areaItems[indexItem].state.map((state, indexstate) => (
                <button
                    key={`state-${ekey}-${indexstate}`}
                    className="button-area-item-state"
                    id={`button-${ekey}-${indexstate}`}
                    onClick={() => onClickButton(indexArea, indexItem, indexstate)}
                >
                    {`${state ? '✅' : '❌'}`}
                </button>

            ))}
        </div>
    );
}


