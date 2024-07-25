//import { fromHono } from "chanfana";
import { Hono } from "hono";
import { cors } from 'hono/cors'

import { GetList } from "./endpoints/GetList";
import { JoinList } from "./endpoints/JoinList";

import { GetAllUserLists } from "./endpoints/GetAllUserLists";
import { GetUserList } from "./endpoints/GetUserList";

import { CreateList } from "./endpoints/CreateList";
import { DeleteList } from "./endpoints/DeleteList";

import { auth, login, logout } from "./util/auth"
import { CreateUser } from "./endpoints/CreateUser"
import { LoginUser } from "./endpoints/LoginUser"

// Start a Hono app
const api = new Hono();
api.use("*", cors())

// // Setup api registry
// const api = fromHono(app, {
// 	docs_url: "/",
// });

// Public endpoints
api.get("/list/:listSlug", await GetList);
api.post("/list/:listSlug/join", JoinList);

// User Specific Actions (to be authenticated)
api.use("/q/*", auth)

// Get list and user's lists
api.get("/q/:user/lists", GetAllUserLists);
api.get("/q/:user/:listSlug", GetUserList);
api.delete("/q/:user/:listSlug", DeleteList);

// Create a List
api.post("/q/:user/list", CreateList);

// Auth
api.post("/register", CreateUser)
api.post("/login", login, (c) => { return c.json( { message:"You Logged in as " + c.req.parseBody().email + "!"}) } )
api.get("/logout", logout, (c) => { return c.json( { message:"You Logged out!"}) } )

// Export the Hono app
export default api;
