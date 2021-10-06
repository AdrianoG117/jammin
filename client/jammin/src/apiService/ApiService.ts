import {Jam, Message, User} from "./APIResponseTypes";

const BASE_URL = "http://localhost:3001";



const postEvent = (event: Jam): Promise<Jam | void> => {
  return fetch(`${BASE_URL}/jams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .then((data:Jam) => data )
    .catch((err) => console.log(err));
};

interface searchValue {
    city: string
  }

const getJams = (city:searchValue): Promise<Jam[] | void> =>{
  return fetch(`${BASE_URL}/searchjam`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(city),
  })
    .then((res) => res.json())
    .then((data: Jam[]) => data)
    .catch((err) => console.log(err));
};

const postMessage = (message: Message, id: string): Promise<Message[] | void> =>  {
  return fetch(`${BASE_URL}/jams/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  })
    .then((res) => res.json())
    .then((data: Message[]) => data)
    .catch(err => console.log(err));
};

const getEvent = (id:string): Promise<Jam[] | void> => {
  return fetch(`${BASE_URL}/jams/${id}`)
    .then((res) => res.json())
    .then((data: Jam[]) => data)
    .catch((err) => console.log(err));
};

const addParticipant = (id:string): Promise<Jam | void> => {
  return fetch(`${BASE_URL}/addparticipant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
  })
    .then((res) => res.json())
    .then((data: Jam) => data)
    .catch((err) => console.log(err));
};

const removeParticipant = (id:string): Promise<Jam | void> => {
  return fetch(`${BASE_URL}/removeparticipant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
  })
    .then((res) => res.json())
    .then((data: Jam) => data)
    .catch((err) => console.log(err));
};

//service for user

 const login = (user: { email: string, password: string,}): Promise<User | void> => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data: User) => {
      data.comingEvents.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
      return data;
    })
    .catch((err) => console.log(err));
};

const register = (user: User): Promise<User | void> => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data: User) => {
      console.log(data);
      data.comingEvents.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
      return data;
    })
    .catch((err) => console.log(err));
};

const addJam = (body:{id:string, jamId:string}):void => {
  fetch(`${BASE_URL}/addjam`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const removeJam = (body:{id:string, jamId:string}): void => {
  fetch(`${BASE_URL}/removejam`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default {removeJam, addJam, register, postMessage, postEvent, getJams, getEvent, addParticipant, removeParticipant, login};
