import { useState } from 'react';

import APIReport from "../apis/apiReport";

const VideoUploader = ({ area, indexArea, setnVideos, isEnableDoc }) => {

    const videoMimes = ['video/mp4', 'video/webm', 'video/ogg'];
    const areaName = area.areaName;
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


    const uploadVideo = async () => {

        if (!selectedVideo) { window.alert('SELECCIONA UN ARCHIVO'); return; }

        const formData = new FormData();
        formData.append('video', selectedVideo);

        const path = 'http://localhost:3001/';
        let videoURL;

        APIReport.uploadVideo(formData)
            .then(res => {
                videoURL = path + res;
                area.urlVideos.push(videoURL);
                setnVideos(area.urlVideos?.length);
                setVideoName('🔂 Seleccionar video');
                window.alert('✅ Vídeo subido correctamente');
            })
            .catch((e) => { window.alert(`❌ ${e.message}`); });
    };



    const deleteVideo = (e, url) => {
        e.preventDefault();
        const deleteVideo = window.confirm('¿BORRAR Video?');
        const indexUrl = area.urlVideos.findIndex((u) => u === url);

        if (deleteVideo && indexUrl !== -1) {
            const videoUrl = area.urlVideos[indexUrl];

            APIReport.deleteFile(videoUrl)
                .then(res => {
                    area.urlVideos.splice(indexUrl, 1);
                    setnVideos(area.urlVideos?.length);
                    window.alert(`✅ ${res}`);
                })
                .catch((e) => { window.alert(`❌ ${e.message}`); });
        }

    };



    return (

        <>

            <div className="flex spacebtw mediaIO-bar">

                <div className="flex" >
                    <label htmlFor={`vi-${areaName}`} >
                        <p className="button-area-media">{videoName}</p>
                    </label>
                    <input id={`vi-${areaName}`} type="file" accept={videoMimes.join(',')} onChange={handleFileChange} />
                    <button
                        id={`upv-${areaName}`} 
                        className= {`button-area-media ${isEnableDoc}`}
                        onClick={uploadVideo}>
                        ⏏️ Subir Vídeo
                    </button>
                </div>


                {area.urlVideos?.length > 0 && <div className="flex center">

                    <p>{area.urlVideos?.length} vídeo(s)</p>

                    <button id={`bvid-${areaName}`} className="button-area-media" onClick={showVideos}  >
                        {`${videosVisible ? "👁️ Ocultar" : "🔎 Mostrar"}`}
                    </button>

                </div>}


            </div>



            {videosVisible && <div className="media-items-container" >

                {area.urlVideos?.map((url, index) => (
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



        </>

    );


};



export default VideoUploader;
