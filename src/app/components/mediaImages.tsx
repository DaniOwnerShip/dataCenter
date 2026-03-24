import React, { useState } from "react";
import Image from "next/image";
import MediaAPI from "../apis/multimediaAPI";
import type { ReportArea, ReportDocument } from "@/types/report";

type Props = {
  report: ReportDocument;
  area: ReportArea;
  indexArea: number;
  setnImages: React.Dispatch<React.SetStateAction<number>>;
  isTemplate: boolean;
  isDocReserved: boolean;
};

export default function MediaImages({ report, area, indexArea, setnImages, isTemplate, isDocReserved }: Props) {
  const imageMimes = ["image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp", "image/svg+xml"];
  const idArea = area.areaName;
  const imgs = report[2].areas[indexArea].urlImages;
  const docID = report[0].metaData.fileID;
  const checksum = report[0].metaData.checksum;
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaName, setMediaName] = useState("🔂 Seleccionar");

  const imageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaFile(file);
    setMediaName(file.name);
  };

  const uploadImage = (mediaType: string) => {
    if (checksum) return window.alert(`⚠️ El archivo ${docID.split(".")[0]} está completado y no se puede editar`);
    if (isTemplate) return window.alert("⚠️ No puede subir archivos si el documento no ha sido guardado");
    if (!mediaFile) return window.alert("Selecciona un archivo");

    MediaAPI.mediaupload(mediaFile, mediaType, docID, indexArea)
      .then((res) => {
        imgs.push(res.mediaURL);
        setnImages(imgs.length);
        setMediaName("🔂 Seleccionar imagen");
        window.alert("✅ Imagen subida");
      })
      .catch((e) => {
        window.alert(`❌ ${e.message}`);
      });
  };

  const deleteImage = (e: React.MouseEvent<HTMLElement>, url: string, mediaType: string) => {
    e.preventDefault();
    if (!isDocReserved) return window.alert("⚠️ No puede eliminar archivos si el documento no está reservado");
    const confirmDelete = window.confirm("¿BORRAR IMAGEN?");
    const indexUrl = imgs?.findIndex((u) => u === url);
    if (!confirmDelete || indexUrl === -1) return;

    const mediaURL = imgs[indexUrl];
    MediaAPI.mediaDeleteFile(docID, indexArea, mediaType, mediaURL)
      .then((res) => {
        imgs.splice(indexUrl, 1);
        setnImages(imgs?.length);
        window.alert(`✅ ${res}`);
      })
      .catch((e) => {
        window.alert(`❌ ${e.message}`);
      });
  };

  return (
    <>
      <div className="flex spacebtw mediaIO-bar">
        <div className="flex">
          <label htmlFor={`fi-${idArea}`}>
            <div className="button media">{mediaName}</div>
          </label>
          <input id={`fi-${idArea}`} type="file" accept={imageMimes.join(",")} onChange={imageSelection} />
          <button type="button" id={`upi-${idArea}`} className="button media" onClick={() => uploadImage("image")}>
            ⏏️ Subir
          </button>
        </div>
      </div>

      <div className="media-items-container enabled">
        {imgs?.map((url, index) => (
          <figure key={`img-${indexArea}-${index}`} className="media-figure">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Image
                src={url}
                alt={`img-${indexArea}-${index}`}
                className="media-item"
                onContextMenu={(e) => deleteImage(e, url, "image")}
                width={380}
                height={220}
                unoptimized
              />
            </a>
            <figcaption className="media-caption">{url.split("/")[5]?.split("_")[1]}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
