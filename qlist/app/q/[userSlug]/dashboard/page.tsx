"use client"
import Image from "next/image";
import React, {useState, useEffect} from 'react';



export default function Home() {
	const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

	const [success, setSuccess] = useState("")

	const backendURL = "http://localhost:8787"

	const loginButton= async (event: any) => {
		event.preventDefault()
		const response = await fetch(backendURL + "/q/" + userSlug + "/lists")
		const data = await response.json()
		console.log(data)
		setSuccess(data)
	}


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1>Dashboard</h1>
		{success && <h1>Successfully logged in! Hello {email}!</h1>}
		{success && <p>{success}</p>}
      </div>
    </main>
  );
}
