import React, { useEffect, useState } from "react";
import MediaImages from "./mediaImages";
import MediaVideo from "./mediaVideos";
import MediaAudio from "./mediaAudios";
import type { ReportArea, ReportDocument } from "@/types/report";

type Props = {
  report: ReportDocument;
  _area: ReportArea;
  indexArea: number;
  isTemplate: boolean;
  isDocReserved: boolean;
};

export default function MediaTabs({ report, _area, indexArea, isTemplate, isDocReserved }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [nImages, setnImages] = useState(0);
  const [nVideos, setnVideos] = useState(0);
  const [nAudios, setnAudios] = useState(0);

  useEffect(() => {
    setnImages(_area.urlImages.length);
    setnVideos(_area.urlVideos.length);
    setnAudios(_area.urlAudios.length);
  }, [_area.urlImages.length, _area.urlVideos.length, _area.urlAudios.length]);

  const clickTab = (e: React.MouseEvent<HTMLDivElement>, n: number) => {
    e.stopPropagation();
    setActiveTab(n);
  };

  const areaStyle = activeTab === 0 ? "media closed" : "media";

  return (
    <section className={areaStyle}>
      <div className="media-tab-bar flex enabled">
        <div className={`${activeTab === 0 ? "media-tab active" : "media-tab"}`} onClick={(e) => clickTab(e, 0)}>
          {`${activeTab === 0 ? "🎞️" : "📼"}`}
        </div>
        <div className={`${activeTab === 1 ? "media-tab active" : "media-tab"}`} onClick={(e) => clickTab(e, 1)}>
          {`Imágenes (${nImages})`}
        </div>
        <div className={`${activeTab === 2 ? "media-tab active" : "media-tab"}`} onClick={(e) => clickTab(e, 2)}>
          {`Vídeos (${nVideos})`}
        </div>
        <div className={`${activeTab === 3 ? "media-tab active" : "media-tab"}`} onClick={(e) => clickTab(e, 3)}>
          {`Audios (${nAudios})`}
        </div>
      </div>

      {activeTab !== 0 && (
        <div className="media-container">
          {activeTab === 1 && <MediaImages report={report} area={_area} indexArea={indexArea} setnImages={setnImages} isTemplate={isTemplate} isDocReserved={isDocReserved} />}
          {activeTab === 2 && <MediaVideo report={report} area={_area} indexArea={indexArea} setnVideos={setnVideos} isTemplate={isTemplate} isDocReserved={isDocReserved} />}
          {activeTab === 3 && <MediaAudio report={report} area={_area} indexArea={indexArea} setnAudios={setnAudios} isTemplate={isTemplate} isDocReserved={isDocReserved} />}
        </div>
      )}
    </section>
  );
}
