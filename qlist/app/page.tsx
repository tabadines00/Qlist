"use client"
import Image from "next/image";
import React, {useState, useEffect} from 'react';



export default function Home() {
	const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

	const backendURL = "http://localhost:8787"

	const loginButton= async (event: any) => {
		event.preventDefault()
		const response = await fetch(backendURL + "/login", {
			method: "POST",
			headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        	},
			body: JSON.stringify({
				email: email,
				pass: pass
			})
		})
		console.log(await response.body)
	}


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1>Quickly create waitlists for your launches!</h1>
        <button>Start Now</button>
		<form onSubmit={loginButton} className="">
            <label className="">Email</label>
            <input className="" placeholder="Email" value={email} onChange={(event) => {setEmail(event.target.value)}}/>

            <label className="">Password</label>
            <input className="" placeholder="Password" value={pass} onChange={(event) => {setPass(event.target.value)}}/>
            <button type="submit" className="">Login</button>
        </form>
      </div>
    </main>
  );
}
