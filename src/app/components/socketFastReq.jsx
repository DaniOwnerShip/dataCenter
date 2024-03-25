
import { useState } from "react"; 
import SocketAPI from "../apis/socketAPI.mjs";

export default function SocketFastReq({  docID, callback }) { 

    const [mySocket, setMySocket] = useState();  

    const connectSocket = () => {

        if (mySocket) {
            SocketAPI.disconnect(mySocket); 
            return;
        } 

        SocketAPI.connect("userFast")
            .then((newSocket) => {
                addEvents(newSocket);
                setMySocket(newSocket); 
                newSocket.emit("docReserveReq", docID);
            })
            .catch(err => { window.alert(`❌ ${err}`); });
    }



    const addEvents = (newSocket) => {
         
        newSocket.on('docReserveRes', (res) => {
            const succes = res.succes;
            const msg = res.message; 
            if (succes) { 
                callback(true, true);
                window.alert(msg);
            }else{
                SocketAPI.disconnect(mySocket); 
                window.alert(msg);
            }
        });

        newSocket.on("disconnect", () => { 
            callback(false, false);
            setMySocket(null);
        }); 
    }


 

    return (

        <button title='reserva rápida' type="button" className="button" onClick={connectSocket}>  {`${mySocket ? '📖' : '🗝️'}`}</button>

    );
}