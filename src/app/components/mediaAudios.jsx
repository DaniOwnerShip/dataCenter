import { useState } from 'react';

import FileApi from "../apis/fileApi";
import MediaAPI from '../apis/multimediaAPI.mjs';

export default function MediaAudio({ report, area, indexArea, setnAudios, isTemplate, isDocReserved }) {

    const audioMimes = [
        'audio/mpeg',        // .mp3
        'audio/wav',         // .wav
        'audio/x-ms-wma',    // .wma
        'audio/vnd.rn-realaudio', // .ra, .ram
        'audio/ogg',         // .ogg
        'audio/aac',         // .aac
        'audio/flac',        // .flac
        'audio/x-matroska',  // .mka
        'audio/x-aiff',      // .aif, .aiff
        'audio/midi',        // .mid, .midi
        'audio/x-ms-asf'     // .asf
    ];


    const areaId = area.areaName;
    const audios = area.urlAudios;
    const docID = report[0].metaData.fileID;
    const checksum = report[0].metaData.checksum;
    const areaIndex = indexArea;

    const [mediaFile, setMediaFile] = useState(null);
    const [mediaName, setMediaName] = useState('🔂 Seleccionar');


    const audioSelection = (e) => {
        const file = e.target.files[0];
        setMediaFile(file);
        setMediaName(e.target.files[0].name);
    };



    const uploadAudio = async (mediaType) => {

        if (checksum) {
            return window.alert(`⚠️ El archivo ${docID.split(".")[0]} está completado y no se puede editar`);
        }

        if (isTemplate) {
            return window.alert(`⚠️ No puede subir archivos si el documento no ha sido guardado`);
        }

        if (!mediaFile) { return window.alert('Selecciona un archivo'); }

        MediaAPI.mediaupload(mediaFile, mediaType, docID, areaIndex)
            .then(res => {
                console.log('res:', res);
                audios.push(res.mediaURL);
                setnAudios(audios.length);
                setMediaName('🔂 Seleccionar audio');
                window.alert('✅ Audio subido');
            })
            .catch((e) => { window.alert(`❌ ${e.message}`); });

    };



    const deleteAudio = (e, url, mediaType) => {
        e.preventDefault();
 

        if (!isDocReserved) {
            return window.alert(`⚠️ No puede eliminar archivos si el documento no está reservado`);
        }

        const confirmDelete = window.confirm('¿BORRAR AUDIO?');
        const indexUrl = audios.findIndex((u) => u === url);

        if (confirmDelete && indexUrl !== -1) {

            const mediaURL = audios[indexUrl];

            MediaAPI.mediaDeleteFile(docID, areaIndex, mediaType, mediaURL)
                .then(res => {
                    console.log('res:', res);
                    audios.splice(indexUrl, 1);
                    setnAudios(audios?.length);
                    window.alert(`✅ ${res}`);
                })
                .catch((e) => { window.alert(`❌ ${e.message}`); });
        }

    };





    return (
        <>
            <div className="flex spacebtw mediaIO-bar">
                <div className="flex" >

                    <label htmlFor={`vi-${areaId}`} >
                        <div className="button media">{mediaName}</div>
                    </label>

                    <input id={`vi-${areaId}`}
                        type="file"
                        accept={audioMimes.join(',')}
                        onChange={audioSelection}
                    />

                    <button type="button"
                        id={`upv-${areaId}`}
                        className="button media"
                        onClick={() => uploadAudio('audio')}>
                        ⏏️ Subir
                    </button>

                </div>


            </div>



            <div className="media-items-container enabled" >

                {audios?.map((url, index) => (

                    <figure className="media-figure" key={`aud-${indexArea}-${index}`}>
                        <audio controls
                            src={url}
                            onContextMenu={(e) => deleteAudio(e, url, 'audio')}
                            className="media-audio">
                        </audio>
                        <figcaption className="media-caption">{url.split('/')[5].split('_')[1]}</figcaption>
                    </figure>
                ))}

            </div>



        </>

    );


};

