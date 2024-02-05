import React, { useState } from 'react';

import APIReport from "../apis/apiReport";


export default function ImageUploader({ blocksAreas, indexArea, setnImages }) {

  const areaName = blocksAreas[indexArea].areaName;
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('🔂 Seleccionar imagen');
  const [imageIsVisible, setImageIsVisible] = useState(true);


  const imageSelection = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const showImages = () => {
    setImageIsVisible(!imageIsVisible);
  };


  const uploadImage = () => {

    if (!selectedFile) { window.alert('SELECCIONA UN ARCHIVO'); return; }

    const formData = new FormData();
    formData.append('image', selectedFile);

    const path = 'http://localhost:3001/';
    let imageURL;

    APIReport.uploadImage(formData)
      .then(res => {
        imageURL = path + res.imageUrl;
        blocksAreas[indexArea].urlImages.push(imageURL);
        setnImages(blocksAreas[indexArea].urlImages?.length);
        setFileName('🔂 Seleccionar imagen');
        window.alert(`✅Imagen guardada`);
      })
      .catch((e) => { window.alert(`❌ ${e.message}`); });
      
  };



  const deleteImage = (e, indexArea, url) => {
    e.preventDefault();
    const deleteImg = window.confirm('¿BORRAR IMAGEN?');

    if (deleteImg && indexUrl !== -1) {

      const indexUrl = blocksAreas[indexArea].urlImages.findIndex((u) => u === url);
      const imgUrl = blocksAreas[indexArea].urlImages[indexUrl];

      APIReport.deleteFile(imgUrl)
        .then(res => {
          blocksAreas[indexArea].urlImages.splice(indexUrl, 1);
          setnImages(blocksAreas[indexArea].urlImages?.length);
          window.alert(`✅ ${res}`);
        })
        .catch((e) => { window.alert(`❌ ${e.message}`); });
    }

  };



  return (

    <>
      <div className="flex spacebtw mediaIO-bar" >


        <div className="flex" >

          <label htmlFor={`fi-${areaName}`}>
            <p className="button-area-media">{fileName}</p>
          </label>

          <input
            id={`fi-${areaName}`}
            type="file"
            onChange={imageSelection}
          />

          <button id={`upi-${areaName}`} className="button-area-media" onClick={uploadImage}>⏏️ Subir imagen</button>

        </div>



        {blocksAreas[indexArea].urlImages.length > 0 && <div className="flex center">

          <p>{blocksAreas[indexArea].urlImages?.length} imágen(es)</p>

          <button id={`sh-${areaName}`} className="button-area-media" onClick={showImages}  >
            {`${imageIsVisible ? "👁️ Ocultar" : "🔎 Mostrar"}`}
          </button>

        </div>}



      </div>



      {imageIsVisible && <div className="media-items-container" >

        {blocksAreas[indexArea].urlImages?.map((url, index) => (
          <a href={url} target="_blank" rel="noopener noreferrer" key={`img-${indexArea}-${index}`}>
            <img
              src={url}
              alt={`img-${indexArea}-${index}`}
              className="media-item"
              onContextMenu={(e) => deleteImage(e, indexArea, url)}
            />
          </a>
        ))}

      </div>}





    </>

  );

};



