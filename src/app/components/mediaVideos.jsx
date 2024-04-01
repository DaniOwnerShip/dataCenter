import { useState } from 'react';

// import FileApi from "../apis/fileApi"; 
import MediaAPI from '../apis/multimediaAPI.mjs';

export default function MediaVideo({ report, area, indexArea, setnVideos, isTemplate, isDocReserved }) {

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
    const docID = report[0].metaData.fileID;
    const checksum = report[0].metaData.checksum;
    const areaIndex = indexArea;

    const [mediaFile, setMediaFile] = useState(null);
    const [mediaName, setMediaName] = useState('🔂 Seleccionar');


    const videoSelection = (e) => {
        const file = e.target.files[0];
        setMediaFile(file);
        setMediaName(e.target.files[0].name);
    };



    const uploadVideo = (mediaType) => {

        if (checksum) {
            return window.alert(`⚠️ El archivo ${docID.split(".")[0]} está completado y no se puede editar`);
        }

        if (isTemplate) {
            return window.alert(`⚠️ No puede subir archivos si el documento aún no ha sido guardado`);
        }

        if (!mediaFile) { return window.alert('Selecciona un archivo'); }

        MediaAPI.mediaupload(mediaFile, mediaType, docID, areaIndex)
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

        // if (checksum) {
        //     return window.alert(`⚠️ El archivo ${docID.split(".")[0]} está completado y no se puede editar`);
        // }

        if (!isDocReserved) {
            return window.alert(`⚠️ No puede eliminar archivos si el documento no está reservado`);
        }

        const confirmDelete = window.confirm('¿BORRAR Video?');
        const indexUrl = urlVideos.findIndex((u) => u === url);

        if (confirmDelete && indexUrl !== -1) {
            const mediaURL = urlVideos[indexUrl];

            MediaAPI.mediaDeleteFile(docID, areaIndex, mediaType, mediaURL)
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


            <div className="media-items-container enabled" >

                {urlVideos?.map((url, index) => (

                    <figure key={`vid-${indexArea}-${index}`} className="media-figure" >

                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <video
                                src={url}
                                alt={`vid-${indexArea}-${index}`}
                                className="media-item"
                                onContextMenu={(e) => deleteVideo(e, url, 'video')}
                            />
                        </a>

                        <figcaption className="media-caption">{url.split('/')[5].split('_')[1]}</figcaption>

                    </figure>





                ))}

            </div>



        </>

    );


};

