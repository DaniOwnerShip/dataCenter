import React, { useState } from 'react';

export default function ImageUploader({ blocksAreas, indexArea }) {

  // console.log('Image area:', area);
  const areaName = blocksAreas[indexArea].areaName;
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('Cargar imagen');

  const [imageIsVisible, setImageIsVisible] = useState(false);
  const [forceRender, setForceRender] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log('e.target.files[0]:', e.target.files[0].name);
  };
  const showImages = () => {
    setImageIsVisible(!imageIsVisible);
  };
  const handleContextMenu = (e, indexArea, url) => {
    e.preventDefault();
    const deleteImg = window.confirm('¿BORRAR IMAGEN?');
    const imgToDelete = blocksAreas[indexArea].urlImages.findIndex((u) => u === url);

    if (deleteImg && imgToDelete !== -1) {
      blocksAreas[indexArea].urlImages.splice(imgToDelete, 1);
      setForceRender(!forceRender);
    }

  };

  const handleUpload = async () => {

    if (!selectedFile) { window.alert('SELECCIONA UN ARCHIVO'); return; }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:3001/apiHs/upload-img', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const imageURL = 'http://localhost:3001/' + responseData.imageUrl;
      console.log('Image uploaded:', imageURL);
      blocksAreas[indexArea].urlImages.push(imageURL);
      setFileName("Cargar imagen");

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  
  return (

    <div className="block" >


      <div className="flex-spacebtw">

        <div className="block" >
          <label htmlFor= {`fi-${areaName}`}>
            {fileName}
          </label>
          <input
            id={`fi-${areaName}`}
            type="file"
            onChange={handleFileChange}
          />
          <button className="button" onClick={handleUpload}>Subir</button>
        </div>

        {blocksAreas[indexArea].urlImages && <div className="flex">
          <p>{blocksAreas[indexArea].urlImages?.length} imágenes</p>
          <button className="button"
            onClick={showImages}
          >
            {`${imageIsVisible ? "Ocultar" : "Mostrar"}`}
          </button>
        </div>}


      </div>


      {imageIsVisible && <div className="block" >
        {blocksAreas[indexArea].urlImages?.map((url, index) => (

          <a href={url} target="_blank" rel="noopener noreferrer" key={`img-${indexArea}-${index}`}>
            <img
              src={url}
              alt={`img-${indexArea}-${index}`}
              className="areaImage"
              onContextMenu={(e) => handleContextMenu(e, indexArea, url)}
            />
          </a>
        ))}
      </div>}

    </div>
    // <div>
    //   <input type="file" onChange={handleFileChange} />
    //   <button  className="blockItem-calendar-button" onClick={handleUpload}>Subir imagen</button>
    // </div>
  );
};

