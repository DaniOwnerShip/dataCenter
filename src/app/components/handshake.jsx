import { useState } from "react";


export default function Handshake({ hs }) {

    const [forceRender, setForceRender] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const onChangeNum = (event, indexTeam) => {

        if (isNaN(event.target.value) || event.target.value >= 10 || event.target.value === 0) {
            window.alert("Escribe un número del 1 al 9");
            event.target.value = "";
            return;
        }

        hs.party[indexTeam].number = event.target.value;
        setForceRender(!forceRender);
    };



    const onChangeName = (event, indexTeam) => {
        hs.party[indexTeam].leader = event.target.value;
        setForceRender(!forceRender);
    };



    return (
        <>
            <hr />
            <section className="flex">

                {hs.party.map((team, indexTeam) => (

                    <div key={`party-${indexTeam}`} className="flex paddingL" >

                        <p> ⚒️ {team.type + " Nº "}  </p>

                        <input
                            type="text"
                            className="input-num"
                            id={`txt-num-${indexTeam}`}
                            onChange={(event) => onChangeNum(event, indexTeam)}
                            value={hs.party[indexTeam].number}
                        />

                        <p> PTL </p>
                        <input
                            type="text"
                            id={`txt-PTL-${indexTeam}`}
                            onChange={(event) => onChangeName(event, indexTeam)}
                            value={hs.party[indexTeam].leader}
                        />

                    </div>
                ))}
                <div className="flex paddingL">
                    <label>Completado: </label>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                </div>

            </section >
        </>
    );
}