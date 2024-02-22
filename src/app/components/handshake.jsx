import { useState } from "react"; 
import { useGlobalContext } from '../GlobalContext';


export default function Handshake({ hs }) {
    
    const { globalDocIsBlock } = useGlobalContext();
 
    const fileName = hs.fileID.split('.')[0];
    const fileNameShort = fileName.replace('-main1', '');

    const [forceRender, setForceRender] = useState(false);
  

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

        <section className={`${globalDocIsBlock !== "disabled"? "handshake unblokDoc": "handshake"}`}>

            {hs.party.map((team, indexTeam) => (

                <div key={`party-${indexTeam}`} className={`flex ${globalDocIsBlock}`} >

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

            <p>📑 {fileNameShort} </p>


        </section >

    );
}