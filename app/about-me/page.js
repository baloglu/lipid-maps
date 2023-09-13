import Image from 'next/image'
import Head from 'next/head'
import {headers} from 'next/headers'

export const metadata = {
    title: 'Chetin Baloglu',
  }

export default function AboutMe(){
    const headersList = headers()
    const referer = headersList.get('referer')
    console.log(headersList)
    return (
        <main className='w-full'>
            <p>Chetin Baloglu</p>
            <p>{referer}</p>
        </main>
    )
}