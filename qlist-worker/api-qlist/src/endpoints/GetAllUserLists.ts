import { getAllUserListsModel } from "../model/model"

export const GetList = async (c) => {
	const db_url = c.env.DB_URL
	const db_key = c.env.DB_KEY

	const userSlug = c.req.param("userSlug")

	// Implement your own object insertion here
	const res = await getListModel(db_url, db_key, userSlug)

	// return the new task
	return c.json({
		success: true,
		response: await res,
	})
}
