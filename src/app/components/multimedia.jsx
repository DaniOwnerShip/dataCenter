import React, { useState } from 'react';

import ImageUploader from "./imageUploader";
import VideoUploader from "./videoUploader";


export default function Multimedia({ blocksAreas, indexArea }) { 

    const [activeTab, setActiveTab] = useState(0);
    const [nImages, setnImages] = useState(blocksAreas[indexArea].urlImages?.length);
    const [nVideos, setnVideos] = useState(blocksAreas[indexArea].urlVideos?.length); 
 

    const clickTab = (e, n) => {
        e.stopPropagation();
        setActiveTab(n);
    }; 
 

    const areaStyle =  activeTab === 0 ?  "area-multimedia-closed" : "area-multimedia" ;

    return (

        <section className={areaStyle}> 


            <div className="multimedia-tab-bar flex">

                <div
                    className={`${activeTab === 0 ? "multimedia-tab-active" : "multimedia-tab"}`}
                    onClick={(e) => clickTab(e, 0)}>
                    {`${activeTab === 0 ? "📙" : "📖"}`}
                </div>

                <div
                    className={`${activeTab === 1 ? "multimedia-tab-active" : "multimedia-tab"}`}
                    onClick={(e) => clickTab(e, 1)}>
                    <p>{`Imágenes (${nImages})`}</p>
                </div>

                <div
                    className={`${activeTab === 2 ? "multimedia-tab-active" : "multimedia-tab"}`}
                    onClick={(e) => clickTab(e, 2)}>
                    <p>{`Vídeos (${nVideos})`}</p>
                </div>   

            </div>


            {activeTab !== 0 && <div className="multimedia-box">

                {activeTab === 1 && <ImageUploader blocksAreas={blocksAreas} indexArea={indexArea} setnImages={setnImages}/>}

                {activeTab === 2 && <VideoUploader blocksAreas={blocksAreas} indexArea={indexArea} setnVideos={setnVideos}/>}

            </div>}



        </section>




    );

};

