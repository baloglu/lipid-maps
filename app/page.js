import Image from 'next/image'
import Link from 'next/link'

export default function Home() {

  const randomId = Math.floor(Math.random() * 43000);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="relative flex place-items-center mt-20 text-4xl">
        <p>Lipid Maps Clone for Presentation</p>
      </div>

      <div className="flex-row justify-center items-center mt-20 text-l">
        <p className="text-center">To be added...</p>
        <p className="text-center">Lipid classification pages</p>
        <p className="text-center">Charts</p>
        <p className="text-center">Paginated tables for lipid class members</p>
        <p className="text-center">Quick info for each lipid</p>
      </div>

      <div className="flex-row justify-center items-center mt-20 text-l">
        <Link href="lipid-maps/LMFA00000002"> Sample link for LMFA00000002</Link>
      </div>

      <div className="flex place-items-center mt-20 text-sm">
        <p>by Chetin Baloglu</p>
      </div>
    </main>
  )
}
