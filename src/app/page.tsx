"use client"

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CodeCard } from '@/components/code-card'
import { HomeNavigation } from '@/components/home-navigation'
import AboutSection from '@/components/about-section'
import { firebaseConfig } from '@/lib/firebase'
import firebase from '@/lib/firebase'
import 'firebase/compat/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  firebase.initializeApp(firebaseConfig)

  
  const test = () => {
    console.log(firebase.auth().currentUser)
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen'>
      <div className="flex min-h-screen flex-col items-center justify-between p-24 h-screen w-full">
        <div className="flex w-full items-center justify-end my-2">
          <HomeNavigation />
        </div>
        <div className="w-full h-3/4 bg-[url(/ed-background.jpeg)] bg-contain bg-repeat flex items-center justify-center border rounded-xl">
          <div className="flex justify-center items-center bg-white py-5 px-10 rounded-full border">
            <Image
              src="/patch-the-penguin.svg"
              alt="Patch the Penguin"
              width={100}
              height={100}
            />
            <Separator className="h-[100px] m-2" orientation="vertical" />
            <div className='flex flex-col'>
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Patch
              </h1>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Block → Text
              </h4>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-4 relative -top-10">
          <CodeCard title="Loops" blockHref={'blockspin.svg'} code={'while True:\n\tturnLeft(15)'}
            className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          />
          <CodeCard title="Functions" blockHref={'blockfunction.svg'} code={'def spin():\n\tturnLeft(15)'}
            className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          />
          <CodeCard title="Conditions" blockHref={'blockconditional.svg'} code={'if mouseDown():\n\tturnLeft(15)'}
            className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          />
        </div>
        {!firebase.auth().currentUser ?
          <Button>
            <Link href='/auth'>
              Start Coding    
            </Link>
          </Button>
          :
          <Button onClick={test}>
            acc name
          </Button>
        }


      </div>
      <div className="flex flex-col items-start">
        <h1 className="text-3xl mb-2 font-extrabold tracking-tight lg:text-3xl">
          What is Patch?
        </h1>
        <AboutSection />
      </div>
    </main>
  )
}
