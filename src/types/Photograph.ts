export type Photograph = {
    title: string,
    description: string,
    filePath: string,
    user: User,
    film: Film,
    camera: Camera,
}

export type User = {
    firstname: string,
    lastname: string,
    email: string
}

export type Camera = {
    name: string,
    format: string
}

export type Film = {
    name: string,
    type: string,
    isoSpeed: number, 
}