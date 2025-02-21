import { faker } from '@faker-js/faker'
import { User } from "../models/UserModels"
import { userInsert } from "../controllers/UserController"

export async function UserInsertSeeds() {   
    for(let i = 0; i < 10; i++) {
        const user: User = {
            name: faker.internet.username(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 8, 
                pattern: /[A-Za-z0-9!@#$%^&*(),.?":{}|<>]/,
            })
        }

        await userInsert(user.name, user.email, user.password)
    }
}