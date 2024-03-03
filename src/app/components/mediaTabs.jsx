import React, { useState } from 'react';

import ImageUploader from "./mediaImages";
import VideoUploader from "./mediaVideos";


export default function MediaTabs({ area, indexArea }) {

    const [activeTab, setActiveTab] = useState(0);
    const [nImages, setnImages] = useState(area.urlImages?.length);
    const [nVideos, setnVideos] = useState(area.urlVideos?.length);


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

            </div>


            {activeTab !== 0 && <div className="media-container">

                {activeTab === 1 && <ImageUploader area={area} indexArea={indexArea} setnImages={setnImages} />}

                {activeTab === 2 && <VideoUploader area={area} indexArea={indexArea} setnVideos={setnVideos} />}

            </div>}



        </section>




    );

};

