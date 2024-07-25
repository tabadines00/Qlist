const xataClient = async (db: string, dbkey: string, query: string, params?: string[]): any => {
    const response: any = await fetch(db, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + dbkey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ statement: query, params: params ? params : [] })
    })
    console.log(response)
    
    return await response.json()
}

// List Functions

export const createListModel = async (db: string, dbkey: string, listToCreate: any): Promise<any> => {
    let query = "INSERT INTO \"Events\" (name, description, open, due_date, owner) VALUES ($1,$2,$3,$4,$5) RETURNING *;"
    let params = [listToCreate.name, listToCreate.description, listToCreate.open, listToCreate.due_date, listToCreate.owner]
    const res = await xataClient(db, dbkey, query, params)
    return res
}

export const getListModel = async (db: string, dbkey: string, listSlug: string): Promise<any[]> => {
    let query = "SELECT * FROM \"Events\" WHERE slug=$1;"
    let params = [listSlug]
    const list = await xataClient(db, dbkey, query, params)
    return list
}

// Auth Functions
export const loginHandler = async (db: string, dbkey: string, email: string, pass: string): Promise<any[]> => {
    let query = "SELECT \"Users\".email, pass, session FROM \"Logins\" LEFT JOIN \"Users\" ON \"Logins\".user_fk=\"Users\".id WHERE \"Users\".email=$1 AND \"Logins\".pass=$2;"
    let params = [email, pass]
    const user = await xataClient(db, dbkey, query, params)
    return user
}

// User Functions

export const getAllUserLists = async (db: string, dbkey: string): Promise<any[]> => {
    let query = "SELECT * FROM \"users\";"
    const users = await xataClient(db, dbkey, query)
    return users
}

export const getUsers = async (db: string, dbkey: string): Promise<any[]> => {
    let query = "SELECT * FROM \"users\";"
    const users = await xataClient(db, dbkey, query)
    return users
}

export const getUser = async (db: string, dbkey: string, id: string): Promise<any> => {
    let query = "SELECT * FROM \"users\" WHERE id=$1;"
    let params = [id]
    const user = await xataClient(db, dbkey, query, params)
    return user
}

export const createUser = async (db: string, dbkey: string, user: any): Promise<any> => {
    let query = "INSERT INTO \"users\" (first_name, email) VALUES ($1,$2) RETURNING *;"
    let params = [user.first_name, user.email]
    const res = await xataClient(db, dbkey, query, params)
    return res
}
