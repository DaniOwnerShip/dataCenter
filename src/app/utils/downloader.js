 export default function downloadTxt(data) {
  console.log("downloadTxt" );
  // Convertir el objeto JSON a una cadena
  const jsonString = JSON.stringify(data, null, 2);

  // Crear un Blob con la cadena JSON
  const blob = new Blob([jsonString], { type: 'text/plain' });

  // Crear un enlace de descarga
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);

  // Especificar el nombre del archivo
  link.download = 'informe.json';

  // Simular un clic en el enlace para iniciar la descarga
  link.click();
}
