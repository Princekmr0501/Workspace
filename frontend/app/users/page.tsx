"use client"
import { useEffect, useState } from "react"
type User = {
  id: string
  email: string
  password: string
  createdAt: string
}

export  default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("http://localhost:5000/fetch-user")
        const data = await res.json()
        setUsers(data.users)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Users from Database</h1>

      {users.map((user) => (
        <div key={user.id} style={{ marginBottom: "10px" }}>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
          <p>Created At: {user.createdAt}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}
