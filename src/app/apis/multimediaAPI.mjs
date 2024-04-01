
function checkMediaSize(mediaType, mediaFile) {

    const sizes = { image: 100000000, video: 300000000, audio: 100000000 }

    switch (mediaType) {
        case "image":
            if (mediaFile.size > sizes.image) {
                window.alert(`❌ Imagen superior a ${sizes.image / 1000000} MB`);
                return false;
            }
            break;
        case "video":
            if (mediaFile.size > sizes.video) {
                window.alert(`❌ video superior a ${sizes.video / 1000000} MB`);
                return false;
            }
            break;
        case "audio":
            if (mediaFile.size > sizes.audio) {
                window.alert(`❌ audio superior a ${sizes.audio / 1000000} MB`);
                return false;
            }
            break;
        default:
            return window.alert(`❌ error media`);
    }
    return true;
}




export default class MediaAPI {


    static async mediaupload(mediaFile, mediaType, docFileName, areaIndex) {

        const formData = new FormData();
        formData.append('mediaFile', mediaFile);
        formData.append('mediaType', mediaType);
        formData.append('docFileName', docFileName);
        formData.append('areaIndex', areaIndex);

        console.log('mediaupload');
        
        // const url = `http://localhost:3001/multimediaAPI/mediaupload`;
        const url = `http://10.172.1.19:3001/multimediaAPI/mediaupload`;

        console.log('typeFile:', mediaType);
        console.log('url:', url);

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}, ${res.statusText}`);
            }

            const resData = await res.json();
            return resData;
        }

        catch (e) {
            throw e;
        }
    }



    static async mediaDeleteFile(docFileName, areaIndex, mediaType, mediaURL) {

        console.log("mediaDeleteFile"  );

        try {

            const df = encodeURIComponent(docFileName);
            const ai = encodeURIComponent(areaIndex);
            const murl = encodeURIComponent(mediaURL);

            // const url = `http://localhost:3001/multimediaAPI/mediadelete?docFileName=${df}&areaIndex=${ai}&mediaType=${mediaType}&mediaURL=${murl}`;
            const url = `http://10.172.1.19:3001/multimediaAPI/mediadelete?docFileName=${df}&areaIndex=${ai}&mediaType=${mediaType}&mediaURL=${murl}`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`delete-image Error: ${res.status}, ${res.statusText}`);
            }

            const data = await res.json();
            return data;
        }

        catch (e) {
            throw e;
        }
    }




}