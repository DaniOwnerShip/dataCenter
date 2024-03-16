import { useState } from 'react';

import FileApi from "../apis/fileApi"; 

export default function MediaAudio({ area, indexArea, setnAudios }) {

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


    const idArea = area.areaName;
    const audios = area.urlAudios;
    const [audioName, setAudioName] = useState('🔂 Seleccionar');
    const [selectedAudio, setSelectedAudio] = useState(null); 


    const audioSelection = (e) => {
        const file = e.target.files[0];
        setSelectedAudio(file);
        setAudioName(e.target.files[0].name);
    };

 

    const uploadAudio = async () => {

        if (!selectedAudio) { window.alert('SELECCIONA UN ARCHIVO'); return; }

        const formData = new FormData();
        formData.append('audio', selectedAudio);

        const path = 'http://localhost:3001/';
        let audioURL;

        FileApi.uploadAudio(formData)
            .then(res => {
                audioURL = path + res;
                audios.push(audioURL);
                setnVideos(audios?.length);
                setAudioName('🔂 Seleccionar audio');
                window.alert('✅ Audio subido correctamente');
            })
            .catch((e) => { window.alert(`❌ ${e.message}`); });
    };



    const deleteAudio = (e, url) => {
        e.preventDefault();
        const deleteAudio = window.confirm('¿BORRAR AUDIO?');
        const indexUrl = audios.findIndex((u) => u === url);

        if (deleteAudio && indexUrl !== -1) {
            const audioUrl = audios[indexUrl];

            FileApi.deleteFile(audioUrl)
                .then(res => {
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

                    <label htmlFor={`vi-${idArea}`} >
                        <div className="button media">{audioName}</div>
                    </label>

                    <input id={`vi-${idArea}`}
                        type="file"
                        accept={audioMimes.join(',')}
                        onChange={audioSelection}
                    />

                    <button type="button"
                        id={`upv-${idArea}`}
                        className={`button media`}
                        onClick={uploadAudio}>
                        ⏏️ Subir
                    </button>

                </div> 


            </div>



            <div className="media-items-container" >
                {audios?.map((url, index) => ( 
                        <audio controls src={url} key={`aud-${indexArea}-${index}`}
                        onContextMenu={(e) => deleteAudio(e, url)}></audio>  
                ))}
            </div>



        </>

    );


};

