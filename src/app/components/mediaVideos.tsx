import { useState } from "react";
import MediaAPI from "../apis/multimediaAPI";
import type { ReportArea, ReportDocument } from "@/types/report";

type Props = {
  report: ReportDocument;
  area: ReportArea;
  indexArea: number;
  setnVideos: React.Dispatch<React.SetStateAction<number>>;
  isTemplate: boolean;
  isDocReserved: boolean;
};

export default function MediaVideo({ report, area, indexArea, setnVideos, isTemplate, isDocReserved }: Props) {
  const videoMimes = ["video/mp4", "video/avi", "video/mpeg", "video/quicktime", "video/x-ms-wmv", "video/x-flv", "video/x-matroska", "video/x-msvideo", "video/x-ms-asf"];
  const idArea = area.areaName;
  const urlVideos = area.urlVideos;
  const docID = report[0].metaData.fileID;
  const checksum = report[0].metaData.checksum;
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaName, setMediaName] = useState("🔂 Seleccionar");

  const videoSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaFile(file);
    setMediaName(file.name);
  };

  const uploadVideo = (mediaType: string) => {
    if (checksum) return window.alert(`⚠️ El archivo ${docID.split(".")[0]} está completado y no se puede editar`);
    if (isTemplate) return window.alert("⚠️ No puede subir archivos si el documento aún no ha sido guardado");
    if (!mediaFile) return window.alert("Selecciona un archivo");

    MediaAPI.mediaupload(mediaFile, mediaType, docID, indexArea)
      .then((res) => {
        urlVideos.push(res.mediaURL);
        setnVideos(urlVideos.length);
        setMediaName("🔂 Seleccionar video");
        window.alert("✅ video subido");
      })
      .catch((e) => window.alert(`❌ ${e.message}`));
  };

  const deleteVideo = (e: React.MouseEvent<HTMLElement>, url: string, mediaType: string) => {
    e.preventDefault();
    if (!isDocReserved) return window.alert("⚠️ No puede eliminar archivos si el documento no está reservado");
    const confirmDelete = window.confirm("¿BORRAR Video?");
    const indexUrl = urlVideos.findIndex((u) => u === url);
    if (!confirmDelete || indexUrl === -1) return;
    const mediaURL = urlVideos[indexUrl];

    MediaAPI.mediaDeleteFile(docID, indexArea, mediaType, mediaURL)
      .then((res) => {
        urlVideos.splice(indexUrl, 1);
        setnVideos(urlVideos.length);
        window.alert(`✅ ${res}`);
      })
      .catch((e) => window.alert(`❌ ${e.message}`));
  };

  return (
    <>
      <div className="flex spacebtw mediaIO-bar">
        <div className="flex">
          <label htmlFor={`vi-${idArea}`}>
            <div className="button media">{mediaName}</div>
          </label>
          <input id={`vi-${idArea}`} type="file" accept={videoMimes.join(",")} onChange={videoSelection} />
          <button type="button" id={`upv-${idArea}`} className="button media" onClick={() => uploadVideo("video")}>
            ⏏️ Subir
          </button>
        </div>
      </div>

      <div className="media-items-container enabled">
        {urlVideos?.map((url, index) => (
          <figure key={`vid-${indexArea}-${index}`} className="media-figure">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <video src={url} className="media-item" onContextMenu={(e) => deleteVideo(e, url, "video")} />
            </a>
            <figcaption className="media-caption">{url.split("/")[5]?.split("_")[1]}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
