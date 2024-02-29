export interface LoginAdmin {
    email: string,
    password: string
}

export interface LoginUser {
    identifier: string,
    password: string
}

export interface RegisterUser {
    username: string,
    email: string,
    password: string
}