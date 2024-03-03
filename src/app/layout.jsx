import "./styles/main.css"


export const metadata = {
  title: 'data center',
  description: 'data center next app',
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

