export interface Jam {
  _id?: string
  title: string
  date: string
  description: string
  city: string
  cityCords: {
    lat: number
    lng: number
  }
  location: string
  locCords: {
    lat: number
    lng: number
  }
  host?: string
  numOfParticipants: number
  languages: string
  pastEvent: boolean
  comingEvent: true
  messages: Message[]
  __v?: number
}

export interface Message {
  name: string
  message:string
}

export interface User {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  pastEvents: Jam[],
  comingEvents: Jam[],
  _id?: string
  __v?: number
}