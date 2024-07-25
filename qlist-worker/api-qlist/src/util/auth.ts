import { Hono } from 'hono'
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from 'hono/cookie'

import { loginHandler, logoutHandler, authCheck } from "../model/model"

export const auth = async (c, next) => {
	const db_url = c.env.DB_URL
   	const db_key = c.env.DB_KEY
//	const sessionCookie = getCookie(c, 'session')
//	if (sessionCookie) {
//		await next()
//	} else {
//			
//	}
	//setCookie(c, 'session', 'macha')
	//deleteCookie(c, 'session')
	const authHeader = c.req.header('Authorization')
	
	if (!authHeader) {
		return c.json({ error: 'Unauthorized', ok: false }, 401)	
	} else {
		await next()
	}
}

export const login = async (c, next) => {
	const db_url = c.env.DB_URL
   	const db_key = c.env.DB_KEY
//	const sessionCookie = getCookie(c, 'session')
//	if (sessionCookie) {
//		await next()
//	} else {
//			
//	}
	//setCookie(c, 'session', 'macha')
	//deleteCookie(c, 'session')
	const authHeader = await c.req.header('Authorization')
	const body = await c.req.json()
	console.log(body)
	
	if (!authHeader) {
		const user = await loginHandler(db_url, db_key, body.email, body.pass)
		if(user) {
			const data = user.records[0]
			console.log(data)
			console.log("Hello, " + data.email + "! You Signed in!")
			c.header('Authorization', data.session)
			// Set cookies too?
		} else {
			return c.json({error:'Incorrect Username or Password', ok: false}, 400)
		}
	}
	await next()
}

export const logout = async (c, next) => {
	//const db_url = c.env.DB_URL
    //const db_key = c.env.DB_KEY
//	const sessionCookie = getCookie(c, 'session')
//	if (sessionCookie) {
//		await next()
//	} else {
//			
//	}
	//setCookie(c, 'session', 'macha')
	//deleteCookie(c, 'session')
	const authHeader = await c.req.header('Authorization')
	if (authHeader) {
		console.log("Goodbye! You Signed out!")
		c.header('Authorization', null)
	} else {
		console.log("Oops! Not currently logged in!")
	}
	await next()
}