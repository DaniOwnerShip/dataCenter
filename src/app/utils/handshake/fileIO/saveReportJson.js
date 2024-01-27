

// export default function saveReportJson(data) {
//   console.log("downloadJson", data);
// //   const dateNow = new Date();
// //   const dateFormat = dateNow.toLocaleDateString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit' }); 
// //   const fileName = `informe${dateFormat.replace(/\//g, '-')}.json`;
//   const url = 'http://localhost:3001/apiHs/saveReport';

//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json', 
//     },
//     body: JSON.stringify(data),
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   // .then(data => window.alert(data.message))
//   .then(data => console.log("downloadJson", data))
 
//   .catch(error => {
//     console.error('Error:', error);
//   });
// }

  // const jsonString = JSON.stringify(data, null, 2);
  //  const blob = new Blob([jsonString], { type: 'text/plain' }); 
//  const blob = new Blob([jsonString], { type: 'application/json' });   

  // const dateNow = new Date();
  // const dateFormat = dateNow.toLocaleDateString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit' }); 
  // const fileName = `informe${dateFormat.replace(/\//g, '-')}.json`;

export default function saveReportJson(data) {
  console.log("downloadJson", data); 
 
  const dateNow = new Date();
  const dateFormat = dateNow.toLocaleDateString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit' }); 
  const fileName = `informe${dateFormat.replace(/\//g, '-')}.json`;

  data[0].handshake.fileID = fileName;


  const blob = new Blob([JSON.stringify(data, null, 2)], {
   type: "application/json",
 });
 
//  const blob = new Blob(data) ;
  

  const url = 'http://localhost:3001/apiHs/saveReport';    
 
  fetch(url, {
    method: 'POST',   
    body: blob, 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  // .then(data => console.log("then->", data.mensaje))
  .then(data => window.alert(data.message))
  .catch(error => console.error('Error:', error));

}


  // .then(data => window.alert(data.message))

// //experimental 

// export default function saveReportJson(data) {
//   console.log("downloadJson", data); 

//   const dateNow = new Date();
//   const dateFormat = dateNow.toLocaleDateString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit' }); 
//   const fileName = `informe${dateFormat.replace(/\//g, '-')}.json`;

//   const formData = new FormData();
//   const jsonString = JSON.stringify(data, null, 2);
//   //  const blob = new Blob([jsonString], { type: 'text/plain' }); 
//  const blob = new Blob([jsonString], { type: 'application/json' });   

//   console.log("fileName",fileName);
//   formData.append('archivo', blob, fileName);   
//   const url = 'http://localhost:3001/apiHs/saveReport';    

//   // fetch(url, {
//   //   method: 'POST',
//   //   body: formData, 
//   // })
//   fetch(url, {
//     method: 'POST', 
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json', 
//       'Authorization': 'Bearer tuTokenJWT',
//     },
//     body: JSON.stringify(data),
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => window.alert(data.message))
//   .catch(error => console.error('Error:', error));


// }


  // const link = document.createElement('a');window.confirm("¿Descargar Informe?")
  // link.href = URL.createObjectURL(blob); 


  // link.download = fileName;  
  // link.click();