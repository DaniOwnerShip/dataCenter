
import "../../styles/shift.css"

export const metadata = {
    title: 'handshake',
}

export default function handshakeLayout({ children }) {

    console.log('handshakeLayout');

    return (
        <>
            <h1>Cambio de Turno</h1>
            <div className="mainContainer">

                {/* <Calendar setInforme={setInforme} />*/}
                {children}

            </div>
        </>


    );



    //   return (

    //     <section>
    //     {/* Include shared UI here e.g. a header or sidebar 
    //     <nav></nav>*/}
    //     <p>handshakeLayout</p>

    //     {children}
    //   </section>
    //   );

}

