"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignupPage(){

  const router = useRouter()

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSignup = async () => {

    const res = await fetch("/api/auth/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    })

    if(!res.ok){
      alert("Signup failed")
      return
    }

    alert("Account created")

    router.push("/login")
  }

  return(

    <div className="w-full max-w-md">

      <h1 className="text-4xl font-semibold mb-2">
        Create Account
      </h1>

      <p className="text-gray-500 mb-8">
        Start your travel journey
      </p>

      <div className="space-y-4">

        <Input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <Input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={handleSignup}
        >
          Create Account
        </Button>

      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600">
          Login
        </Link>
      </p>

    </div>

  )
}