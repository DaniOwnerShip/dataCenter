import { useState } from 'react';

// import FileApi from "../apis/fileApi"; 
import MediaAPI from '../apis/multimediaAPI.mjs';

export default function MediaVideo({ report, area, indexArea, setnVideos }) {

    const videoMimes = [
        'video/mp4',         // .mp4
        'video/avi',         // .avi
        'video/mpeg',        // .mpeg, .mpg
        'video/quicktime',   // .mov
        'video/x-ms-wmv',    // .wmv
        'video/x-flv',       // .flv
        'video/x-matroska',  // .mkv
        'video/x-msvideo',   // .avi
        'video/x-ms-asf'     // .asf
    ]; 

    const idArea = area.areaName;
    const urlVideos = area.urlVideos;
    const docFileName = report[0].metaData.fileID;
    const areaIndex = indexArea;

    const [mediaFile, setMediaFile] = useState(null);
    const [mediaName, setMediaName] = useState('🔂 Seleccionar');


    const videoSelection = (e) => {
        const file = e.target.files[0];
        setMediaFile(file);
        setMediaName(e.target.files[0].name);
    };



    const uploadVideo = (mediaType) => { 

        if (!mediaFile) { return window.alert('Selecciona un archivo'); } 

        MediaAPI.mediaupload(mediaFile, mediaType, docFileName, areaIndex)
            .then(res => {
                console.log('res:', res);
                urlVideos.push(res.mediaURL);
                setnVideos(urlVideos.length);
                setMediaName('🔂 Seleccionar video');
                window.alert('✅ video subido');
            })
            .catch((e) => { window.alert(`❌ ${e.message}`); });
    };
  


    const deleteVideo = (e, url, mediaType) => {
        e.preventDefault();
        
        const deleteVideo = window.confirm('¿BORRAR Video?');
        const indexUrl = urlVideos.findIndex((u) => u === url);

        if (deleteVideo && indexUrl !== -1) {
            const mediaURL = urlVideos[indexUrl]; 

            MediaAPI.mediaDeleteFile(docFileName, areaIndex, mediaType, mediaURL)
                .then(res => {
                    console.log('res:', res);
                    urlVideos.splice(indexUrl, 1);
                    setnVideos(urlVideos.length); 
                    window.alert(`✅ ${res}`);  
                })
                .catch((e) => { window.alert(`❌ ${e.message}`); });
        }

    };



    return (
        <>
            <div className="flex spacebtw mediaIO-bar">

                <div className="flex" >

                    <label htmlFor={`vi-${idArea}`} >
                        <div className="button media">{mediaName}</div>
                    </label>

                    <input id={`vi-${idArea}`}
                        type="file"
                        accept={videoMimes.join(',')}
                        onChange={videoSelection}
                    />

                    <button
                        type="button"
                        id={`upv-${idArea}`}
                        className={`button media`}
                        onClick={() => uploadVideo('video')}>
                        ⏏️ Subir
                    </button>

                </div>


            </div>


            <div className="media-items-container" >
                {urlVideos?.map((url, index) => (
                    <a href={url} target="_blank" rel="noopener noreferrer" key={`vid-${indexArea}-${index}`}>
                        <video
                            src={url}
                            alt={`vid-${indexArea}-${index}`}
                            className="media-item"
                            onContextMenu={(e) => deleteVideo(e, url, 'video')}
                        />
                    </a>
                ))}

            </div>



        </>

    );


};

