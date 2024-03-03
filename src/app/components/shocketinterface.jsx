import { io } from "socket.io-client";

import { useState, useRef, useEffect  } from "react";
// import { useGlobalContext} from '../GlobalContext'; 
import _docReserve from '../pages/shiftChange/mainReport/docReserveOLD.json';
// import { ResizableBox } from 'react-resizable'; 
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import DocReserve from '../pages/shiftChange/docReserve'; 

import "../styles/animation.css"
 
 
export const socketState = {
    isOn: false,
    usersOn: 0,
    _socket: null,
    broadcastFn:  null 
}; 

  
export default function ShocketInterface({ fileID }) {   
 
    const docName =  fileID.split('.')[0]; 
   
    const [mySocket, setMySocket] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [myUser, setMyUser] = useState({ "alias": "", "socketID": "" }); 
    const [comment, setComment] = useState('');   

    const socketRef = useRef(null);
    const lastMsgRef = useRef(null);  
    const [isDisableDragg, setIsDisableDragg] = useState(true);
    const [windowStyle, setWindowStyle] = useState({ isDraggable: '', isDragging: '' });
    const [stylePanel, setStylePanel] = useState({Wsize : 200, Hsize: 80});    


    useEffect(() => {
        scrollToBottom();   
    }, [messages ]);


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
    const startDrag = () => {
         setWindowStyle(style => ({ ...style, isDragging: 'isDragging' }));
    }; 
    const stopDrag = () => {
          setWindowStyle(style => ({ ...style, isDragging: '' }));
    };

 

    function socketInit() {

        if (myUser.alias === '') {
            window.alert('introduce un nombre');
            return;
        }
        const newSocket = io("http://192.168.1.100:3001", {
            query: {
                userAlias: myUser.alias
            }
        });

        newSocket.on("connect", () => {  
            socketMethodsSubscribe(newSocket);   
        });  
    };



    function socketMethodsSubscribe(socket) {

        if (!socket) { return window.alert(`❌ socket error`); }

        setMySocket(socket);
        setMyUser({ ...myUser, socketID: socket.id });
        setMessages(msgs => [...msgs, 'Conectado como: ' + myUser.alias]); 
        setStylePanel({Wsize : 200, Hsize: 300}) 
        socketState.isOn = true;
        socketState._socket = socket;
        socketState.broadcastFn = fileSavedBroadcast; 


        socket.on('docReserveRes', (res) => { 
            const succes = res.succes;
            const msg = res.message; 
            if (succes) {
                DocReserve.state = DocReserve.states.enabled;
                document.documentElement.style.setProperty('--line-anim-color', '#BA372D');
                return;
            } 
            setMessages(prevMsg => [...prevMsg, msg]);
        });  


        socket.on('releaseDocRes', (res) => {    
            const succes = res.succes;
            const msg = res.message; 
            if (succes) {
                DocReserve.state = DocReserve.states.disabled;
                document.documentElement.style.setProperty('--line-anim-color', 'lime');
                return;
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
            console.log("socketState", socketState); 
            socketState.isOn = false;
            socketState.usersOn = users.length;
            DocReserve.state = DocReserve.states.disabled;
            setUsers([]);
            setMessages([]);
            setMySocket(null);     
            setStylePanel({Wsize : 200, Hsize: 80}) 
            document.documentElement.style.setProperty('--line-anim-color', 'lime');
            console.log("disconnect");
        });
    }



    const reserveDoc = () => {
        if (mySocket?.connected) {
            mySocket.emit("docReserveReq", docName);
        }
        else {
            console.log("conexión inactiva");
        }
    };

    const releaseDoc = () => {

        if (mySocket?.connected) {

            if (DocReserve.state === DocReserve.states.disabled) {
                window.alert('No tienes ninguna reserva');
                return;
            }
            mySocket.emit("releaseDocReq", docName);
        }
        else {
            console.log("releaseDoc conexión inactiva");
        }
    };


    const sendComment = () => { 
        mySocket.emit("comment", {msg: comment});
        setComment('');
    }; 


    const socketOff = () => {
        if (mySocket?.connected) {

            if (DocReserve.state === DocReserve.states.enabled) {
                const confirm = window.confirm('Su reserva será retirada ¿Quiere continuar?');
                if (confirm) {
                    releaseDoc();
                    mySocket.disconnect();
                    return;
                }
            }
            else { 
                mySocket.disconnect();
            }

        }
        else {
            console.log("conexión inactiva");
        }
    }; 


    const fileSavedBroadcast = () => {
        console.log("fileSavedBroadcast");
        console.log("fileSavedBroadcast", socketState._socket);
 
        if (socketState._socket?.connected) { 
            console.log("emit");
            socketState._socket.emit("comment", {type: "msg", msg: "ARCHIVO ACTUALIZADO"});
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
                onStart={startDrag}
                onStop={stopDrag}
            >

                <div ref={socketRef} className={`socket-interface ${Object.values(windowStyle).join(' ')}`}>


                    <ResizableBox width={stylePanel.Wsize} height={stylePanel.Hsize} minConstraints={[150, 50]}>
                        <>


                            <button type="button" className="button" onClick={toggleDragg}>
                                {isDisableDragg ? "📍" : "📌"}
                            </button>

                            {!mySocket && <>

                                <button className="button sidebar" onClick={socketInit}>
                                    Conectar como:
                                </button>

                                <input
                                    type="text"
                                    className="textarea-socket"
                                    placeholder="nombre"
                                    id={`txt-num-${'indexTeam'}`}
                                    onChange={(e) => onChangeName(e)}
                                    value={myUser.alias}
                                />

                            </>}

                            {mySocket && <>

                                <div className="lineAnim-background"></div>
                                <div className="lineAnim"></div>

                                {DocReserve.state === DocReserve.states.disabled && <button className="button sidebar" onClick={reserveDoc}>Reservar Doc.</button>}
                                {DocReserve.state === DocReserve.states.enabled && <button className="button sidebar" onClick={releaseDoc}>Liberar Doc.</button>}
                                <button className="button sidebar" onClick={socketOff}>Desconectar</button>

                                <div className="flex column">

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
                                            placeholder="enviar comentario"
                                            value={comment}
                                            onChange={onChangeComment}
                                        ></textarea>

                                        <button className="button sidebar" onClick={sendComment}>enviar</button>

                                    </div> 

                                </div>  

                            </>}

                        </>
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

