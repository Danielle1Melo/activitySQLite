import { v4 as uuid } from 'uuid'
import { User } from './../models/UserModels'
import {  checkUser } from '../validation/UserValidation'
import { createLogUser } from '../logs/UserLog'
import { createTableUser, insertUser, listAllUsers, listUserbyId, deleteUser } from '../services/UserService'

export async function createUserTable() {
    await createTableUser()
}

export async function userInsert(name: string, email: string, password: string) {

    const user: User = {
        name,
        email,
        password: password,
    }
    await insertUser(user)

}

export async function listUsers() {
    await listAllUsers()
}

export async function listUserId(id: number) {
    await listUserbyId(id)
}

export async function userDelete(id: number) {
    await deleteUser(id)

}