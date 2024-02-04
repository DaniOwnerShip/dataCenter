 
export default function saveReportJson(data) {
  console.log("downloadJson", data); 
 
  const dateNow = new Date();
  const dateFormat = dateNow.toLocaleDateString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit' }); 
  const fileName = `informe${dateFormat.replace(/\//g, '-')}.json`;

  data[0].handshake.fileID = fileName; 

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json", });
  
   
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
  .then(data => window.alert(data.message))
  .catch(error => console.error('Error:', error)); 
}

 