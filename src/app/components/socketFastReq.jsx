
import { Isocket } from "./socketInterface";

export default function SocketFastReq({ callbackSocket, isDocReserved }) {
    console.log('SocketFastReq');


    const startFastSocket = () => { 

        if (!Isocket.isOn) { 
            Isocket.fastdocreserve.isReq = true;
            Isocket.fastdocreserve.initFn()
                .then(() => { 
                    callbackSocket(true, true);
                })
                .catch(err => { window.alert(`❌ ${err}`); }); 
            return;
        } 
        else if (!Isocket.fastdocreserve.isActive) {
            window.alert('ya tienes una conexión activa');
            return;
        }

        Isocket.fastdocreserve.endFn(Isocket.socket)
            .then(() => {
                callbackSocket(false, false);
            })
            .catch(res => { window.alert(`❌ ${res}`); });
    };

  

    return (

        <button title='reserva rápida' type="button" className="button" onClick={startFastSocket}>  {`${isDocReserved ? '📖' : '🗝️'}`}</button> 

    );
}