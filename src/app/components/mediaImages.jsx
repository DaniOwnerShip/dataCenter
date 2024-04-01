import React, { useState } from 'react';
import FileApi from "../apis/fileApi";
import MediaAPI from '../apis/multimediaAPI.mjs';


export default function MediaImages({ report, area, indexArea, setnImages, isTemplate, isDocReserved }) {

  const imageMimes = [
    'image/jpeg',  // .jpg, .jpeg
    'image/png',   // .png
    'image/gif',   // .gif
    'image/bmp',   // .bmp
    'image/webp',  // .webp
    'image/svg+xml' // .svg
  ];

  const idArea = area.areaName;
  // const imgs = area.urlImages;
  const imgs = report[2].areas[indexArea].urlImages; 
  const docID = report[0].metaData.fileID;
  const checksum = report[0].metaData.checksum;
  const areaIndex = indexArea;

  const [mediaFile, setMediaFile] = useState(null);
  const [mediaName, setMediaName] = useState('🔂 Seleccionar');


  const imageSelection = (e) => {
    setMediaFile(e.target.files[0]);
    setMediaName(e.target.files[0].name);
  };



  const uploadImage = (mediaType) => {

    if (checksum) {
      return window.alert(`⚠️ El archivo ${docID.split(".")[0]} está completado y no se puede editar`);
    }

    if (isTemplate) {
      return window.alert(`⚠️ No puede subir archivos si el documento no ha sido guardado`);
    }

    if (!mediaFile) { return window.alert('Selecciona un archivo'); }

    MediaAPI.mediaupload(mediaFile, mediaType, docID, areaIndex)
      .then(res => {
        console.log('res:', res);
        imgs.push(res.mediaURL);
        setnImages(imgs.length);
        setMediaName('🔂 Seleccionar imagen');
        window.alert('✅ Imagen subida');
      })
      .catch((e) => { window.alert(`❌ ${e.message}`); });

  };







  const deleteImage = (e, url, mediaType) => {
    e.preventDefault();

    //se puede eliminar..
    // if (checksum) {
    //   return window.alert(`⚠️ El archivo ${docID.split(".")[0]} está completado y no se puede editar`);
    // }

    if (!isDocReserved) {
      return window.alert(`⚠️ No puede eliminar archivos si el documento no está reservado`);
    }

    const confirmDelete = window.confirm('¿BORRAR IMAGEN?');
    const indexUrl = imgs?.findIndex((u) => u === url);

    if (confirmDelete && indexUrl !== -1) {

      const mediaURL = imgs[indexUrl];

      MediaAPI.mediaDeleteFile(docID, areaIndex, mediaType, mediaURL)
        .then(res => {
          console.log('res:', res);
          imgs.splice(indexUrl, 1);
          setnImages(imgs?.length);
          window.alert(`✅ ${res}`);
        })
        .catch((e) => { window.alert(`❌ ${e.message}`); });
    }

  };




  return (
    <>

      <div className="flex spacebtw mediaIO-bar" >


        <div className="flex" >

          <label htmlFor={`fi-${idArea}`}>
            <div className="button media">{mediaName}</div>
          </label>

          <input
            id={`fi-${idArea}`}
            type="file"
            accept={imageMimes.join(',')}
            onChange={imageSelection}
          />

          <button
            type="button"
            id={`upi-${idArea}`}
            className="button media"
            onClick={() => uploadImage('image')}>
            ⏏️ Subir
          </button>

        </div>


      </div>


      <div className="media-items-container enabled" >

        {imgs?.map((url, index) => (

          <figure key={`img-${indexArea}-${index}`} className="media-figure" >

            <a href={url} target="_blank" rel="noopener noreferrer">
              <img
                src={url}
                alt={`img-${indexArea}-${index}`}
                className="media-item"
                onContextMenu={(e) => deleteImage(e, url, 'image')}
              />
            </a>

            <figcaption className="media-caption">{url.split('/')[5].split('_')[1]}</figcaption>

          </figure>
        ))}

      </div>





    </>

  );

};



