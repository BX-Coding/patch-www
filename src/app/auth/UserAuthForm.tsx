"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, firebaseConfig } from "@/lib/firebase"
import { toast } from 'react-toastify';
import { getAuthErrorMessage } from "@/lib/firebase-auth-errors"
import firebase from '@/lib/firebase'
import 'firebase/auth';


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function UserAuthForm({ className, ...props }: UserAuthFormProps) {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [emailText, setEmailText] = React.useState<string>('')
  const [passwordText, setPasswordText] = React.useState<string>('');
  const [isSignIn, setIsSignIn] = React.useState<boolean>(false)

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    setIsLoading(true)

    // setTimeout(() => {
    //   setIsLoading(false)
    // }, 3000)

    try {
      if (isSignIn) {
        signInWithEmailAndPassword(auth, emailText, passwordText).catch((error) => {
          toast.error(getAuthErrorMessage(error.code));
        }).then((userCredential) => {
          if (userCredential) {
            toast.success("Signed in successfully!");
            // handleClose();
            setIsLoading(false)
          }
        });
      } else {
        createUserWithEmailAndPassword(auth, emailText, passwordText).catch((error) => {
          toast.error(getAuthErrorMessage(error.code));
        }).then((userCredential) => {
          if (userCredential) {
            toast.success("Signed in successfully!");
            // handleClose();
            setIsLoading(false)
          }
        })
      }
    } catch (error) {
      console.log("Authentication error: ", error)
    }
  }


  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailText(event.target.value)
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordText(event.target.value)
  }



  const forgotPassword = () => {
    console.log(firebase.auth().currentUser)
  }


  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={onEmailChange}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="password"
              placeholder="enter password..."
              type="password"
              disabled={isLoading}
              onChange={onPasswordChange}
            />
          </div>
          <p className="text-sm text-muted-foreground" onClick={forgotPassword}>
            Forgot password?
          </p>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign in with email
          </Button>
        </div>
      </form>
    </div>
  )
}
