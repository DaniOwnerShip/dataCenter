import { useState } from "react";

import Calendar from "./calendar";


export default function CardHandshake({ hs, setInformeR }) {

    console.log("CardHandShake");

    const [forceRender, setFR] = useState(false);

    const onChangeNum = (event, indexTeam) => {
        if (isNaN(event.target.value) || event.target.value >= 10 || event.target.value === 0) {
            window.alert("Escribe un número del 1 al 9"); event.target.value = ""; return;
        }
        const txtNum = document.getElementById(event.target.id);
        if (txtNum) {
            hs.party[indexTeam].number = event.target.value;
            console.log("hs.party[indexTeam].teamNumer ", hs.party[indexTeam].number)
            forceRender ? setFR(false) : setFR(true);
        }
        else { window.alert("Error _id"); return; }
    };


    const onChangeName = (event, indexTeam) => {
        const txtName = document.getElementById(event.target.id);
        if (txtName) {
            hs.party[indexTeam].leader = event.target.value;
            forceRender ? setFR(false) : setFR(true);
        }
        else { window.alert("Error _id"); return; }
    };



    return (

        <div className="flex">

            {hs.party.map((team, indexTeam) => (

                <div key={`party-${indexTeam}`} className="flex">

                    <h4>{team.type}</h4>

                    <h4> Nº </h4>
                    <input
                        type="text"
                        className="textInput-num"
                        id={`txt-num-${indexTeam}`}
                        onChange={(event) => onChangeNum(event, indexTeam)}
                        value={hs.party[indexTeam].number}
                    />

                    <h4> PTL </h4>
                    <input
                        type="text"
                        className="textInput"
                        id={`txt-PTL-${indexTeam}`}
                        onChange={(event) => onChangeName(event, indexTeam)}
                        value={hs.party[indexTeam].leader}
                    />


                </div>

            ))}

            <Calendar setInformeR={setInformeR} />

        </div>

    );
}