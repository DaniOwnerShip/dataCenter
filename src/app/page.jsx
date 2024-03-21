import Link from 'next/link';

export default function Home() {

  return (
    <main >

      <h1 >
        Instantly deploy your Next.js site to a shareable URL with Vercel.
      </h1>

      <p>
        <Link href="/pages/shiftChange/mainReport">handshake</Link>
        <Link href="/pages/shiftChange/plantUnits/main1">main1</Link>
        <Link href="/pages/shiftChange/plantUnits/unit1">unit1</Link>
      </p>

      <Link href="/pages/shiftChange/plantUnit/[unit]" as="/pages/shiftChange/plantUnit/abc">
        plt
      </Link>

      <Link
        href="/plantUnit/[unit]"
        as={`/plantUnit/${"unit1"}`}
      >
        <p>test url dinámica</p>
      </Link> 
      

    </main>
  );

}
