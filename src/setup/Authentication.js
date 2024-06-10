import axios from 'axios'
import useApi from './useApi'

export default function Authentication() {
  const { api } = useApi()

  function Registration(email, password, name, surname) {
    return axios.post(api + 'register', {
      email,
      name,
      surname,

      password,
      password_confirmation: password
    })
  }
  function Login(email, password) {
    return axios.post(api + 'login', {
      email,
      password
    })
  }
  return {
    Registration,
    Login
  }
}
