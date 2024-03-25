

import { useState, useRef, useEffect } from "react";
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';

import SocketAPI from "../apis/socketAPI";

import "../styles/animation.css"



export default function SocketInterface({ report, callback, isDocReserved }) {

    const docID = report[0].metaData.fileID; 

    const [messages, setMessages] = useState([]);
    const [myUser, setMyUser] = useState({ "alias": 'usuario', "socketID": "" });
    const [users, setUsers] = useState([]);
    const [comment, setComment] = useState('');
    const [mySocket, setMySocket] = useState();

    const socketRef = useRef(null);
    const lastMsgRef = useRef(null);
    const [isDisableDragg, setIsDisableDragg] = useState(true);
    const [windowStyle, setWindowStyle] = useState({ isDraggable: '', isDragging: '' });
    const [stylePanel, setStylePanel] = useState({ Wsize: 200, Hsize: 80 });



    const connectSocket = () => {
        SocketAPI.connect(myUser.alias)
            .then((newSocket) => {
                setMySocket(newSocket);
                setMessages(msgs => [...msgs, 'Conectado como: ' + myUser.alias]);
                addEvents(newSocket); 
                newSocket.emit("userReq");
                setStylePanel({ Wsize: 200, Hsize: 300 }) 
            })
            .catch(err => { window.alert(`❌ ${err}`); });
    }



    const addEvents = (newSocket) => {

        newSocket.on('comment', (comment) => {
            setMessages(prevMsg => [...prevMsg, `${comment.user}-> ${comment.msg}`]);
        });

        newSocket.on('usersOn', (usersOn) => {
            console.log('usersOn22',usersOn);
            setUsers(usersOn);
        });

        newSocket.on('docReserveRes', (res) => {
            const msg = res.message; 
            if (res.succes) {
                callback(true, false);
                document.documentElement.style.setProperty('--line-anim-color', '#BA372D'); 
            }
            setMessages(prevMsg => [...prevMsg, msg]);
        });

        newSocket.on('releaseDocRes', (res) => {
            const msg = res.message; 
            if (res.succes) {
                callback(false, false);
                document.documentElement.style.setProperty('--line-anim-color', 'lime');
            }
            setMessages(prevMsg => [...prevMsg, msg]);
        });

        newSocket.on("disconnect", () => {
            setUsers([]);
            setMessages([]);
            setMySocket(null);
            setStylePanel({ Wsize: 200, Hsize: 80 })
            document.documentElement.style.setProperty('--line-anim-color', 'lime');
        });

    }

 

    useEffect(() => {
        scrollToBottom();
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

    const sendComment = () => {
        mySocket.emit("comment", { msg: comment });
        setComment('');
    };  

    const reserveDoc = () => {
        if (report[0].metaData.checksum) {
           return window.alert(`⚠️ El archivo ${docID} está completado y no se puede editar`);
        }
        mySocket.connected ? mySocket.emit("docReserveReq", docID) : window.alert("conexión inactiva");
    };


    const releaseDoc = () => {
        mySocket.connected ? mySocket.emit("releaseDocReq", docID) : window.alert("conexión inactiva");
    };

    const disconnectSocket = () => {
        SocketAPI.disconnect(mySocket) ? null : window.alert("conexión inactiva"); 
    };
   


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
                                <button className="button sidebar" onClick={connectSocket}>Conectar como:</button>
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

                                <button type="button" className="button sidebar" onClick={() => disconnectSocket(mySocket)}>Desconectar</button>
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

                                    {`Mensajes Recibidos (${messages.length}) :`}

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





