
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
            console.log('isTemplate', fileType);
            if (fileType === 'template') {

                console.log('isTemplate1zzzzz', fileType);
              } else {

                console.log('isTemplate2', fileType);
              }

            // const modDate = res.headers.get('last-modified'); 

            return {data, fileType};

        }
        catch (e) {
            throw e;
        }
    }

 
//falta  validar el metadata en el servidor 

    static async saveJson(report, spot, isNew) { 
        
        if (!SocketAPI.socket.isOn) {
            window.alert('⚠️ Necesita reservar el documento');
            return false;
        }

        try {

            // const dateNow = new Date();
            // const hours = dateNow.getHours();    
            // const isDay =  hours > 7 && hours < 19? true: false;  
            const _fileName =  report[0].metaData.fileID ;
            const _dayDate =  report[0].metaData.dayDate ;
            const _checksum =  report[0].metaData.checksum ;
            const _tittle =  report[0].metaData.tittle ;
            // report[0].metaData.fileID = fileName;   
            // report[0].metaData.dayDate = dayDate;   
            
            // isDay ? report[0].metaData.DayNight = 'Día' : report[0].metaData.DayNight = 'Noche';   

        console.log('_fileName', _fileName);
        console.log('_dayDate', _dayDate);
        console.log('_checksum', _checksum);
        console.log('_tittle', _tittle);

   
            // if (hours < 7) {
            //     dateNow.setDate(dateNow.getDate() - 1);
            // }            

        // if (_checksum) {
            
        // }



            // const dateFormat = dateNow.toLocaleDateString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit' }); 
            // const dayDate = dateFormat.replace(/\//g, '-');
            // const docname =  `informe_${place}_${dayDate}`;
            // const fileName = `${docname}.json`;
console.log('fileNamezzzzzzzzzzzzz', _fileName);
 
            const alertMsg = isNew?`⚠️ El documento a guardar [ ${_fileName} ] ha sido marcado como 'COMPLETADO'. Si continúas, ya no será posible editarlo nunca más ⚠️ . ¿Continuar?`:
            `Guardar el documento como: [ ${_fileName} ] ¿continuar?`;


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
  
            SocketAPI.broadcast("Archivo Actualizado"); 

            return resData;

        }
        catch (e) {
            throw e;
        }
    }
 

}


 
