
import "./styles/main.css" 
import "./styles/scrollbar.css"

export const metadata = {
  title: 'CDT',
  description: 'Centro de Datos Termosol',
}

export const viewport = {
  themeColor: 'black',
  settings: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({ children }) {

  return (

    <html lang="es"> 

      <body >

        {children}

      </body> 

    </html>
  );

}

