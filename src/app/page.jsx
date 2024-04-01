import Link from 'next/link';
import "./styles/landpage.css"

export default function Home() {

  return (
    <main className="landpage">

      <h1 className="lpHeader">
        Centro de datos Termosol
      </h1> 
      
      <p className="lpHeader cdt">
        CDT
      </p> 

      <section className="linksBox">
        <p>
          <Link href="/pages/termosolreport/Termosol-0-dia">Informes Cambio de Turno</Link>
        </p>
        <p>
          <Link href="/pages/utils">Utilidades (seguimiento pistones, forzados, filtros, etc.)</Link>
        </p>
        <p>
          <Link href="/pages/test">test</Link>
        </p>
      </section>



    </main>
  );

}
