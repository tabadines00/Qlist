"use client"
import Image from "next/image";
import React, {useState, useEffect} from 'react';

export default function Page({ params }: { params: { listID: string } }) {
	const backendURL = "http://localhost:8787"
	
	const [data, setData] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			console.log(backendURL + "/list/" + params.listID)
			const response = await fetch(backendURL + "/list/" + params.listID)
			const body = await response.json()
			console.log(body)
			setData(await body.response.records[0])
		}
		fetchData()
	}, [])
		

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
		  <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
			<h1 className="text-2xl">{data.name}</h1>
			<p>{data.due_date}</p>
			<p>{data.description}</p>
			<br />
			<p>Join this list</p>
			<button>Join List</button>
		  </div>
		</main>
	);
}
