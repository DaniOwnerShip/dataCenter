 
 //experimental 
 
 export default function downloadJson(data) {
  console.log("downloadJson" );
  
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'text/plain' });  

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob); 
  
  link.download = 'informe.json';  
  link.click();
  
}
