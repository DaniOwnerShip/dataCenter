import Link from 'next/link';

export default function Home() {

  return (
    <main >

      <h1 >
        Instantly deploy your Next.js site to a shareable URL with Vercel.
      </h1>

      <p>
        <Link href="/pages/shiftchangedoc/main1">main1</Link> 
      </p>
      <p> 
        <Link href="/pages/shiftchangedoc/unit1">unit1</Link> 
      </p>
      <p> 
        <Link href="/pages/shiftchangedoc/unit2">unit2</Link> 
      </p>

 
      

    </main>
  );

}
