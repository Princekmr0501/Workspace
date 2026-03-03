import { useState } from "react"

export default function CreateOrg() {
  const [name, setName] = useState("")
  const [org, setOrg] = useState<any>(null)

  const createOrganization = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      alert("Please login first")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/api/orgs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      })

      const data = await response.json()
      setOrg(data)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Create Organization</h2>

      <input
        type="text"
        placeholder="Organization name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createOrganization}>
        Create
      </button>

      {org && (
        <pre>{JSON.stringify(org, null, 2)}</pre>
      )}
    </div>
  )
}