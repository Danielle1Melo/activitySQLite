export interface Event {
    id?: number,
    name: string, 
    date: string,
    user: string
}

export interface User {
    id: string,
    name: string,
    email: string,
    password: string
}

export interface Log {
    id?: number,
    action: string,
    tableName: string,
    userId: string,
    timestamp: Date
}
