import { ID } from "appwrite"
import { account } from "./config"

type NewUserProps = {
    name: string
    username: string
    email: string
    password: string
}

export async function createUserAccount(user: NewUserProps) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        return newAccount
    } catch (error) {
        console.log(error)
        return error
    }
}
