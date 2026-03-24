import SocketAPI from "./socketAPI";
import { getApiBaseUrl, getAuthHeaders } from "./env";

export default class FileApi {
  static async downloadjson(fileName: string): Promise<{ data: any; fileType: string | null }> {
    const url = `${getApiBaseUrl()}/jsonAPI/downloadjson?fileName=${encodeURIComponent(fileName)}`;
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...getAuthHeaders(),
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(typeof data === "string" ? data : JSON.stringify(data));
    }

    const fileType = res.headers.get("X-File-Type");
    return { data, fileType };
  }

  static async saveJson(report: any, isNew: boolean): Promise<any | false> {
    if (!SocketAPI.socket.isOn) {
      window.alert("⚠️ Necesita reservar el documento");
      return false;
    }

    const fn = report[0].metaData.fileID.split(".")[0];
    const alertMsg = isNew
      ? `⚠️ El documento a guardar [ ${fn} ] ha sido marcado como 'COMPLETADO'. Si continúas, ya no será posible editarlo nunca más ⚠️ . ¿Continuar?`
      : `¿ Guardar el documento como: [ ${fn} ] ?`;

    if (!window.confirm(alertMsg)) return false;

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = `${getApiBaseUrl()}/jsonAPI/saveJson`;
    const options: RequestInit = {
      method: "POST",
      body: blob,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    };

    const res = await fetch(url, options);
    if (!res.ok) {
      const ct = res.headers.get("Content-Type");
      if (ct && ct.includes("application/json")) {
        const resData = await res.json();
        throw new Error(JSON.stringify(resData));
      }
      throw new Error(`${res.status}, ${res.statusText}`);
    }

    const resData = await res.json();
    SocketAPI.broadcast("Archivo Actualizado");
    return resData;
  }
}
