import { createTableEvent, insertEvent, listAllEvents, listEventbyId, deleteEvent} from '../services/EventService'
import { Event } from '../models/EventModels'


export async function createEventController() {
    await createTableEvent()
}

export async function eventInsert(name: string, date: Date, userID: number) {
    const event: Event = {
        name,
        date,
        userID,
    }

   await insertEvent(event)

}

export async function listEvents() {
    await listAllEvents()
}

export async function listEventByid(id: number) {
    await listEventbyId(id)
}


export async function eventDelete(id: number) {
    await deleteEvent(id)
}