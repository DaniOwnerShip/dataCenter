import { useState } from "react"; 


export default function Handshake({ hs , isEnableDoc}) {
 
    const loadedFile = hs.fileID.split('.')[0];

    const [forceRender, setForceRender] = useState(false);
  

    const onChangeNum = (event, indexTeam) => {

        const txtNum = document.getElementById(event.target.id);

        if (!txtNum || isNaN(event.target.value) || event.target.value >= 10 || event.target.value === 0) {
            window.alert("Escribe un número del 1 al 9");
            event.target.value = "";
            return;
        }

        hs.party[indexTeam].number = event.target.value;

        setForceRender(!forceRender);

    };



    const onChangeName = (event, indexTeam) => {

        const txtName = document.getElementById(event.target.id);
        if (!txtName) { return; }

        hs.party[indexTeam].leader = event.target.value;

        setForceRender(!forceRender);
    };



    return (

        <section className="handshake">

            {hs.party.map((team, indexTeam) => (

                <div key={`party-${indexTeam}`} className={`flex ${isEnableDoc}`} >

                    <p> ⚒️ {team.type + " Nº"}  </p>

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

            <p>📑 {loadedFile} </p>


        </section >

    );
}