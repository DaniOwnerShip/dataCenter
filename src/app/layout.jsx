import "./styles/main.css"

export const metadata = {

  title: 'data center',
  description: 'data center next app',

}


export default function RootLayout({ children }) {

  return (

    <html lang="es"> 

      <body >{children}</body>

    </html>
  );
  
}
 
 