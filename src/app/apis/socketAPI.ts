import { io, type Socket } from "socket.io-client";
import { getApiBaseUrl, getApiToken } from "./env";

type ManagedSocket = {
  isOn: boolean;
  mySocket: Socket | null;
};

export default class SocketAPI {
  static socket: ManagedSocket = {
    isOn: false,
    mySocket: null,
  };

  static broadcast(msg: string): void {
    SocketAPI.socket.mySocket?.emit("comment", { msg });
    SocketAPI.disconnect(SocketAPI.socket.mySocket);
  }

  static async connect(userAlias: string): Promise<Socket> {
    const connection = await new Promise<Socket>((resolve, reject) => {
      if (SocketAPI.socket.isOn) {
        reject(new Error("ya hay una conexión activa"));
        return;
      }

      const newSocket = io(getApiBaseUrl(), {
        query: { userAlias },
        auth: { token: getApiToken() },
      });

      newSocket.on("connect", () => {
        SocketAPI.socket.isOn = true;
        SocketAPI.socket.mySocket = newSocket;
        resolve(newSocket);
      });

      newSocket.on("connect_error", (error) => {
        reject(error);
      });
    });

    return connection;
  }

  static disconnect = (_socket: Socket | null | undefined): boolean => {
    if (_socket?.connected) {
      SocketAPI.socket.isOn = false;
      _socket.disconnect();
      return true;
    }
    return false;
  };
}
