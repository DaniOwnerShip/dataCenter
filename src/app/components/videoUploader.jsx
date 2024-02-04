import { useState } from 'react';

import APIReport from "../apis/apiReport";

const VideoUploader = ({ blocksAreas, indexArea, setnVideos }) => {

    const videoMimes = ['video/mp4', 'video/webm', 'video/ogg'];

    const areaName = blocksAreas[indexArea].areaName;

    const [videoName, setVideoName] = useState('🔂 Seleccionar video');
    const [selectedVideo, setSelectedVideo] = useState(null);

    const [videosVisible, setVideosVisible] = useState(true);



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedVideo(file);
        setVideoName(e.target.files[0].name);
    };


    const showVideos = () => {
        setVideosVisible(!videosVisible);
    };



    const deleteVideo = (e, indexArea, url) => {
        e.preventDefault();
        const deleteVideo = window.confirm('¿BORRAR Video?');
        const indexUrl = blocksAreas[indexArea].urlVideos.findIndex((u) => u === url);

        if (deleteVideo && indexUrl !== -1) {
            const videoUrl = blocksAreas[indexArea].urlVideos[indexUrl];
            APIReport.deleteFile(videoUrl)
                .then(data => {
                    console.log("data", data);
                    blocksAreas[indexArea].urlVideos.splice(indexUrl, 1);
                    setnVideos(blocksAreas[indexArea].urlVideos?.length);
                    window.alert('✅ Video eliminado');
                })
                .catch((e) => { console.error(' BORRAR Video ' + e); });
        }

    };



    const handleUpload = async () => {
        if (!selectedVideo) { window.alert('SELECCIONA UN ARCHIVO'); return; }

        const formData = new FormData();
        formData.append('video', selectedVideo);

        try {
            const response = await fetch('http://localhost:3001/apiHs/uploadvideo', {
                method: 'POST',
                body: formData,
            });

            // Manejar la respuesta del servidor según sea necesario
            if (!response.ok) {
                throw new Error(`Error: ${response.status}, ${response.statusText}`);
            }

            const responseData = await response.json();
            //   return responseData;

            console.log('Respuesta del servidor:', responseData);
            const path = 'http://localhost:3001/';
            let videoURL;
            videoURL = path + responseData;
            blocksAreas[indexArea].urlVideos.push(videoURL);
            setnVideos(blocksAreas[indexArea].urlVideos?.length);
            setVideoName('🔂 Seleccionar video');
            window.alert('✅ Vídeo subido correctamente');


        } catch (error) {
            console.error('Error al subir el vídeo:', error);
        }
    };



    return (
        <div className="area-media-container">
            <div className="flex spacebtw mediaIO-bar">

                <div className="flex" >
                    <label htmlFor={`vi-${areaName}`} >
                        <p className="button-area-media">{videoName}</p>
                    </label>
                    <input id={`vi-${areaName}`} type="file" accept={videoMimes.join(',')} onChange={handleFileChange} />
                    <button id={`upv-${areaName}`} className="button-area-media" onClick={handleUpload}>⏏️ Subir Vídeo</button>
                </div>

                {blocksAreas[indexArea].urlVideos?.length > 0 && <div className="flex center">

                    <p>{blocksAreas[indexArea].urlVideos?.length} vídeo(s)</p>

                    <button id={`bvid-${areaName}`} className="button-area-media" onClick={showVideos}  >
                        {`${videosVisible ? "👁️ Ocultar" : "🔎 Mostrar"}`}
                    </button>

                </div>}


            </div>




            {videosVisible && <div className="media-items-container" >
                {blocksAreas[indexArea].urlVideos?.map((url, index) => (
                    <a href={url} target="_blank" rel="noopener noreferrer" key={`vid-${indexArea}-${index}`}>
                        <video
                            src={url}
                            alt={`vid-${indexArea}-${index}`}
                            className="media-item"
                            onContextMenu={(e) => deleteVideo(e, indexArea, url)}
                        />
                    </a>
                ))}

            </div>}



        </div>

    );
};

export default VideoUploader;
