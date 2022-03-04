import { performREST, getCookie, SERVER_URL } from '../../models/tool'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const CHECK_TOKEN = 'CHECK_TOKEN'
export const GET_VISITOR_COUNTER = 'GET_VISITOR_COUNTER'
export const ADD_VISITOR_COUNTER = 'ADD_VISITOR_COUNTER'

const serverURL = SERVER_URL

export const login = async (username = 'null', password = 'null') => {
  const URL = `${serverURL}/api/Login`
  const loginData = new FormData()

  loginData.append('id', username.toString())
  loginData.append('password', password.toString())

  const response = await performREST(URL, loginData, 'POST')

  document.cookie = `token=${response.token}; max-age=3600`
  return {
    type: LOGIN,
    payload: {
      login: response.status
    }
  }
}

export const logout = () => ({
  type: LOGOUT,
  payload: {}
})

export const tokenCheck = async () => {
  const token = getCookie(document.cookie, 'token')

  if (!token) {
    return {
      type: CHECK_TOKEN,
      payload: {
        login: false
      }
    }
  }

  const URL = `${serverURL}/api/TokenCheck`
  const response = await performREST(URL, null, 'POST')

  return {
    type: CHECK_TOKEN,
    payload: {
      login: response.status
    }
  }
}

export const getVisitorCounter = async () => {
  const URL = `${serverURL}/api/VisitorCounter`
  const getVisitorCounterData = await performREST(URL, null, 'GET')

  return {
    type: GET_VISITOR_COUNTER,
    payload: {
      getVisitorCounterData
    }
  }
}

export const addVisitorCounter = () => {
  const VisitorCounter = getCookie(document.cookie, 'VisitorCounter')

  if (!VisitorCounter) {
    document.cookie = 'VisitorCounter=true; max-age=3600'

    const URL = `${serverURL}/api/addVisitorCounter`

    performREST(URL, null, 'GET')
  }

  return {
    type: ADD_VISITOR_COUNTER,
    payload: {}
  }
}
