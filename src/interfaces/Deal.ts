export interface Deals {
    [key: string]: Deal[],
}


export interface Deal {
    text: string,
    image: string,
    id: number,
    url?: string,
}