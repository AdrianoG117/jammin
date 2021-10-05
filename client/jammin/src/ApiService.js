const BASE_URL = "http://localhost:3001";

const apiService = {};

apiService.postEvent = (event) => {
  return fetch(`${BASE_URL}/jams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.getJams = (city) => {
  return fetch(`${BASE_URL}/searchjam`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(city),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.postMessage = (message, id) => {
  return fetch(`${BASE_URL}/jams/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.getEvent = (id) => {
  return fetch(`${BASE_URL}/jams/${id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.addParticipant = (id) => {
  return fetch(`${BASE_URL}/addparticipant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.removeParticipant = (id) => {
  return fetch(`${BASE_URL}/removeparticipant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//service for user

apiService.login = (user) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.comingEvents.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
      return data;
    })
    .catch((err) => console.log(err));
};

apiService.register = (user) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.comingEvents.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
      return data;
    })
    .catch((err) => console.log(err));
};

apiService.addjam = (body) => {
  return fetch(`${BASE_URL}/addjam`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.removejam = (body) => {
  return fetch(`${BASE_URL}/removejam`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default apiService;
