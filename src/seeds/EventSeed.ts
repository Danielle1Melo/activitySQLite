import { faker } from '@faker-js/faker'
import { Event } from "../models/EventModels"
import { createEvent } from "../controllers/EventController"
import { listAllUsers } from "../services/UserService"

export async function createEventSeeds() {
    try {
        const users = await listAllUsers()

        if (users.length === 0) {
            console.log(`To create an event, you must have a registered user`)
            return 
        }

        for (let i = 0; i < 10; i++) {
            const random = faker.number.int({ min: 0, max: users.length - 1 })
            const userId = users[random].id

            const event: Event = {
                name: faker.company.catchPhraseAdjective() + ' ' + faker.company.buzzNoun(),
                date: faker.date.future(),
                userID: userId
            }

            await createEvent(event.name, event.date, event.userID)
        }
    } catch (error) {
        console.log(`error inserting event: ${error}}`)
    }
}