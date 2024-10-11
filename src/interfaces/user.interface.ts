export interface RegisterPayload {
    firstName: string,
    lastName: string
    username: string,
    email: string,
    password: string,
}

export interface IUser {
    firstName: string,
    lastName: string
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updateAt: Date
}
