import { io } from "socket.io-client";

export default class SocketAPI {


    static socket = {
        isOn: false,
        mySocket: null
    };

    static broadcast(msg) {
        SocketAPI.socket.mySocket.emit("comment", { msg: msg });
        SocketAPI.disconnect(SocketAPI.socket.mySocket);
    }


    static async connect(userAlias) {

        const connection = await new Promise(function (resolve, reject) {

            if (SocketAPI.socket.isOn) {
                reject("ya hay una conexión activa");
                return null;
            }

            // const newSocket = io("http://192.168.1.100:3001", {
            // const newSocket = io("http://localhost:3001", {
            const newSocket = io("http://10.172.1.19:3001", {
                query: {
                    userAlias: userAlias
                }
            });


            newSocket.on("connect", () => {
                SocketAPI.socket.isOn = true;
                SocketAPI.socket.mySocket = newSocket;
                resolve(newSocket);
            });

        });

        return connection;
    };



    static disconnect = (_socket) => {
        if (_socket?.connected) {
            SocketAPI.socket.isOn = false;
            _socket.disconnect();
            return true;
        }
        else {
            return false;
        }
    };

}

