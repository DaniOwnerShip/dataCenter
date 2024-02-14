
import { io } from "socket.io-client";
import { useState, useContext } from "react";
import { ContextData } from '../pages/handshake/context';

function reserveDocHandler() {
    console.log('reserveDocHandler:');
}

function checkReserveDoc() {
    console.log('reserveDocHandler:');
}


// Acceder a los valores del contexto checkShocket
// socket.on("connect", () => {
//     console.log(socket.connected); // true
// });

// engine.once("upgrade", () => {
//     // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
//     console.log(engine.transport.name); // in most cases, prints "websocket"
// });
// let socket;
// const engine = newsocket.io.engine;
// console.log(engine.transport.name);   



export default function ShocketInterface({ fileID }) {

    const { contextIsReserved, setContextIsReserved } = useContext(ContextData);
    // console.log("useContext(ContextData)", useContext(ContextData));
    const [clientShocket, setClientShocket] = useState();

    const [messages, setMessages] = useState([]);

    const [users, setUsers] = useState();

    const [windowSocket, setWindowSocket] = useState(false);

    const [comment, setComment] = useState('');

    const handleTextareaChange = (e) => {
        setComment(e.target.value);
    };

    const sendText = () => {
        console.log('sendText: ', comment);
        clientShocket.emit("comment", comment);
        setComment('');
    };








    function reserveDoc() {

        const newsocket = io("http://192.168.1.100:3001");

        newsocket.on("connect", () => {

            console.log("Conexión WebSocket OK");
            setClientShocket(newsocket);
            setWindowSocket(true);

            newsocket.emit("reserveDoc",  { isReserved: 'required', docId: fileID, userIP: '' });

            newsocket.on('broadcast__DocStatus', (data) => {
                console.log('broadcast__DocStatus:', data);
                setMessages(prevMessages => [...prevMessages, data.message]);
                if (data.status) {
                    const reserveDoc = { isReserved: 'enabled', docId: fileID, userIP: '' };
                    setContextIsReserved(reserveDoc);
                    console.log('reserveDoc:' ); 
                }
                // reserveDocHandler();
                // Realizar acciones apropiadas en respuesta al evento recibido
            });

            newsocket.on('comment', (data) => {
                console.log('comment:', data);
                setMessages(prevMessages => [...prevMessages, data]);
            });

            newsocket.on('users', (users) => {
                console.log('users:', users);
                // setUsers(prevUsers => [...prevUsers, users]);
                setUsers(users);
            });

        });


    };


    const socketOff = () => {
        // console.log("isReserved", contextDoc);
        // Verificar si la conexión está activa
        if (clientShocket?.connected) {

            console.log("desconectando...");
            clientShocket.disconnect();

            setUsers([]);
            setMessages([]);
            setWindowSocket(false);
            // const isReserved = useContext(contextIsReservedDoc.value); 
            const reserveDoc = { isReserved: 'disabled', docId: '', userIP: '' };
            setContextIsReserved(reserveDoc);
            // socket.on("disconnect", () => {
            //     console.log("Desconectado del servidor WebSocket");
            // });

        } else {
            console.log("La conexión está inactiva.");
        }
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


    return (

        <div className="socket-container">

            <button className="button" onClick={reserveDoc}>ReservarDoc</button>
            <button className="button" onClick={socketOff}>socketOff</button>



           {windowSocket && <div className="flex">

                <div className="socketmsg-users">
                    <p>users: </p>
                    {users?.map((user, index) => (
                        <p key={`user-${index}`}>🧑‍💻 {user}  </p>

                    ))}

                </div>

                <div className="socketmsg">

                    <p>Mensajes Recibidos</p>
                    <ul className="socketListmsg">
                        {messages.map((message, index) => (
                            <li key={`li-${index}`}>{message}</li>
                        ))}
                    </ul>

                    <textarea
                        placeholder="Comentarios"
                        value={comment}
                        onChange={handleTextareaChange}
                    ></textarea>
                    <button className="button" onClick={sendText}>sendText</button>

                </div>

            </div>}

        </div>
    );
}