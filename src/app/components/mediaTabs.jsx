import React, { useState } from 'react';

import MediaImages from "./mediaImages";
import MediaVideo from "./mediaVideos"; 
import MediaAudio from "./mediaAudios"; 


export default function MediaTabs({ area, indexArea }) {

    const [activeTab, setActiveTab] = useState(0);
    const [nImages, setnImages] = useState(area.urlImages?.length);
    const [nVideos, setnVideos] = useState(area.urlVideos?.length);
    const [nAudios, setnAudios] = useState(area.urlAudios?.length);


    const clickTab = (e, n) => {
        e.stopPropagation();
        setActiveTab(n);
    };


    const areaStyle = activeTab === 0 ? "media closed" : "media";

    return (

        <section className={areaStyle}>


            <div className="media-tab-bar flex">

                <div
                    className={`${activeTab === 0 ? "media-tab active" : "media-tab"}`}
                    onClick={(e) => clickTab(e, 0)}>
                    {`${activeTab === 0 ? "🎞️" : "📼"}`}
                </div>

                <div
                    className={`${activeTab === 1 ? "media-tab active" : "media-tab"}`}
                    onClick={(e) => clickTab(e, 1)}>
                    {`Imágenes (${nImages})`} 
                </div>

                <div
                    className={`${activeTab === 2 ? "media-tab active" : "media-tab"}`}
                    onClick={(e) => clickTab(e, 2)}>
                    {`Vídeos (${nVideos})`} 
                </div>

                <div
                    className={`${activeTab === 3 ? "media-tab active" : "media-tab"}`}
                    onClick={(e) => clickTab(e, 3)}>
                    {`Audios (${nAudios})`} 
                </div>

            </div>


            {activeTab !== 0 && <div className="media-container">

                {activeTab === 1 && <MediaImages area={area} indexArea={indexArea} setnImages={setnImages} />}

                {activeTab === 2 && <MediaVideo area={area} indexArea={indexArea} setnVideos={setnVideos} />}
                
                {activeTab === 3 && <MediaAudio area={area} indexArea={indexArea} setnAudios={setnAudios} />}

            </div>}



        </section>




    );

};

