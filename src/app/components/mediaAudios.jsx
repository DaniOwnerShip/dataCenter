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


    // const idArea = area.areaName;
    // const videos = area.urlVideos;
    // const [videoName, setVideoName] = useState('🔂 Seleccionar');
    // const [selectedVideo, setSelectedVideo] = useState(null); 


    // const audioSelection = (e) => {
    //     const file = e.target.files[0];
    //     setSelectedVideo(file);
    //     setVideoName(e.target.files[0].name);
    // };

 

    // const uploadVideo = async () => {

    //     if (!selectedVideo) { window.alert('SELECCIONA UN ARCHIVO'); return; }

    //     const formData = new FormData();
    //     formData.append('video', selectedVideo);

    //     const path = 'http://localhost:3001/';
    //     let videoURL;

    //     FileApi.uploadVideo(formData)
    //         .then(res => {
    //             videoURL = path + res;
    //             videos.push(videoURL);
    //             setnVideos(videos?.length);
    //             setVideoName('🔂 Seleccionar video');
    //             window.alert('✅ Vídeo subido correctamente');
    //         })
    //         .catch((e) => { window.alert(`❌ ${e.message}`); });
    // };



    // const deleteVideo = (e, url) => {
    //     e.preventDefault();
    //     const deleteVideo = window.confirm('¿BORRAR Video?');
    //     const indexUrl = videos.findIndex((u) => u === url);

    //     if (deleteVideo && indexUrl !== -1) {
    //         const videoUrl = videos[indexUrl];

    //         FileApi.deleteFile(videoUrl)
    //             .then(res => {
    //                 videos.splice(indexUrl, 1);
    //                 setnVideos(videos?.length);
    //                 window.alert(`✅ ${res}`);
    //             })
    //             .catch((e) => { window.alert(`❌ ${e.message}`); });
    //     }

    // };



    return (
        <>
            <div className="flex spacebtw mediaIO-bar">
UNDER CONSTRUCTION
                {/* <div className="flex" >

                    <label htmlFor={`vi-${idArea}`} >
                        <div className="button media">{videoName}</div>
                    </label>

                    <input id={`vi-${idArea}`}
                        type="file"
                        accept={videoMimes.join(',')}
                        onChange={videoSelection}
                    />

                    <button type="button"
                        id={`upv-${idArea}`}
                        className={`button media`}
                        onClick={uploadVideo}>
                        ⏏️ Subir
                    </button>

                </div>  */}


            </div>


 
            {/* <div className="media-items-container" >
                {videos?.map((url, index) => (
                    <a href={url} target="_blank" rel="noopener noreferrer" key={`vid-${indexArea}-${index}`}>
                        <video
                            src={url}
                            alt={`vid-${indexArea}-${index}`}
                            className="media-item"
                            onContextMenu={(e) => deleteVideo(e, indexArea, url)}
                        />
                    </a>
                ))} 
            </div> */}



        </>

    );


};

