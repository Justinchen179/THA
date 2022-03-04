import { performREST, SERVER_URL } from '../../models/tool'
export const GET_DHARM = 'GET_DHARM'
export const GET_TODAY_DHARM = 'GET_TODAY_DHARM'
export const CREATE_DHARM = 'CREATE_DHARM'
export const GET_DHARM_BY_ID = 'GET_DHARM_BY_ID'
export const EDIT_DHARM = 'EDIT_DHARM'
export const DELETE_DHARM = 'DELETE_DHARM'
export const CHANGE_HOME_TITLE = 'CHANGE_HOME_TITLE'

const serverURL = SERVER_URL

export const getDharm = async () => {
  const URL = `${serverURL}/api/Dharma`
  let dharmData = await performREST(URL, null, 'GET')

  if (dharmData.length === 0) {
    dharmData = [{ title: 'null', content: 'null' }]
  } else if (dharmData !== undefined) {
    dharmData.reverse()
  }

  return {
    type: GET_DHARM,
    payload: {
      dharmData
    }
  }
}

export const getDharmByID = async (ID = null) => {
  if (ID === null) return

  const URL = `${serverURL}/api/Dharma/${ID}`
  const response = await performREST(URL, null, 'GET')

  return {
    type: GET_DHARM_BY_ID,
    payload: {
      response
    }
  }
}

export const getTodaydharm = () => {
  return {
    type: GET_TODAY_DHARM,
    payload: {}
  }
}

export const createDharm = async (content, type) => {
  const URL = `${serverURL}/api/Dharma`
  const DharmData = new FormData()

  DharmData.append('type', type.toString())
  DharmData.append('content', content.toString())

  const response = await performREST(URL, DharmData, 'POST')

  return {
    type: CREATE_DHARM,
    payload: {
      response
    }
  }
}

export const editDharm = async (content, id, type) => {
  const URL = `${serverURL}/api/Dharma/${id.toString()}`
  const DharmData = new FormData()

  DharmData.append('content', content.toString())
  DharmData.append('type', type.toString())
  DharmData.append('id', id.toString())

  const response = await performREST(URL, DharmData, 'PUT')

  return {
    type: EDIT_DHARM,
    payload: {
      response
    }
  }
}

export const changeHomeTitle = async (content) => {
  const URL = `${serverURL}/api/Dharma`
  const DharmData = new FormData()

  DharmData.append('content', content.toString())
  DharmData.append('type', 'Marquee')

  const response = await performREST(URL, DharmData, 'PUT')

  return {
    type: CHANGE_HOME_TITLE,
    payload: {
      response
    }
  }
}

export const deleteDharm = async (id) => {
  const URL = `${serverURL}/api/Dharma/${id.toString()}`
  const DharmData = new FormData()

  DharmData.append('id', id.toString())

  const response = await performREST(URL, DharmData, 'DELETE')

  return {
    type: DELETE_DHARM,
    payload: {
      response
    }
  }
}
