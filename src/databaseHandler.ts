import { openDB } from 'idb'
import { Customer } from './models/Customer'

const DATABASE_NAME = "CustomerDB"

initDB().then(() => {
    console.log("Database initialized complete!")
})

export const insertCustomer = async (customerInfo: Customer) => {
    const db = await openDB(DATABASE_NAME, 5)
    const key = await db.put("customers", customerInfo)
    console.log("inserted customer " + key)
}

export const getAllCustomer = async () => {
    const db = await openDB(DATABASE_NAME, 5)
    return await db.getAll("customers")
}

export const getCustomerById = async (id: number) => {
    const db = await openDB(DATABASE_NAME, 5)
    return await db.get("customers", id)
}

export const deleteCustomerById = async (id: number) => {
    const db = await openDB(DATABASE_NAME, 5)
    return await db.delete("customers", id)
}

async function initDB() {
    const db = await openDB(DATABASE_NAME, 5, {
        upgrade(db) {
            const store = db.createObjectStore('customers', {
                keyPath: 'id',
                autoIncrement: true
            })
        }
    })
}