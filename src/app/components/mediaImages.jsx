import React, { useState } from 'react';
import FileApi from "../apis/fileApi";
import { useGlobalContext } from '../GlobalContext';



export default function MediaImages({ area, indexArea, setnImages }) {
  
  const imageMimes = [
    'image/jpeg',  // .jpg, .jpeg
    'image/png',   // .png
    'image/gif',   // .gif
    'image/bmp',   // .bmp
    'image/webp',  // .webp
    'image/svg+xml' // .svg
];


  const idArea = area.areaName;
  const imgs = area.urlImages;
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('🔂 Seleccionar imagen');
  const [imageIsVisible, setImageIsVisible] = useState(true);
  const { globalDocIsBlock } = useGlobalContext();


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

    FileApi.uploadImage(formData)
      .then(res => {
        imageURL = path + res.imageUrl;
        imgs.push(imageURL);
        setnImages(imgs?.length);
        setFileName('🔂 Seleccionar imagen');
        window.alert(`✅Imagen guardada`);
      })
      .catch((e) => { window.alert(`❌ ${e.message}`); });

  };



  const deleteImage = (e, url) => {
    e.preventDefault();

    const deleteImg = window.confirm('¿BORRAR IMAGEN?');
    const indexUrl = imgs?.findIndex((u) => u === url);

    if (deleteImg && indexUrl !== -1) {

      const imgUrl = imgs[indexUrl];

      FileApi.deleteFile(imgUrl)
        .then(res => {
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
            <p className="button media">{fileName}</p>
          </label>

          <input
            id={`fi-${idArea}`}
            type="file"
            accept={imageMimes.join(',')}
            onChange={imageSelection}
          />

          <button
            id={`upi-${idArea}`}
            className={`button media ${globalDocIsBlock}`}
            onClick={uploadImage}>
            ⏏️ Subir imagen
          </button>

        </div>


        {imgs.length > 0 && <div className="flex center">

          <p>{imgs?.length} imágen(es)</p>

          <button id={`sh-${idArea}`} className="button media" onClick={showImages}  >
            {`${imageIsVisible ? "👁️ Ocultar" : "🔎 Mostrar"}`}
          </button>

        </div>}



      </div>



      {imageIsVisible && <div className="media-items-container" >

        {imgs?.map((url, index) => (
          <a href={url} target="_blank" rel="noopener noreferrer" key={`img-${indexArea}-${index}`}>
            <img
              src={url}
              alt={`img-${indexArea}-${index}`}
              className="media-item"
              onContextMenu={(e) => deleteImage(e, url)}
            />
          </a>
        ))}

      </div>}





    </>

  );

};



