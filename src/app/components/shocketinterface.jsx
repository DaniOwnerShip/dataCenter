import { io } from "socket.io-client";

import { useState, useRef, useEffect  } from "react";
// import { useGlobalContext} from '../GlobalContext'; 
import _docReserve from '../pages/shiftChange/mainReport/docReserveOLD.json';
// import { ResizableBox } from 'react-resizable'; 
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import DocReserve from '../pages/shiftChange/docReserve'; 

import "../styles/animation.css"
 
export const Isocket = {
    isOn: false,
    broadcastFn: null,
    fastReserveDoc:{
        isReq: false,
        isActive: false,
        initFn: null,
        endFn: null
    }
}
  
 
  
export default function ShocketInterface({ fileID, setIsDocReserved }) {   
 
    console.log('{ShocketInterface}:' );
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
 
 
    function initFastReserve() { 
        socketInit();
        Isocket.fastReserveDoc.isReq = true;
        console.log('initFastReserve socketInit<>2');
    }

    function endFastReserve() {
        console.log('function newClose');
        releaseDoc(); 
    } 


    useEffect(() => {

        scrollToBottom();

        if (!Isocket.fastReserveDoc.initFn) {
            Isocket.fastReserveDoc.initFn = initFastReserve;
            console.log('initFastReserve<>1');
        }
 
        if (mySocket && !Isocket.fastReserveDoc.isActive && Isocket.fastReserveDoc.isReq) { 
 
                reserveDoc();  
            
            console.log('endFastReserve<>1');
            Isocket.fastReserveDoc.endFn = endFastReserve;
        } 

    }, [messages, mySocket]);




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

        newSocket.on("connect", () => {  
            addMethods(newSocket);   
        });  
    };



    function addMethods(socket) {

        if (!socket) { return window.alert(`❌ socket error`); } 
        setMySocket(socket);
        setMyUser({ ...myUser, socketID: socket.id });
        setMessages(msgs => [...msgs, 'Conectado como: ' + myUser.alias]); 
        setStylePanel({Wsize : 200, Hsize: 300}) 
        Isocket.isOn = true;
        Isocket.broadcastFn = fileSavedBroadcast; 
        // if (Isocket.fastReserveDoc.isReq) {
            
        // }   


        socket.on('docReserveRes', (res) => { 
            const succes = res.succes;
            const msg = res.message; 
            if (succes) { 
                setIsDocReserved(true);
                if (Isocket.fastReserveDoc.isReq) {
                    Isocket.fastReserveDoc.isActive = true;
                    console.log('isActive' );
                }  
                document.documentElement.style.setProperty('--line-anim-color', '#BA372D');
                return;
            } 
            setMessages(prevMsg => [...prevMsg, msg]);
        });  


        socket.on('releaseDocRes', (res) => {    
            console.log('releaseDocRes' );
            const succes = res.succes;
            const msg = res.message; 
            if (succes) { 
                setIsDocReserved(false);   
                if (Isocket.fastReserveDoc.isActive) {
                    Isocket.fastReserveDoc.isActive = false;  
                    Isocket.fastReserveDoc.isReq = false;  
                console.log('setIsDocReserved>>>>>>>>>>>>>>>>>>><<<<<<<x' );
                    socketOff();
                }
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
            console.log("disconnect Isocket", Isocket); 
            Isocket.isOn = false;
            Isocket.broadcastFn = null;
            // if (Isocket.fastReserveDoc.isReq) {
            //     Isocket.fastReserveDoc.isReq = false;
            //     Isocket.fastReserveDoc.isActive = false;
            //     Isocket.fastReserveDoc.initFn = null;
            //     Isocket.fastReserveDoc.endFn = null;
            //     console.log("isReq false" );  
            // }  
            setUsers([]);
            setMessages([]);
            setMySocket(null);     
            setStylePanel({Wsize : 200, Hsize: 80}) 
            document.documentElement.style.setProperty('--line-anim-color', 'lime');   

            setIsDocReserved(false); 
            console.log("disconnect$$");
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

            mySocket.disconnect();
            console.log("disconnected>><<<");
            
            // if (DocReserve.state === DocReserve.states.enabled) {
            //     const confirm = window.confirm('Su reserva será retirada ¿Quiere continuar?');
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


    const fileSavedBroadcast = () => {
        console.log("fileSavedBroadcast");
        console.log("fileSavedBroadcast", socketState._socket);
 
        if (socketState._socket?.connected) { 
            console.log("emit");
            socketState._socket.emit("comment", {msg: "ARCHIVO ACTUALIZADO"});
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

                                <button type="button" className="button sidebar" onClick={socketOff}>Desconectar</button>
                                {DocReserve.state === DocReserve.states.disabled && <button className="button sidebar" onClick={reserveDoc}>Reservar Doc.</button>}
                                {DocReserve.state === DocReserve.states.enabled && <button className="button sidebar" onClick={releaseDoc}>Liberar Doc.</button>}

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

