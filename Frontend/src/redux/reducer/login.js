import * as actions from '../action/login'

const initState = {
  login: false,
  visitorCounter: 0
}

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        login: action.payload.login
      }

    case actions.CHECK_TOKEN:
      return {
        ...state,
        login: action.payload.login
      }

    case actions.LOGOUT:
      document.cookie = 'token=null; max-age=0'
      return {
        ...state,
        login: false
      }

    case actions.GET_VISITOR_COUNTER:
      return {
        ...state,
        visitorCounter: action.payload.getVisitorCounterData.times
      }

    default:
      return state
  }
}

export default loginReducer
