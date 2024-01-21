import { useState } from 'react';


export default function CardHandShake({ hs }) {

    console.log("Ca ", hs.name)
    const [comments, SetComments] = useState('');
    const [autor, SetAutor] = useState(hs.author);

    const handleChange = (event) => {
        // SetComments(event.target.value); 
        SetAutor(event.target.value);
        // data.coments = comments;
    };

    return (
        <div className="handShake">
            <h2>{hs.name}</h2>
            <div className="blockItem">

                <h4>Turno Entrante</h4>
                <h4> Nº: </h4>
                <input
                    type="text"
                    className="textInput-num"  // Puedes mantener la clase si la estás utilizando para estilos específicos 
                    value={hs.teamIn?.number}
                    onChange={handleChange}
                />
                <h4> PTL: </h4>
                <input
                    type="text"
                    className="textInput"  // Puedes mantener la clase si la estás utilizando para estilos específicos 
                    value={hs.teamIn?.PTL}
                    onChange={handleChange}
                />

                <h4>Turno Saliente</h4>

                <h4>Nº:</h4>
                <input
                    type="text"
                    className="textInput-num"  // Puedes mantener la clase si la estás utilizando para estilos específicos 
                    value={autor}
                    onChange={handleChange}
                />
                <h4>PTL:</h4>
                <input
                    type="text"
                    className="textInput"
                    value={autor}
                    onChange={handleChange}
                />
            </div>

            {/* <div className="blockItem">
                <h4>Autor:</h4>

                <input
                    type="text"
                    className="textInput"  // Puedes mantener la clase si la estás utilizando para estilos específicos
                    placeholder="Introduce un comentario"
                    value={autor}
                    onChange={handleChange}
                />

            </div> */}




            {/* <p>{data.TurnoEntrante}</p> 
                <p>{data.TurnoSaliente}</p>  */}




            {/* <div className="container-headBlock">
                <h3>{blockName}</h3>
            </div>
            {dataItems.map((items, index) => (
                <ItemSimple key={`cs+${index}`} data={items} />
            ))} */}

        </div>
    );
}