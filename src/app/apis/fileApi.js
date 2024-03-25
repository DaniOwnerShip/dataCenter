
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
            const resData = await res.json();

            if (!res.ok) {  
                throw new Error(resData); 
            }

            // const modDate = res.headers.get('last-modified'); 

            return resData;

        }
        catch (e) {
            throw e;
        }
    }

 
//falta  validar el metadata en el servidor 

    static async saveJson(report, place, isNew) { 
        
        if (!SocketAPI.socket.isOn) {
            window.alert('⚠️ Necesita reservar el documento');
            return false;
        }

        try {

            const dateNow = new Date();
            const hours = dateNow.getHours();    

            if (hours < 7) {
                dateNow.setDate(dateNow.getDate() - 1);
            }            

            const dateFormat = dateNow.toLocaleDateString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit' }); 
            const docname =  `informe-${place}-${dateFormat.replace(/\//g, '-')}`;
            const fileName = `${docname}.json`;

            const isDay =  hours > 7 && hours < 19? true: false;   

            const nameDoc = `${docname} ${isDay ? '☀️' : '🌙'}`
            const alertMsg = isNew?`El documento a guardar [ ${nameDoc} ] ha sido marcado como 'COMPLETADO'. Si continúas, ya no será posible editarlo. ¿Continuar?`:
            `Guardar el documento como: [ ${nameDoc} ] ¿continuar?`;


            if (!window.confirm(alertMsg)) { 
                return false;
            }  

            report[0].metaData.fileID = fileName;   
            isDay ? report[0].metaData.DayNight = 'Día' : report[0].metaData.DayNight = 'Noche';   

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
  
            SocketAPI.broadcast("Archivo Actualizado"); 

            return resData;

        }
        catch (e) {
            throw e;
        }
    }
 

}


 
