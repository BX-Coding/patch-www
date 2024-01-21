import { Metadata } from "next"
import Image from "next/image"
import UserAuthForm from "./UserAuthForm"
import 'firebase/compat/auth';
// import firebase from './../lib/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig, initializeFirebaseApp } from '@/lib/firebase'
import firebase from '@/lib/firebase'
import 'firebase/compat/auth';
import Link from 'next/link';


export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function SignUpPage() {
    firebase.initializeApp(firebaseConfig)
    const auth = firebase.auth()
    console.log(auth.currentUser)

    return (
        <>
            <div className="md:hidden">
                <Image
                    src="/examples/authentication-light.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/authentication-dark.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="hidden dark:block"
                />
            </div>
            <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <Image
                            src="/patch-the-penguin.svg"
                            alt="Patch the Penguin"
                            width={100}
                            height={100}
                        />
                        Patch
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;A free and open-source online coding environment built
                                to help Scratchers transition their skills to Python.&rdquo;
                            </p>
                            {/* <footer className="text-sm">Sofia Davis</footer> */}
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <UserAuthForm />
                        </div>
                        {/* <UserAuthForm /> */}
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}