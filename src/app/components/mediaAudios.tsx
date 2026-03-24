import { useState } from "react";
import MediaAPI from "../apis/multimediaAPI";
import type { ReportArea, ReportDocument } from "@/types/report";

type Props = {
  report: ReportDocument;
  area: ReportArea;
  indexArea: number;
  setnAudios: React.Dispatch<React.SetStateAction<number>>;
  isTemplate: boolean;
  isDocReserved: boolean;
};

export default function MediaAudio({ report, area, indexArea, setnAudios, isTemplate, isDocReserved }: Props) {
  const audioMimes = ["audio/mpeg", "audio/wav", "audio/x-ms-wma", "audio/vnd.rn-realaudio", "audio/ogg", "audio/aac", "audio/flac", "audio/x-matroska", "audio/x-aiff", "audio/midi", "audio/x-ms-asf"];
  const areaId = area.areaName;
  const audios = area.urlAudios;
  const docID = report[0].metaData.fileID;
  const checksum = report[0].metaData.checksum;
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaName, setMediaName] = useState("🔂 Seleccionar");

  const audioSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaFile(file);
    setMediaName(file.name);
  };

  const uploadAudio = async (mediaType: string) => {
    if (checksum) return window.alert(`⚠️ El archivo ${docID.split(".")[0]} está completado y no se puede editar`);
    if (isTemplate) return window.alert("⚠️ No puede subir archivos si el documento no ha sido guardado");
    if (!mediaFile) return window.alert("Selecciona un archivo");

    MediaAPI.mediaupload(mediaFile, mediaType, docID, indexArea)
      .then((res) => {
        audios.push(res.mediaURL);
        setnAudios(audios.length);
        setMediaName("🔂 Seleccionar audio");
        window.alert("✅ Audio subido");
      })
      .catch((e) => window.alert(`❌ ${e.message}`));
  };

  const deleteAudio = (e: React.MouseEvent<HTMLElement>, url: string, mediaType: string) => {
    e.preventDefault();
    if (!isDocReserved) return window.alert("⚠️ No puede eliminar archivos si el documento no está reservado");
    const confirmDelete = window.confirm("¿BORRAR AUDIO?");
    const indexUrl = audios.findIndex((u) => u === url);
    if (!confirmDelete || indexUrl === -1) return;
    const mediaURL = audios[indexUrl];

    MediaAPI.mediaDeleteFile(docID, indexArea, mediaType, mediaURL)
      .then((res) => {
        audios.splice(indexUrl, 1);
        setnAudios(audios?.length);
        window.alert(`✅ ${res}`);
      })
      .catch((e) => window.alert(`❌ ${e.message}`));
  };

  return (
    <>
      <div className="flex spacebtw mediaIO-bar">
        <div className="flex">
          <label htmlFor={`vi-${areaId}`}>
            <div className="button media">{mediaName}</div>
          </label>
          <input id={`vi-${areaId}`} type="file" accept={audioMimes.join(",")} onChange={audioSelection} />
          <button type="button" id={`upv-${areaId}`} className="button media" onClick={() => uploadAudio("audio")}>
            ⏏️ Subir
          </button>
        </div>
      </div>

      <div className="media-items-container enabled">
        {audios?.map((url, index) => (
          <figure className="media-figure" key={`aud-${indexArea}-${index}`}>
            <audio controls src={url} onContextMenu={(e) => deleteAudio(e, url, "audio")} className="media-audio"></audio>
            <figcaption className="media-caption">{url.split("/")[5]?.split("_")[1]}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
