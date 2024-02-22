import { useState } from 'react';

import FileApi from "../apis/fileApi";
import { useGlobalContext } from '../GlobalContext';

export default function MediaVideos({ area, indexArea, setnVideos }) {

    const videoMimes = [
        'video/quicktime',   // .mov
        'video/avi',         // .avi
        'video/x-ms-wmv',    // .wmv
        'video/x-flv',       // .flv
        'video/mpeg',        // .mpeg, .mpg
        'video/x-matroska',  // .mkv
        'video/x-msvideo',   // .avi
        'video/x-ms-asf'     // .asf
    ];


    const idArea = area.areaName;
    const videos = area.urlVideos;
    const [videoName, setVideoName] = useState('🔂 Seleccionar video');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videosVisible, setVideosVisible] = useState(true);
    const { globalDocIsBlock } = useGlobalContext();


    const videoSelection = (e) => {
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

        FileApi.uploadVideo(formData)
            .then(res => {
                videoURL = path + res;
                videos.push(videoURL);
                setnVideos(videos?.length);
                setVideoName('🔂 Seleccionar video');
                window.alert('✅ Vídeo subido correctamente');
            })
            .catch((e) => { window.alert(`❌ ${e.message}`); });
    };



    const deleteVideo = (e, url) => {
        e.preventDefault();
        const deleteVideo = window.confirm('¿BORRAR Video?');
        const indexUrl = videos.findIndex((u) => u === url);

        if (deleteVideo && indexUrl !== -1) {
            const videoUrl = videos[indexUrl];

            FileApi.deleteFile(videoUrl)
                .then(res => {
                    videos.splice(indexUrl, 1);
                    setnVideos(videos?.length);
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
                        <p className="button media">{videoName}</p>
                    </label>

                    <input id={`vi-${idArea}`}
                        type="file"
                        accept={videoMimes.join(',')}
                        onChange={videoSelection}
                    />

                    <button
                        id={`upv-${idArea}`}
                        className={`button media ${globalDocIsBlock}`}
                        onClick={uploadVideo}>
                        ⏏️ Subir Vídeo
                    </button>

                </div>


                {videos?.length > 0 && <div className="flex center">

                    <p>{videos?.length} vídeo(s)</p>

                    <button id={`bvid-${idArea}`} className="button media" onClick={showVideos}  >
                        {`${videosVisible ? "👁️ Ocultar" : "🔎 Mostrar"}`}
                    </button>

                </div>}


            </div>



            {videosVisible && <div className="media-items-container" >

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

            </div>}



        </>

    );


};

