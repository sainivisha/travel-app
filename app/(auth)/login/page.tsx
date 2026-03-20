"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {

  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    })
  })

  if (!res.ok) {
    alert("Invalid login")
    return
  }

  const user = await res.json()

  Cookies.set("role", user.role)

  if(user.role === "admin"){
    router.push("/admin/dashboard")
  } else {
    router.push("/")
  }

}

  return (
    <div className="w-full max-w-md backdrop-blur-lg bg-white/80 shadow-xl rounded-2xl p-8">
      <h1 className="text-4xl font-semibold mb-2">Welcome Back</h1>

      <p className="text-gray-500 mb-8">Sign in to continue your journey</p>

      <div className="space-y-4">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Button className="w-full" onClick={handleLogin}>
          Sign In
        </Button>
        <Button variant="outline" className="w-full mt-3">
          Continue with Google
        </Button>
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-blue-600">
          Sign up
        </Link>
      </p>
    </div>
  );
}
