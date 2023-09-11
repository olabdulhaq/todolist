import axios from 'axios'

const currentHour = new Date().getHours()

export const baseurl = 'https://todolist-5e4p.onrender.com'

export const axiosInstance = axios.create({
  baseURL: 'https://todolist-5e4p.onrender.com',
})


export const greetingMessage =
currentHour >= 4 && currentHour < 12
  ? 'Good Morning!'
  : currentHour >= 12 && currentHour <= 17
  ? 'Good Afternoon!'
  : currentHour > 17 || currentHour < 4
  ? 'Good Evening!'
  : 'Welcome'