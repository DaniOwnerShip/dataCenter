import { useState } from "react";
import ImageUploader from "./imageUploader";


export default function BlocksAreas({ blocksAreas, showArea, setShowArea }) {

    const itemsState = [];
    const itemsComments = [];

    console.log('BlocksAreas');

    blocksAreas.map((ai, iai) => {
        itemsState.push([]);
        itemsComments.push([]);
        ai.areaItems.map((i, ii) => {
            itemsState[iai].push(i.state);
            itemsComments[iai].push(i.comments);
        });
    });

    const [itemState, setItemState] = useState(itemsState);
    const [comnentsState, setCommentstate] = useState(itemsComments);


    const toggleShowArea = (indexArea) => {
        const x = [...showArea];
        x[indexArea] = !x[indexArea];
        setShowArea(x);
    };


    return (

        <>

            {blocksAreas.map((area, indexArea) => (

                <section key={`area-${indexArea}`} className="mainContainer">

                    <Areas name={area.areaName} units={area.units} toggleShowArea={toggleShowArea} showArea={showArea} indexArea={indexArea} />

                    {showArea[indexArea] && <div className="block">

                        {area.areaItems.map((item, indexItem) => (

                            <div key={`item-${indexArea}-${indexItem}`} className="grid3x">

                                <p>{item.desc}</p>

                                <Buttons blocksAreas={blocksAreas} indexArea={indexArea} indexItem={indexItem} setItemState={setItemState} />

                                <Commensts blocksAreas={blocksAreas} indexArea={indexArea} indexItem={indexItem} setCommentstate={setCommentstate} comnentsState={comnentsState} />

                            </div>

                        ))}

                        <ImageUploader blocksAreas={blocksAreas} indexArea={indexArea} />

                    </div>}


                </section>

            ))}


        </>
    );
}




function Areas({ name, units, toggleShowArea, showArea, indexArea }) {
    return (
        <div className="grid3x--areaTittle">
            <h4 className="paddingL">{name}</h4>
            <h5 className="flex-center">{units}</h5>
            <h4>Comentarios</h4>
            <button className={`${showArea[indexArea] ? "button" : "button-area-active"}`}//
                onClick={() => toggleShowArea(indexArea)}>
                {`${showArea[indexArea] ? "contraer" : "expandir"}`}
            </button>
        </div>
    );
}



function Commensts({ blocksAreas, indexArea, indexItem, setCommentstate, comnentsState }) {

    const ekey = (indexArea + "-" + indexItem).toString();

    const onChangeTxtarea = (event, indexArea, indexItem) => {
        blocksAreas[indexArea].areaItems[indexItem].comments = event.target.value;

        setCommentstate(prevState => {
            const x = [...prevState];
            x[indexArea][indexItem] = event.target.value;
            blocksAreas[indexArea].areaItems[indexItem].comments = event.target.value;
            return x;
        });
    }

    return (
        <textarea
            id={`txtarea-${ekey}`}
            placeholder="comentarios"
            value={comnentsState[indexArea][indexItem]}
            onChange={(event) => onChangeTxtarea(event, indexArea, indexItem)}
        ></textarea>
    );
}





function Buttons({ blocksAreas, indexArea, indexItem, setItemState }) {

    const ekey = (indexArea + "-" + indexItem).toString();

    const onClickButton = (indexArea, indexItem, indexstate) => {

        let state = blocksAreas[indexArea].areaItems[indexItem].state[indexstate];
        state = !state;

        setItemState(prevState => {
            const x = [...prevState];
            x[indexArea][indexItem] = state;
            blocksAreas[indexArea].areaItems[indexItem].state[indexstate] = state;
            return x;
        });
    }

    return (
        <div className="flex-center">
            {blocksAreas[indexArea].areaItems[indexItem].state.map((state, indexstate) => (
                <button
                    key={`state-${ekey}-${indexstate}`}
                    className={` ${state ? 'button-green' : 'button-red'}`}
                    id={`button-${ekey}-${indexstate}`}
                    onClick={(event) => onClickButton(indexArea, indexItem, indexstate)}
                >
                    {`${state ? 'OK' : 'NOK'}`}
                </button>
                // <input type="button"
                //     key={`state-${ekey}-${indexstate}`}
                //     value={`${state ? 'OK' : 'NOK'}`}
                //     className={` ${state ? 'button-green' : 'button-red'}`}
                //     id={`button-${ekey}-${indexstate}`}
                //     onClick={(event) => onClickButton(indexArea, indexItem, indexstate)}
                // />
            ))}
        </div>
    );
}



// export function expandAreas() {
//     const x = {};
//     showArea.forEach(area => {
//       x[area] = true;
//     });
//     return x;
// }




// function setStyleButtons(blocksAreas) {

//     console.log('setStyleButtons');
//     blocksAreas.map((area, indexArea) => (

//         area.areaItems.map((item, indexItem) => (

//             item.state.map((state, indexState) => {

//                 const id = `button-${indexArea}${indexItem}${indexState}`;
//                 const btn = document.getElementById(id);
//                 if (!btn) {
//                     console.log("Error buttons map");
//                     return null;
//                 }
//                 if (state) {
//                     btn.classList.add('active');
//                     btn.value = "OK";
//                 } else {
//                     btn.classList.remove('active');
//                     btn.value = "NOK";
//                 }

//             })

//         ))

//     ));

// }

