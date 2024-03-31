
import SocketAPI from "./socketAPI";


export default class FileApi {

    static async downloadjson(fileName) {

        try {

            // const url = `http://192.168.1.100:3001/jsonAPI/downloadjson?fileName=${fileName}`;
            const url = `http://localhost:3001/jsonAPI/downloadjson?fileName=${fileName}`;

            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

            const res = await fetch(url, options);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data);
            }
            const fileType = res.headers.get('X-File-Type'); 

            return { data, fileType };

        }
        catch (e) {
            throw e;
        }
    }


    //falta  validar el metadata en el servidor 

    static async saveJson(report, isNew) {

        if (!SocketAPI.socket.isOn) {
            window.alert('⚠️ Necesita reservar el documento');
            return false;
        }

        try {

            const fn = report[0].metaData.fileID.split('.')[0];

            const alertMsg = isNew ? `⚠️ El documento a guardar [ ${fn} ] ha sido marcado como 'COMPLETADO'. Si continúas, ya no será posible editarlo nunca más ⚠️ . ¿Continuar?` :
                `¿ Guardar el documento como: [ ${fn} ] ?`;


            if (!window.confirm(alertMsg)) {
                return false;
            }


            const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json", });

            // const url = 'http://192.168.1.100:3001/jsonAPI/saveJson';
            const url = 'http://localhost:3001/jsonAPI/saveJson';

            const options = {
                method: 'POST',
                body: blob,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await fetch(url, options)

            if (!res.ok) {

                const ct = res.headers.get('Content-Type');

                if (ct && ct.includes('application/json')) {
                    const resData = await res.json();
                    throw new Error(JSON.stringify(resData));
                }

                throw new Error(`${res.status}, ${res.statusText}`);

            }

            const resData = await res.json();

            SocketAPI.broadcast("Archivo Actualizado"); //rev

            return resData;

        }
        catch (e) {
            throw e;
        }
    }


}



