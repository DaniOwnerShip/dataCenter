import { io } from "socket.io-client";

import { useState, useRef, useEffect  } from "react";  
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable'; 

import "../styles/animation.css"
 
export const Isocket = {
    isOn: false,
    socket: null,
    docSaveNotifyFn: null,
    fastdocreserve:{
        isReq: false,
        isActive: false,
        initFn: null, 
        endFn: null
    }
}
  
 
  
export default function SocketInterface({ fileID, callbackSocket, isDocReserved  }) {   
 
    console.log('SocketInterface' );
    const docName =  fileID.split('.')[0]; 
   
    const [mySocket, setMySocket] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [myUser, setMyUser] = useState({ "alias": 'usuario', "socketID": "" }); 
    const [comment, setComment] = useState('');   

    const socketRef = useRef(null);
    const lastMsgRef = useRef(null);  
    const [isDisableDragg, setIsDisableDragg] = useState(true);
    const [windowStyle, setWindowStyle] = useState({ isDraggable: '', isDragging: '' });
    const [stylePanel, setStylePanel] = useState({Wsize : 200, Hsize: 80});     
 
 

    useEffect(() => {
 
        scrollToBottom();

        if (!Isocket.fastdocreserve.initFn ) { 
            Isocket.fastdocreserve.initFn = socketInit;  
        } 
  
    }, [messages]);




    const onChangeName = (e) => { 
        setMyUser({ ...myUser, alias: e.target.value }); 
    };
     
    const onChangeComment = (e) => {
        setComment(e.target.value);
    };  
    const scrollToBottom = () => {
        if (lastMsgRef.current) {
            lastMsgRef.current.scrollTop = lastMsgRef.current.scrollHeight;
        }
    }; 

    const toggleDragg = () => {
        setIsDisableDragg(!isDisableDragg);
        const isDrg = isDisableDragg ? 'isDraggable' : '';
        setWindowStyle(style => ({ ...style, isDraggable: isDrg }));
    }
    const startDrag = (e) => {
        e.target.style.cursor = "grabbing";
    };

    const stopDrag = (e) => {
        e.target.style.cursor = "";
    };

 

    const socketInit = async () => {

        console.log('socketInit');
        // if (myUser.alias === '') {

        // setMyUser({ ...myUser, alias: 'anonimous'}); 
        //     // window.alert('introduce un nombre');
        //     // return;
        // }
         const newSocket = io("http://192.168.1.100:3001", {
            query: {
                userAlias: myUser.alias
            }
        });

        const connection = await new Promise(function (resolve, reject) { 

           newSocket.on("connect", async () => { 
                addMethods(newSocket);
                resolve('connect resolve');
            }); 

        });

        return connection;  
    };

 
 
    const addMethods = (socket) => { 

        if (!socket) { return window.alert(`❌ socket error`); } 

        setMySocket(socket);
        setMyUser({ ...myUser, socketID: socket.id });
        setMessages(msgs => [...msgs, 'Conectado como: ' + myUser.alias]); 
        setStylePanel({ Wsize: 200, Hsize: 300 })
        
        Isocket.isOn = true;
        Isocket.docSaveNotifyFn = fileSavedBroadcast;

        if (Isocket.fastdocreserve.isReq) {
            Isocket.socket = socket;
            Isocket.fastdocreserve.endFn = async (socket) => {
                const ef = await new Promise(function (resolve, reject) {
                    releaseDoc(socket) ? resolve() : reject("Err releaseDoc");
                });
                return ef;
            }; 
            reserveDoc(socket);  
        }


        socket.on('docReserveRes', (res) => {
            const succes = res.succes;
            const msg = res.message;
            if (succes) {   
                document.documentElement.style.setProperty('--line-anim-color', '#BA372D'); 
                if (Isocket.fastdocreserve.isReq) {
                    Isocket.fastdocreserve.isActive = true; 
                    callbackSocket(true, true);  
                    return; 
                } 
                callbackSocket(true, false);  
            } else if (Isocket.fastdocreserve.isReq) {
                window.alert(msg);
                socketOff(Isocket.socket);
                return;
            }
            setMessages(prevMsg => [...prevMsg, msg]);
        });


        socket.on('releaseDocRes', (res) => {
            const succes = res.succes;
            const msg = res.message;
            if (succes) {
                callbackSocket(false, false);
                if (Isocket.fastdocreserve.isActive) {
                    socketOff(Isocket.socket); 
                    return;
                } else {
                    document.documentElement.style.setProperty('--line-anim-color', 'lime');
                }
            }
            setMessages(prevMsg => [...prevMsg, msg]);
        });


        socket.on('comment', (comment) => { 
            setMessages(prevMsg => [...prevMsg, `${comment.user}-> ${comment.msg}`]);
        });


        socket.on('usersOn', (users) => {
            console.log('usersOn:', users);
            setUsers(users);
        });


        socket.on("disconnect", () => {
            console.log("disconnect");
            Isocket.fastdocreserve.isReq = false;
            Isocket.fastdocreserve.isActive = false;
            Isocket.isOn = false;
            Isocket.socket = null;
            Isocket.broadcastFn = null;
            // Isocket.fastdocreserve.initFn = null;
            Isocket.fastdocreserve.endFn = null;
            setUsers([]);
            setMessages([]);
            setMySocket(null);
            setStylePanel({ Wsize: 200, Hsize: 80 })
            document.documentElement.style.setProperty('--line-anim-color', 'lime'); 
            console.log("disconnect$$", Isocket);
        });
 
    }



    const reserveDoc = (_socket = mySocket) => {
        if (_socket?.connected) {
            console.log("reserveDoc1");
            _socket.emit("docReserveReq", docName);
        }
        else {
            console.log("conexión inactiva");
        }
    };

    const releaseDoc = (_socket = mySocket) => {

        if (_socket?.connected) { 
            _socket.emit("releaseDocReq", docName);
            return true;
        }
        else {
            console.log("releaseDoc conexión inactiva");
            return false;
        }
    };


    const sendComment = () => { 
        mySocket.emit("comment", {msg: comment});
        setComment('');
    }; 


    const socketOff = (_socket = mySocket) => {
        if (_socket?.connected) {

            _socket.disconnect();
            console.log("disconnected>><<<", Isocket);

            
            //     if (confirm) {
            //         releaseDoc();
            //         mySocket.disconnect();
            //         return;
            //     }
            // }
            // else { 
            //     mySocket.disconnect();
            // }

        }
        else {
            console.log("conexión inactiva");
        }
    }; 


    const fileSavedBroadcast = (socket) => {
        console.log("fileSavedBroadcast"); 
 
        if (socket?.connected) { 
            console.log("emit");
            socket.emit("comment", {msg: "ARCHIVO ACTUALIZADO"});
        }
        else {
            console.log("fileSavedBroadcast conexión inactiva");
        }
    }

    return (
        <>
            <Draggable
                nodeRef={socketRef}
                disabled={isDisableDragg}
                onStart={(e) => startDrag(e)}
                onStop={(e) => stopDrag(e)}
            >

                <div ref={socketRef} className={`socket-interface ${Object.values(windowStyle).join(' ')}`}>


                    <ResizableBox width={stylePanel.Wsize} height={stylePanel.Hsize} minConstraints={[150, 50]}>
                        <div>

                            <button type="button" className="button" onClick={toggleDragg}>
                                {isDisableDragg ? "📍" : "📌"}
                            </button>

                            {!mySocket && <>
                                <button className="button sidebar" onClick={socketInit}>Conectar como:</button>
                                <input
                                    type="text"
                                    className="input-socket"
                                    placeholder="nombre"
                                    id={`txt-num-${'indexTeam'}`}
                                    onChange={(e) => onChangeName(e)}
                                    value={myUser.alias}
                                />
                            </>}

                            {mySocket && <>
                                <div className="lineAnim-background"></div>
                                <div className="lineAnim"></div>

                                <button type="button" className="button sidebar" onClick={() => socketOff(mySocket)}>Desconectar</button>
                                {!isDocReserved && <button className="button sidebar" onClick={() => reserveDoc(mySocket)}>Reservar Doc.</button>}
                                {isDocReserved && <button className="button sidebar" onClick={() => releaseDoc(mySocket)}>Liberar Doc.</button>}

                                <div className="flex column socket-container">

                                    <div className="socket-box">

                                        {`Usuarios conectados (${users.length}) :`}

                                        <ul className="socket-list" ref={lastMsgRef} >
                                            {users?.map((user, index) => (
                                                <li key={`user-${index}`}>{`🧑‍💻${user.userAlias}`}</li>
                                            ))}
                                        </ul>

                                    </div>


                                    <div className="socket-box">

                                        Mensajes Recibidos:

                                        <ul className="socket-list" ref={lastMsgRef} >
                                            {messages.map((msg, index) => (
                                                <li key={`msg-${index}`}>{msg}</li>
                                            ))}
                                        </ul>

                                        <textarea className="textarea-socket"
                                            placeholder="comentario"
                                            value={comment}
                                            onChange={onChangeComment}
                                        ></textarea>

                                        <button type="button" className="button sidebar" onClick={sendComment}>enviar</button>

                                    </div>

                                </div>

                            </>}

                        </div>

                    </ResizableBox>

                </div>

            </Draggable>

        </>
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

