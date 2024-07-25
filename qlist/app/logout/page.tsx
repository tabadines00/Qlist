"use client"
import Image from "next/image";
import React, {useState, useEffect} from 'react';

export default function Home() {

	const backendURL = "http://localhost:8787"

	const [success, setSuccess] = useState("")

	useEffect(() => {
		const getLogout = async () => {
			const response = await fetch(backendURL + "/logout")
			const data = await response.json()
			console.log(data.message)
			setSuccess(data.message)
		}
		getLogout()
	}, [])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
		{success && <h1>You have successfully logged out!</h1>}
      </div>
    </main>
  );
}
