import inquirer from 'inquirer'
import * as eventController from '../src/controllers/EventController'
import * as userController from '../src/controllers/UserController'
import { UserInsertSeeds } from './seeds/UserSeed'
import { createEventSeeds } from './seeds/EventSeed'


export let loggedInUser: string | null = null

async function authenticateUser() {
    const adminCredentials = {
        username: 'Dani',
        password: '@Dani1234'
    }

    let authenticated = false

    while (!authenticated) {
        const { username, password } = await inquirer.prompt([
            { type: 'input', name: 'username', message: 'Enter your username:' },
            { type: 'password', name: 'password', message: 'Enter your password:', mask: '*' }
        ])

        if (username === adminCredentials.username && password === adminCredentials.password) {
            console.log(` Welcome, ${adminCredentials.username}!`)
            loggedInUser = adminCredentials.username
            authenticated = true
        } else {
            console.log(`Incorrect username or password! Try again.`)
        }
    }
}

async function mainMenu() {
    const { option } = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Select one of the options:',
            choices: [
                { name: '1 - Create an event', value: 'createEvent' },
                { name: '2 - List all events', value: 'listEvents' },
                { name: '3 - List an event by ID', value: 'listEventById' },
                { name: '4 - Delete a event', value: 'deleteEvent' },
                { name: '5 - Create a user', value: 'createUser' },
                { name: '6 - List all users', value: 'listUsers' },
                { name: '7 - List a user by ID', value: 'listUserById' },
                { name: '8 - Delete a user', value: 'deleteUser' },
                { name: '9 - Add multiple users ', value: 'userSeed' },
                { name: '10 - Add multiple events', value: 'eventSeed' },
                { name: '11 - Exit', value: 'exit' }
            ]
        }
    ])

    console.log("Selected option:", option)

    switch (option) {
        case 'createEvent': {
            const { name, date, userId } = await inquirer.prompt([
                { type: 'input', name: 'name', message: 'Event name:' },
                { type: 'input', name: 'date', message: 'Event data:' },
                { type: 'number', name: 'userId', message: 'ID of the person responsible:' }
            ])
            
            await eventController.eventInsert(name, date, userId)
            break
        }
        case 'listEvents':
            await eventController.listEvents()
            break
        case 'listEventById': {
            const { eventId } = await inquirer.prompt([{ type: 'number', name: 'eventId', message: 'Event id:' }])
            await eventController.listEventByid(eventId)
            break
        }
        case 'deleteEvent': {
            const { deleteId } = await inquirer.prompt([{ type: 'number', name: 'deleteId', message: 'What is the event id to delete?' }])
            await eventController.eventDelete(deleteId) 
            console.log(`Event ID ${deleteId} successfully deleted.`) 
            break
        }
        case 'createUser': {
            const { name, email, password } = await inquirer.prompt([
                { type: 'input', name: 'name', message: 'Name:' },
                { type: 'input', name: 'email', message: 'Email:' },
                { type: 'password', name: 'password', message: 'Password:', mask: '*' }
            ])
            await userController.userInsert(name, email, password)
            break
        }
        case 'listUsers':
            await userController.listUsers()
            break
        case 'listUserById': {
            const { userId } = await inquirer.prompt([{ type: 'number', name: 'userId', message: 'User id:' }])
            await userController.listUserId(userId)
            break
        }
        case 'deleteUser': {
            const { deleteId } = await inquirer.prompt([{ type: 'number', name: 'deleteId', message: 'What is the user id to delete?' }])
            await userController.userDelete(deleteId) 
            console.log(`User ID ${deleteId} successfully deleted.`) 
            break
        }
        case 'userSeed':
            await UserInsertSeeds()
            break
        case 'eventSeed':
            await createEventSeeds()
            break
        case 'exit':
            console.log(`Leaving!`)
            process.exit(0)
    }

    await mainMenu()
}

export async function main() {
    await authenticateUser()
    await mainMenu()
}

userController.createUserTable()
eventController.createEventController()
main()
