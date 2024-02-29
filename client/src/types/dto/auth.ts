export type Admin = {
    id: number,
    firstname: string,
    lastname?: string,
    username: string,
    email: string,
    isActive: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string
}

export type User = {
    birthdate: string | null
    blocked: boolean
    confirmed: boolean
    createdAt: string
    email: string
    firstName: string | null
    id: number
    lastName: string | null
    number: string | null
    provider: "local"
    updatedAt: string
    username: string
}