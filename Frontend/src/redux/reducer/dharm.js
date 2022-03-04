import * as actions from '../action/dharm'

const initState = {
  dharmData: [],
  todayDharm: {},
  pageDharm: [],
  Marquee: []
}

const dharmReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.GET_DHARM: {
      const startRoll = (e) => Math.floor(Math.random() * e)
      const dharms = action.payload.dharmData.filter((e) => e.type === 'Dharm')
      const Marquee = action.payload.dharmData.filter((e) => e.type !== 'Dharm')
      const startTodayDharm = dharms[startRoll(dharms.length)]

      return {
        ...state,
        dharmData: dharms,
        todayDharm: startTodayDharm,
        Marquee: Marquee
      }
    }

    case actions.GET_DHARM_BY_ID:
      return {
        ...state,
        pageDharm: action.payload.response
      }

    case actions.GET_TODAY_DHARM: {
      const roll = (e) => Math.floor(Math.random() * e)
      const todayDharm = state.dharmData[roll(state.dharmData.length)]

      return {
        ...state,
        todayDharm: todayDharm
      }
    }

    case actions.CREATE_DHARM:
      return {
        ...state,
        reGet: action.payload.response
      }

    case actions.EDIT_DHARM:
      return {
        ...state,
        reGet: action.payload.response
      }

    default:
      return state
  }
}

export default dharmReducer
