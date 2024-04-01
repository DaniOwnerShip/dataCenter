import { useState } from "react";


export default function Handshake({ report }) {

    const hs = report[1].handshake;
    const meta = report[0].metaData;

    const [forceRender, setForceRender] = useState(false);
    const [isComplete, setIsComplete] = useState(meta.isComplete);

    const onComplete = () => {
        if (meta.checksum) {
            return window.alert('⚠️ El archivo ya está completado y no se puede modificar');
        }
        else if (meta.isComplete) {
            meta.isComplete = false;
            setIsComplete(false);
            return;
        }
        meta.isComplete = true;
        setIsComplete(true);
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

                {hs.party.map((party, indexTeam) => (

                    <div key={`party-${indexTeam}`} className="flex paddingL" >
 
                        <p> {party.type}  </p>
                        {party.number !== "" && <input
                            type="text"
                            className="input-num"
                            id={`txt-num-${indexTeam}`}
                            onChange={(event) => onChangeNum(event, indexTeam)}
                            value={hs.party[indexTeam].number}
                        />}

                        {party.number ? <p> PTL </p> : ""}
                        <input
                            type="text"
                            id={`txt-PTL-${indexTeam}`}
                            onChange={(event) => onChangeName(event, indexTeam)}
                            value={hs.party[indexTeam].leader}
                        />

                    </div>
                ))}

                {!meta.checksum &&
                    <div className="flex paddingL">
                        <p className="noMargin">✒️Estado:&nbsp;</p>
                        <button type="button"
                            className={`button docComplete ${isComplete ? 'isComplete' : ''}`}
                            onClick={() => onComplete()}>
                            <p className="noMargin">{`${isComplete ? 'COMPLETADO' : 'EDICIÓN'}`}</p>
                        </button>

                    </div>}

            </section >
        </>
    );
}