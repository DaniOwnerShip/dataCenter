

export default function BlocksAreas({ blocksAreas }) {

    console.log("blocksAreas", blocksAreas);

    const onChangeState = (event, indexArea, indexItem, indexstate) => {
        event.stopPropagation();

        var state = blocksAreas[indexArea].areaItems[indexItem].state[indexstate];
        const buttonState = document.getElementById(event.target.id);

        if (buttonState) {
            state = !state;
            blocksAreas[indexArea].areaItems[indexItem].state[0] = state;
            if (state) {
                buttonState.classList.add('active');
                buttonState.textContent = "OK";
            } else {
                buttonState.classList.remove('active');
                buttonState.textContent = "NOK";
            }
        }
        else {
            window.alert("Error _id");
            return;
        }
    }


    return (

        <>

            {blocksAreas.map((area, indexArea) => (

                <div key={`area-${indexArea}`} >

                    <div className="blockItem">
                        <div className="blockItem-tittle">
                            <h4>{area.areaName}</h4>
                        </div>

                        <div className="blockItem-state">
                            <h4>{area.units}</h4>
                        </div>
                        <div className="blockItem-tittle">
                            <h4>Comentarios</h4>
                        </div>
                    </div>

                    {area.areaItems.map((item, indexItem) => (
                        <div key={`item-${indexItem}`}>

                            <div className="blockItem">

                                <div className="blockItem-desc">
                                    <p>{item.desc}</p>
                                </div>

                                <div className="blockItem-state">

                                    {item.state.map((state, indexstate) => (
                                        <div key={`state-${indexstate}`}
                                            className="blockItem-state-button"
                                            id={`button-${indexArea}-${indexItem}-${indexstate}`}
                                            onClick={(event) => onChangeState(event, indexArea, indexItem, indexstate)}
                                        >
                                            {`${state ? 'OK' : 'NOK'}`}

                                        </div>
                                    ))}

                                </div>
                                
                                    <textarea
                                        className="textarea"
                                        placeholder="introduce un comentario"
                                        // value={comments}
                                        // onChange={handleChange}
                                    ></textarea>



                            </div>

                        </div>
                    ))}

                </div>
            ))}


        </>
    );
}