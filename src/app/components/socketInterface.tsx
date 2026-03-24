import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import type { Socket } from "socket.io-client";
import SocketAPI from "../apis/socketAPI";
import "../styles/animation.css";
import type { ReportDocument } from "@/types/report";

type Props = {
  report: ReportDocument;
  callback: (isDocReserve: boolean, isFast: boolean) => void;
  isDocReserved: boolean;
};

type UserOn = { userAlias: string };

export default function SocketInterface({ report, callback, isDocReserved }: Props) {
  const docID = report[0].metaData.fileID;
  const [messages, setMessages] = useState<string[]>([]);
  const [myUser, setMyUser] = useState({ alias: "usuario", socketID: "" });
  const [users, setUsers] = useState<UserOn[]>([]);
  const [comment, setComment] = useState("");
  const [mySocket, setMySocket] = useState<Socket | null>(null);
  const socketRef = useRef<HTMLDivElement>(null);
  const lastMsgRef = useRef<HTMLUListElement>(null);
  const [isDisableDragg, setIsDisableDragg] = useState(true);
  const [windowStyle, setWindowStyle] = useState({ isDraggable: "", isDragging: "" });
  const [stylePanel, setStylePanel] = useState({ Wsize: 200, Hsize: 70 });

  const addEvents = (newSocket: Socket) => {
    newSocket.on("comment", (commentPayload: { user: string; msg: string }) => {
      setMessages((prevMsg) => [...prevMsg, `${commentPayload.user}-> ${commentPayload.msg}`]);
    });
    newSocket.on("usersOn", (usersOn: UserOn[]) => setUsers(usersOn));
    newSocket.on("docReserveRes", (res: { succes: boolean; message: string }) => {
      if (res.succes) {
        callback(true, false);
        document.documentElement.style.setProperty("--line-anim-color", "#BA372D");
      }
      setMessages((prevMsg) => [...prevMsg, res.message]);
    });
    newSocket.on("releaseDocRes", (res: { succes: boolean; message: string }) => {
      if (res.succes) {
        callback(false, false);
        document.documentElement.style.setProperty("--line-anim-color", "lime");
      }
      setMessages((prevMsg) => [...prevMsg, res.message]);
    });
    newSocket.on("disconnect", () => {
      setUsers([]);
      setMessages([]);
      setMySocket(null);
      setStylePanel({ Wsize: 200, Hsize: 80 });
      document.documentElement.style.setProperty("--line-anim-color", "lime");
    });
  };

  const connectSocket = () => {
    SocketAPI.connect(myUser.alias)
      .then((newSocket) => {
        setMySocket(newSocket);
        setMessages((msgs) => [...msgs, `Conectado como: ${myUser.alias}`]);
        addEvents(newSocket);
        newSocket.emit("userReq");
        setStylePanel({ Wsize: 200, Hsize: 300 });
      })
      .catch((err) => window.alert(`❌ ${String(err)}`));
  };

  useEffect(() => {
    if (lastMsgRef.current) lastMsgRef.current.scrollTop = lastMsgRef.current.scrollHeight;
  }, [messages]);

  return (
    <Draggable nodeRef={socketRef} disabled={isDisableDragg}>
      <div ref={socketRef} className={`socket-interface ${Object.values(windowStyle).join(" ")}`}>
        <ResizableBox width={stylePanel.Wsize} height={stylePanel.Hsize} minConstraints={[150, 50]}>
          <div>
            <button
              type="button"
              className="button"
              onClick={() => {
                setIsDisableDragg((v) => !v);
                setWindowStyle((style) => ({ ...style, isDraggable: isDisableDragg ? "isDraggable" : "" }));
              }}
            >
              {isDisableDragg ? "📍" : "📌"}
            </button>

            {!mySocket && (
              <>
                <button className="button sidebar" onClick={connectSocket}>
                  Conectar como:
                </button>
                <input type="text" className="input-socket" placeholder="nombre" onChange={(e) => setMyUser({ ...myUser, alias: e.target.value })} value={myUser.alias} />
              </>
            )}

            {mySocket && (
              <>
                <div className="lineAnim-background"></div>
                <div className="lineAnim"></div>
                <button type="button" className="button sidebar" onClick={() => (SocketAPI.disconnect(mySocket) ? null : window.alert("conexión inactiva"))}>
                  Desconectar
                </button>
                {!isDocReserved && (
                  <button className="button sidebar" onClick={() => (mySocket.connected ? mySocket.emit("docReserveReq", docID) : window.alert("conexión inactiva"))}>
                    Reservar Doc.
                  </button>
                )}
                {isDocReserved && (
                  <button className="button sidebar" onClick={() => (mySocket.connected ? mySocket.emit("releaseDocReq", docID) : window.alert("conexión inactiva"))}>
                    Liberar Doc.
                  </button>
                )}
                <div className="flex column socket-container">
                  <div className="socket-box">
                    {`Usuarios conectados (${users.length}) :`}
                    <ul className="socket-list" ref={lastMsgRef}>
                      {users?.map((user, index) => (
                        <li key={`user-${index}`}>{`🧑‍💻${user.userAlias}`}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="socket-box">
                    {`Mensajes Recibidos (${messages.length}) :`}
                    <ul className="socket-list" ref={lastMsgRef}>
                      {messages.map((msg, index) => (
                        <li key={`msg-${index}`}>{msg}</li>
                      ))}
                    </ul>
                    <textarea className="textarea-socket" placeholder="comentario" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <button
                      type="button"
                      className="button sidebar"
                      onClick={() => {
                        mySocket.emit("comment", { msg: comment });
                        setComment("");
                      }}
                    >
                      enviar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
}
