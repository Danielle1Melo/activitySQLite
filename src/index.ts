
import { v4 as uuidv4 } from 'uuid';
import { Event, Log, User } from './utils/utils';
import { createTableEvent, createTableLog, deleteEvent, dropTables, insertEvent, insertLog, listAllEvents, listEventbyId } from './utils/sql';

const newUser: User = {
    id: uuidv4(),
    name: "Danielle Melo",
    email: "dani@Melo",
    password: "123"
} 

const newEvent: Event = {
    name: "Hubee",
    date: "15-02-2024",
    user: newUser.id
}

const secondEvent: Event = {
    name: "Teste",
    date: "18-02-2024",
    user: newUser.id
}

const newLog: Log = {
    action: "insert",
    tableName: newEvent.name,
    userId: newUser.id,
    timestamp: new Date()
}

//createTableEvent();
//createTableLog();
//insertEvent(newEvent);
//insertLog(newLog);
//listAllEvents();
//listEventbyId(1);
deleteEvent(2)

//dropTables()



