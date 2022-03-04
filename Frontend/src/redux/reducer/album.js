import { displayNext, displayPrevious } from '../../models/tool'
import * as actions from '../action/album'

const initState = {
  homeAlbumDisplayIndex: 3,
  albumListDisplayIndex: 12,
  albumDisplayIndex: 12,
  homeAlbumIndex: 0,
  albumListIndex: 0,
  ceremonyListIndex: 0,
  albumPageIndex: 0,
  blackButton: 0,
  homeNews: [],
  homeSlider: [],
  homeAlbum: [],
  ceremonyPageData: [],
  socialEducationPageData: [],
  welfareServicePageData: [],
  charitableReliefPageData: [],
  volunteerPageData: [],
  albumListData: [],
  pageAlbum: [],
  pageAlbumPicture: [],
  albumDataManager: [],
  welfareServiceDataManager: [],
  ceremonyDataManager: [],
  albumSliderManager: [],
  pageAlbumManager: [],
  ceremonyListData: [],
  socialEducationListData: [],
  welfareServiceListData: [],
  charitableReliefListData: [],
  volunteerListData: []
}

const albumReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.GET_ALBUM: {
      const allAlbumData = action.payload.albumData

      const homeSliderAlbum = allAlbumData.filter(
        (e) => e.type === 'sliderAlbum'
      )

      const homeSliderPicture = homeSliderAlbum[0].pictures.reverse()
      const sliderNumber = homeSliderPicture.length
      let replay = []

      if (sliderNumber < 6) {
        for (let i = 0; i < sliderNumber * 2; i++) {
          replay[i] = homeSliderPicture[i < sliderNumber ? i : i - sliderNumber]
        }
      } else {
        replay = homeSliderPicture
      }

      replay.unshift(replay[replay.length - 1])
      replay.pop()
      return {
        ...state,
        homeNewsData: allAlbumData.filter((e) => e.type !== 'sliderAlbum'),
        homeNews: allAlbumData.filter((e) => e.type !== 'sliderAlbum')[0],
        ceremonyPageData: allAlbumData.filter((e) => e.type === 'Ceremony'),
        socialEducationPageData: allAlbumData.filter(
          (e) => e.type === 'SocialEducation'
        ),
        welfareServicePageData: allAlbumData.filter(
          (e) => e.type === 'WelfareService'
        ),
        charitableReliefPageData: allAlbumData.filter(
          (e) => e.type === 'CharitableRelief'
        ),
        volunteerPageData: allAlbumData.filter((e) => e.type === 'Volunteer'),
        homeAlbum: allAlbumData
          .filter((e) => e.type === 'Ceremony')
          .slice(0, state.homeAlbumDisplayIndex),
        ceremonyListData: allAlbumData
          .filter((e) => e.type === 'Ceremony')
          .slice(0, state.albumListDisplayIndex),
        socialEducationListData: allAlbumData
          .filter((e) => e.type === 'SocialEducation')
          .slice(0, state.albumListDisplayIndex),
        welfareServiceListData: allAlbumData
          .filter((e) => e.type === 'WelfareService')
          .slice(0, state.albumListDisplayIndex),
        charitableReliefListData: allAlbumData
          .filter((e) => e.type === 'CharitableRelief')
          .slice(0, state.albumListDisplayIndex),
        volunteerListData: allAlbumData
          .filter((e) => e.type === 'Volunteer')
          .slice(0, state.albumListDisplayIndex),
        homeSlider: replay
      }
    }

    case actions.GET_ALBUM_BY_MANAGER:
      return {
        ...state,
        albumDataManager: action.payload.Albumdbs
      }

    case actions.GET_ALBUM_BY_ID:
      return {
        ...state,
        pageAlbum: action.payload.response,
        pageAlbumPicture: action.payload.response.pictures.slice(
          0,
          state.albumListDisplayIndex
        )
      }

    case actions.CHANGE_HOME_NEWS:
      return {
        ...state,
        homeNews: state.homeNewsData[action.payload.changeIndex],
        blackButton: action.payload.changeIndex
      }

    case actions.GET_ALBUM_BY_ID_BY_MANAGER:
      return {
        ...state,
        pageAlbumManager: action.payload.response
      }

    case actions.PREVIOUS_HOME_ALBUM: {
      const homeAlbumPreviousData = displayPrevious(
        state.ceremonyPageData,
        state.homeAlbumDisplayIndex,
        state.homeAlbumIndex
      )

      return {
        ...state,
        homeAlbum: homeAlbumPreviousData.Previous,
        homeAlbumIndex: homeAlbumPreviousData.PagePreIndex
      }
    }

    case actions.NEXT_HOME_ALBUM: {
      const homeAlbumNextData = displayNext(
        state.ceremonyPageData,
        state.homeAlbumDisplayIndex,
        state.homeAlbumIndex
      )

      return {
        ...state,
        homeAlbum: homeAlbumNextData.Next,
        homeAlbumIndex: homeAlbumNextData.PageNextIndex
      }
    }

    case actions.PREVIOUS_ALBUM_LIST: {
      const albumPreviousType = action.payload.albumType

      const previousAlbumPageData =
        albumPreviousType.replace(
          albumPreviousType[0],
          albumPreviousType[0].toLowerCase()
        ) + 'PageData'

      const previousAlbumListData =
        albumPreviousType.replace(
          albumPreviousType[0],
          albumPreviousType[0].toLowerCase()
        ) + 'ListData'

      const albumListPreviousData = displayPrevious(
        state[previousAlbumPageData],
        state.albumDisplayIndex,
        state.albumListIndex
      )

      const Previous = {}

      Previous[previousAlbumListData] = albumListPreviousData.Previous
      return {
        ...state,
        ...Previous,
        albumListIndex: albumListPreviousData.PagePreIndex
      }
    }

    case actions.NEXT_ALBUM_LIST: {
      const albumNextType = action.payload.albumType

      const NextAlbumPageData =
        albumNextType.replace(
          albumNextType[0],
          albumNextType[0].toLowerCase()
        ) + 'PageData'

      const NextAlbumListData =
        albumNextType.replace(
          albumNextType[0],
          albumNextType[0].toLowerCase()
        ) + 'ListData'

      const albumListNextData = displayNext(
        state[NextAlbumPageData],
        state.albumDisplayIndex,
        state.albumListIndex
      )

      const Next = {}

      Next[NextAlbumListData] = albumListNextData.Next
      return {
        ...state,
        ...Next,
        albumListIndex: albumListNextData.PageNextIndex
      }
    }

    case actions.PREVIOUS_ALBUM_PAGE: {
      const albumPagePreviousData = displayPrevious(
        state.pageAlbum.pictures,
        state.albumDisplayIndex,
        state.albumPageIndex
      )

      return {
        ...state,
        pageAlbumPicture: albumPagePreviousData.Previous,
        albumPageIndex: albumPagePreviousData.PagePreIndex
      }
    }

    case actions.NEXT_ALBUM_PAGE: {
      const albumPageNextData = displayNext(
        state.pageAlbum.pictures,
        state.albumDisplayIndex,
        state.albumPageIndex
      )

      return {
        ...state,
        pageAlbumPicture: albumPageNextData.Next,
        albumPageIndex: albumPageNextData.PageNextIndex
      }
    }

    case actions.GET_ALBUM_SLIDER_BY_MANAGER:
      return {
        ...state,
        albumSliderManager: action.payload.Albumdbs
      }

    case actions.RESET_PAGE_INDEX: {
      return {
        ...state,
        ceremonyListData: state.ceremonyPageData.slice(
          0,
          state.albumListDisplayIndex
        ),
        socialEducationListData: state.socialEducationPageData.slice(
          0,
          state.albumListDisplayIndex
        ),
        welfareServiceListData: state.welfareServicePageData.slice(
          0,
          state.albumListDisplayIndex
        ),
        charitableReliefListData: state.charitableReliefPageData.slice(
          0,
          state.albumListDisplayIndex
        ),
        volunteerListData: state.volunteerPageData.slice(
          0,
          state.albumListDisplayIndex
        ),
        albumPageIndex: 0,
        albumListIndex: 0
      }
    }

    default:
      return state
  }
}

export default albumReducer
