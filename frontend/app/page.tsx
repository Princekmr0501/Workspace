"use client"
import { useEffect, useState } from "react"

export  default function Home() {

  const [health, setHealth] = useState({
    status: "",
    message: "",
    uptime: "",
    environment: ""
  })

  useEffect(() => {
    fetch("http://localhost:5000/health")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setHealth(data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Frontend is running</h1>

      <h2>Backend Health Status:</h2>

      <p>Status: {health.status}</p>
      <p>Message: {health.message}</p>
      <p>Uptime: {health.uptime}</p>
      <p>Environment: {health.environment}</p>

    </div>
  )
}

