"use client"

import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UserMenu() {

  const router = useRouter()

  const role =
    typeof window !== "undefined"
      ? localStorage.getItem("role")
      : null

const logout = () => {

  Cookies.remove("role")
  Cookies.remove("email")

  router.push("/login")
}

  return (
    <DropdownMenu>

      <DropdownMenuTrigger>

        <Avatar className="cursor-pointer">

          <AvatarFallback>
            U
          </AvatarFallback>

        </Avatar>

      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuItem
          onClick={() => router.push("/profile")}
        >
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/bookings")}
        >
          My Bookings
        </DropdownMenuItem>

        {role === "admin" && (
          <DropdownMenuItem
            onClick={() => router.push("/admin/dashboard")}
          >
            Admin Dashboard
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={logout}
        >
          Logout
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  )
}