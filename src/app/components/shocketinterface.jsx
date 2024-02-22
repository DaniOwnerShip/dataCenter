
import { io } from "socket.io-client";
import { useState, useRef, useEffect  } from "react";
import { useGlobalContext } from '../GlobalContext';

 
 
const IdocState = {
    required: "required",
    reserved: "reserved",
    released: "released"
};

// let docReserve = { reqState: IdocState.required, docId: '', socketId: '', userAlias: '' };
// let IdocReserve = { docId: "", Iuser: {}, reqState: IdocState.released };

export default function ShocketInterface({ fileID }) { 
 
    const docID = fileID;
    const {setGlobalDocIsBlock } = useGlobalContext();  
    const [clientShocket, setClientShocket] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [myUser, setMyUser] = useState('');
    const [isSocketOn, setIsSocketOn] = useState(false);
    const [comment, setComment] = useState('');
    const [docReserve, setDocReserve] = useState({ reqState: IdocState.required, docId: '', socketId: '', userAlias: '' });
    const lastMsgRef = useRef(null);


 
    
    const handleTextareaChange = (e) => {
        setComment(e.target.value);
    };

    const sendText = () => {
        console.log('sendText: ', comment);
        clientShocket.emit("comment", comment);
        setComment('');
    }; 


    const reserveDoc = () => {
        if (clientShocket?.connected) { 
            const tdocReserve = { 
                reqState: IdocState.required, 
                docId: docID,
                socketId: docReserve.socketId,
                userAlias: myUser, 
            } 
            setDocReserve(tdocReserve); 
            clientShocket.emit("reserveReq", tdocReserve);
        }
        else {
            console.log("conexión inactiva");
        } 
    };


    const releaseDoc = () => {
        if (clientShocket?.connected) { 
            clientShocket.emit("releaseDoc1", docReserve);
            const tdocReserve = { 
                reqState: IdocState.released, 
                docId: docReserve.docId,
                socketId: docReserve.socketId,
                userAlias: docReserve.userAlias, 
            } 
            setDocReserve(tdocReserve);
            clientShocket.emit("releaseDoc", docReserve);
        }
        else {
            console.log("conexión inactiva");
        }
    };



    function socketInit() {
 
        if (myUser === '') {
            window.alert('introduce un nombre');
            return;
        }

        const newSocket = io("http://192.168.1.100:3001", {
            query: {
                userAlias: myUser
            }
        });

        newSocket.on("connect", () => { 
            setClientShocket(newSocket);
            setIsSocketOn(true); 
            // setMessages(prevMessages => [...prevMessages, `Conexión establecida como: ${myUser}`]);
        }); 

        newSocket.on('connectRes', (res) => {
            console.log('connectRes',res);
            console.log('connectResxxxs',res.user.socketID);
            const tdocReserve = { 
                reqState: IdocState.released, 
                docId: docReserve.docId,
                socketId: res.user.socketID,
                userAlias: docReserve.userAlias, 
            } 
            setDocReserve(tdocReserve);
            // docReserve.socketId = res.user.socketID;
            console.log('docReserve.socketId',tdocReserve.socketId);
            setMessages(prevMessages => [...prevMessages, res.message]);
        });



        newSocket.on('reserveRes', (res) => {

            const state = res.IdocReserve.reqState;

            console.log('reserveRes',res);
            console.log('reserveReszzzzz',res.IdocReserve.userOwner.socketID);
            console.log('docReserve.socketIdxxxx',docReserve.socketId);
            console.log('docReserve',docReserve );
            if (res.IdocReserve.userOwner.socketID === docReserve.socketId) {
                console.log('socketID');

                if (state === IdocState.reserved) {
                    docReserve.reqState = state;
                    const tdocReserve = { 
                        reqState: IdocState.reserved, 
                        docId: docReserve.docId,
                        socketId: res.IdocReserve.userOwner.socketID,
                        userAlias: docReserve.userAlias, 
                    } 
                    setDocReserve(tdocReserve);
                    setGlobalDocIsBlock('enabled');
                    console.log('reserved');
                }
                if (state === IdocState.released) {
                    const tdocReserve = { 
                        reqState: IdocState.released, 
                        docId: '',
                        socketId: '',
                        userAlias: '' 
                    } 
                    setDocReserve(tdocReserve); 
                    setGlobalDocIsBlock('disabled');
                    console.log('released');
                }
            }
            setMessages(prevMessages => [...prevMessages, res.message]);
            console.log('reserveStatus:', res);

        });

        newSocket.on('comment', (data) => {
            console.log('comment:', data);
            setMessages(prevMessages => [...prevMessages, data]);
        });

        newSocket.on('users', (users) => {
            console.log('users:', users);
            setUsers(users);
        });

        newSocket.on("disconnect", () => {
            setUsers([]);
            setMessages([]);
            setIsSocketOn(false);
            setGlobalDocIsBlock('disabled');
            console.log("disconnect");
        });
    }; 


    const socketOff = () => {
        if (clientShocket?.connected) { 
            releaseDoc();
            clientShocket.disconnect(); 
        }else {
            console.log("conexión inactiva");
        }
    };

    const onChangeName = (event) => {  
        setMyUser(event.target.value);
    };

    const scrollToBottom = () => {
        if (lastMsgRef.current) {
            lastMsgRef.current.scrollTop = lastMsgRef.current.scrollHeight;
        }
      };
    
      useEffect(() => {
        scrollToBottom();
      }, [messages]);
    


    return (

        <div className="socket-container">

            {!isSocketOn && <>
                <button className="button" onClick={socketInit}>
                    Conectar como:
                </button>
                <input
                    type="text"
                    className="textarea-socket"
                    placeholder="nombre"
                    id={`txt-num-${'indexTeam'}`}
                    onChange={(event) => onChangeName(event)}
                    value={myUser}
                /></>}

            {isSocketOn && <>

                <button className="button" onClick={reserveDoc}>Reservar Doc.</button>
                <button className="button" onClick={releaseDoc}>Liberar Doc.</button>
                <button className="button" onClick={socketOff}>Desconectar</button>


                <div className="flex">


                    <div className="socketmsg users">
                        <p>Usuarios conectados: </p>
                        {users?.map((user, index) => (
                            <p key={`user-${index}`} className="socketListmsg">
                                {`🧑‍💻${user.alias}\n${user.IP}`}
                            </p>
                        ))}
                    </div>


                    <div className="socketmsg">

                        <p>Mensajes Recibidos:</p>

                        <ul className="socketListmsg" ref={lastMsgRef} >
                            {messages.map((message, index) => (
                                <li key={`li-${index}`}>{message}</li>
                            ))}
                        </ul>

                        <textarea className="textarea-socket"
                            placeholder="enviar comentario"
                            value={comment}
                            onChange={handleTextareaChange}
                        ></textarea>

                        <button className="button" onClick={sendText}>sendText</button>

                    </div>


                </div>



            </>}



        </div>
    );
}








    // socket.on("disconnect", () => {
    //     console.log("Desconectado del servidor WebSocket");
    // });

    // //  escuchar mensajes enviados por el servidor
    // socket.on("mensajeDelServidor", (mensaje) => {
    //     console.log("Mensaje del servidor:", mensaje);
    // });

    // //   enviar mensajes al servidor 
    // socket.emit("mensajeDelCliente", "Hola servidor!");

    // // enviar un mensaje a todos los clientes conectados
    // socket.emit("mensajeGlobal", "¡Hola a todos los clientes!");

    // //   enviar mensajes a una sala específica
    // socket.emit("mensajeSala", { sala: "sala1", mensaje: "¡Hola sala 1!" });


    // socket.on("eventoPersonalizado", (datos) => {
    //     console.log("Evento personalizado recibido:", datos);
    // });

    // //   escuchar eventos específicos enviados por el servidor o por otros clientes.
    // socket.on("eventoPersonalizado", (datos) => {
    //     console.log("Evento personalizado recibido:", datos);
    // <button className="button" onClick={checkReserveDoc}>checkReserveDoc</button>
    // });

