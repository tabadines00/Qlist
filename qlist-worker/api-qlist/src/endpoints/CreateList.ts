import { createListModel } from "../model/model"

export class CreateList {
	async handle(c) {
		const db_url = c.env.DB_URL
    	const db_key = c.env.DB_KEY

		// Get validated data
		const data = await c.req.parseBody()

		// Retrieve the validated request body
		const listToCreate = data.body;

		// Implement your own object insertion here
		const res = await createListModel(db_url, db_key, listToCreate)

		// return the new task
		return {
			success: true,
			list: {
				name: listToCreate.name,
				id: listToCreate.id,
				description: listToCreate.description,
				open: listToCreate.open,
				due_date: listToCreate.due_date,
				xata_createdAt: listToCreate.xata_createdAt,
				owner: listToCreate.owner
			},
		}
	}
}
