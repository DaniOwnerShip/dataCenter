import { useState } from "react";
import type { Socket } from "socket.io-client";
import SocketAPI from "../apis/socketAPI";

type Props = {
  docID: string;
  callback: (isDocReserve: boolean, isFast: boolean) => void;
};

export default function SocketFastReq({ docID, callback }: Props) {
  const [mySocket, setMySocket] = useState<Socket | null>(null);

  const addEvents = (newSocket: Socket) => {
    newSocket.on("docReserveRes", (res: { succes: boolean; message: string }) => {
      const succes = res.succes;
      const msg = res.message;
      if (succes) {
        callback(true, true);
        window.alert(`✅ ${msg}`);
      } else {
        SocketAPI.disconnect(newSocket);
        window.alert(msg);
      }
    });

    newSocket.on("disconnect", () => {
      callback(false, false);
      setMySocket(null);
    });
  };

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
      .catch((err) => {
        window.alert(`❌ ${String(err)}`);
      });
  };

  return (
    <button title="reserva rápida" type="button" className="button" onClick={connectSocket}>
      {`${mySocket ? "📖" : "🗝️"}`}
    </button>
  );
}
