"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { toast } from 'react-toastify';
import { getAuthErrorMessage } from "@/lib/firebase-auth-errors"
import * as firebase from 'firebase/app';
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
    // console.log(firebase.auth().currentUser)
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
          {/* {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Button onClick={() => setIsSignIn(!isSignIn)}>
          </Button>
          <Button disabled={isLoading}

          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isSignIn ? 'Sign Up With Email' : 'Sign In With Email'}
          </Button> */}
        </div>
      </form>

      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button> */}
    </div>
  )
}
