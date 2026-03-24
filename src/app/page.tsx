import Link from "next/link";
import "./styles/landpage.css";

export default function Home() {
  return (
    <main className="landpage">
      <h1 className="lpHeader">Centro de datos</h1>
      <p className="lpHeader cdt">DEMO</p>
      <section className="linksBox">
        <p>
          <Link href="/pages/unitreport/Unidad-0-dia">Informes Cambio de Turno</Link>
        </p>
        <p>
          <Link href="/pages/utils">test</Link>
        </p>
        <p>
          <Link href="/pages/test">test</Link>
        </p>
      </section>
    </main>
  );
}
