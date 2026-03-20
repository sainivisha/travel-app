import { users } from "./users"

export function loginUser(email: string, password: string) {

  const user = users.find(
    (u) => u.email === email && u.password === password
  )

  return user || null
}