import { performREST, SERVER_URL } from '../../models/tool'
export const GET_ALBUM = 'GET_ALBUM'
export const GET_ALBUM_BY_MANAGER = 'GET_ALBUM_BY_MANAGER'
export const GET_ALBUM_BY_ID_BY_MANAGER = 'GET_ALBUM_BY_ID_BY_MANAGER'
export const GET_ALBUM_PICTURE_BY_ID_BY_MANAGER =
  'GET_ALBUM_PICTURE_BY_ID_BY_MANAGER'
export const PREVIOUS_HOME_ALBUM = 'PREVIOUS_HOME_ALBUM'
export const NEXT_HOME_ALBUM = 'NEXT_HOME_ALBUM'
export const GET_ALBUM_BY_ID = 'GET_ALBUM_BY_ID'
export const CREATE_ALBUM = 'CREATE_ALBUM'
export const DELETE_ALBUM = 'DELETE_ALBUM'
export const HIDDEN_ALBUM = 'HIDDEN_ALBUM'
export const EDIT_ALBUM = 'EDIT_ALBUM'
export const EDIT_ALBUM_PICTURE = 'EDIT_ALBUM_PICTURE'
export const EDIT_ALBUM_COVER_PICTURE = 'EDIT_ALBUM_COVER_PICTURE'
export const DELETE_ALBUM_PICTURE = 'DELETE_ALBUM_PICTURE'
export const GET_ALBUM_LIST_DATA = 'GET_ALBUM_LIST_DATA'
export const PREVIOUS_ALBUM_LIST = 'PREVIOUS_ALBUM_LIST'
export const NEXT_ALBUM_LIST = 'NEXT_ALBUM_LIST'
export const PREVIOUS_ALBUM_PAGE = 'PREVIOUS_ALBUM_PAGE'
export const NEXT_ALBUM_PAGE = 'NEXT_ALBUM_PAGE'
export const CHANGE_ALBUM_PICTURE_HIDDEN = 'CHANGE_ALBUM_PICTURE_HIDDEN'
export const CHANGE_ALBUM_COVER = 'CHANGE_ALBUM_COVER'
export const GET_ALBUM_SLIDER_BY_MANAGER = 'GET_ALBUM_SLIDER_BY_MANAGER'
export const EDIT_SLIDER_ALBUM = 'EDIT_SLIDER_ALBUM'
export const DELETE_SLIDER_PICTURE = 'DELETE_SLIDER_PICTURE'
export const DELETE_FILE = 'DELETE_FILE'
export const HIDDEN_FILE = 'HIDDEN_FILE'
export const CHANGE_HOME_NEWS = 'CHANGE_HOME_NEWS'
export const RESET_PAGE_INDEX = 'RESET_PAGE_INDEX'

const serverURL = SERVER_URL

export const getAlbum = async () => {
  const URL = `${serverURL}/api/Albums`
  let albumData = []

  albumData = await performREST(URL, null, 'GET')
  if (albumData !== undefined) albumData.reverse()
  return {
    type: GET_ALBUM,
    payload: {
      albumData
    }
  }
}

export const getAlbumByManager = async (albumType) => {
  const URL = `${serverURL}/api/Albums`
  const AlbumData = new FormData()

  AlbumData.append('albumType', albumType)
  AlbumData.append('actionType', 'getAlbumByManager')

  const Albumdbs = await performREST(URL, AlbumData, 'POST')

  if (Albumdbs !== undefined && Albumdbs && Albumdbs.length !== 0)
    Albumdbs.reverse()
  return {
    type: GET_ALBUM_BY_MANAGER,
    payload: {
      Albumdbs
    }
  }
}

export const getAlbumByID = async (ID = null) => {
  if (ID === null) return

  const URL = `${serverURL}/api/Albums/${ID}`
  const response = await performREST(URL, null, 'GET')

  if (response.status === false) return response.status
  return {
    type: GET_ALBUM_BY_ID,
    payload: {
      response
    }
  }
}

export const getAlbumByIDByManager = async (id = null) => {
  if (id === null) return

  const URL = `${serverURL}/api/Albums/${id}`
  const AlbumData = new FormData()

  AlbumData.append('id', id)

  const response = await performREST(URL, AlbumData, 'POST')

  return {
    type: GET_ALBUM_BY_ID_BY_MANAGER,
    payload: {
      response
    }
  }
}

export const getAlbumPictureByIdByManager = async (id, pictureId) => {
  const URL = `${serverURL}/api/Albums/${id.toString()}`
  const AlbumData = new FormData()

  AlbumData.append('id', id.toString())
  pictureId && AlbumData.append('pictureId', pictureId.toString())
  AlbumData.append(
    'actionType',
    pictureId ? 'getAlbumPicture' : 'getSliderAlbumPicture'
  )

  const Albumdbs = await performREST(URL, AlbumData, 'POST')

  return {
    type: GET_ALBUM_PICTURE_BY_ID_BY_MANAGER,
    payload: {
      Albumdbs
    }
  }
}

export const deleteAlbum = async (id) => {
  const URL = `${serverURL}/api/Albums/${id.toString()}`
  const AlbumData = new FormData()

  AlbumData.append('id', id.toString())

  const response = await performREST(URL, AlbumData, 'DELETE')

  return {
    type: DELETE_ALBUM,
    payload: {
      response
    }
  }
}

export const hiddenAlbum = async (id, hidden) => {
  const URL = `${serverURL}/api/Albums/${id.toString()}`
  const AlbumData = new FormData()

  AlbumData.append('id', id.toString())
  AlbumData.append('hidden', hidden.toString())

  const response = await performREST(URL, AlbumData, 'PUT')

  return {
    type: HIDDEN_ALBUM,
    payload: {
      response
    }
  }
}

export const homeAlbumPrevious = () => {
  return {
    type: PREVIOUS_HOME_ALBUM,
    payload: {}
  }
}

export const homeAlbumNext = () => {
  return {
    type: NEXT_HOME_ALBUM,
    payload: {}
  }
}

export const createAlbum = async (
  actionType,
  title,
  content,
  pictureFile,
  type,
  downloadFile
) => {
  const URL = `${serverURL}/api/Albums`
  const AlbumData = new FormData()

  AlbumData.append('actionType', actionType.toString())
  AlbumData.append('type', type.toString())
  AlbumData.append('title', title.toString())
  AlbumData.append('content', content.toString())
  AlbumData.append('hidden', false)

  if (pictureFile) {
    for (const file of pictureFile) {
      AlbumData.append('albumFile', file, file.name)
    }
  }

  if (downloadFile) {
    for (const file of downloadFile) {
      AlbumData.append('downloadFile', file, file.name)
    }
  }

  const response = await performREST(URL, AlbumData, 'POST')

  return {
    type: CREATE_ALBUM,
    payload: {
      response
    }
  }
}

export const editAlbum = async (
  id,
  type,
  title,
  content,
  pictureFile,
  downloadFile
) => {
  const URL = `${serverURL}/api/Albums/${id.toString()}`
  const AlbumData = new FormData()

  AlbumData.append('id', id.toString())
  AlbumData.append('type', type.toString())
  AlbumData.append('albumTitle', title.toString())
  AlbumData.append('albumContent', content.toString())

  if (pictureFile) {
    for (const file of pictureFile) {
      AlbumData.append('albumFile', file, file.name)
    }
  }

  if (downloadFile) {
    for (const file of downloadFile) {
      AlbumData.append('downloadFile', file, file.name)
    }
  }

  const response = await performREST(URL, AlbumData, 'PUT')

  return {
    type: EDIT_ALBUM,
    payload: {
      response
    }
  }
}

export const editAlbumPicture = async (id, content) => {
  const URL = `${serverURL}/api/Albums/${id.toString()}`
  const AlbumData = new FormData()

  AlbumData.append('id', id.toString())
  AlbumData.append('editPictureId', id.toString())
  AlbumData.append('pictureContent', content.toString())

  const response = await performREST(URL, AlbumData, 'PUT')

  return {
    type: EDIT_ALBUM_PICTURE,
    payload: {
      response
    }
  }
}

export const editAlbumCoverPicture = async (
  id,
  picturePath,
  cropx,
  cropy,
  cropwidth,
  crophight,
  slider,
  heightScale,
  widthScale
) => {
  cropx = cropx * widthScale
  cropy = cropy * heightScale
  cropwidth = cropwidth * widthScale
  crophight = crophight * heightScale

  const URL = `${serverURL}/api/Albums/${id.toString()}`
  const AlbumData = new FormData()

  AlbumData.append('id', id.toString())
  AlbumData.append('editPicturePath', picturePath.toString())
  AlbumData.append('cropX', cropx)
  AlbumData.append('cropY', cropy)
  AlbumData.append('cropWidth', cropwidth)
  AlbumData.append('cropHight', crophight)
  AlbumData.append(
    'actionType',
    slider ? 'albumPictureCrop' : 'sliderAlbumPictureCrop'
  )

  const response = await performREST(URL, AlbumData, 'PUT')

  return {
    type: EDIT_ALBUM_COVER_PICTURE,
    payload: {
      response
    }
  }
}

export const deleteAlbumPicture = async (id, pictureId, picturePath) => {
  pictureId = pictureId.toString()
  picturePath = picturePath.toString()

  const URL = `${serverURL}/api/Albums/${id.toString()}`
  const AlbumData = new FormData()

  AlbumData.append('id', id.toString())
  AlbumData.append('deletePictureID', pictureId.toString())
  AlbumData.append('deletePicturePath', picturePath.toString())

  const response = await performREST(URL, AlbumData, 'PUT')

  return {
    type: DELETE_ALBUM_PICTURE,
    payload: {
      response
    }
  }
}

export const albumListPrevious = (albumType) => {
  return {
    type: PREVIOUS_ALBUM_LIST,
    payload: {
      albumType
    }
  }
}

export const albumListNext = (albumType) => {
  return {
    type: NEXT_ALBUM_LIST,
    payload: {
      albumType
    }
  }
}

export const albumPagePrevious = () => {
  return {
    type: PREVIOUS_ALBUM_PAGE,
    payload: {}
  }
}

export const albumPageNext = () => {
  return {
    type: NEXT_ALBUM_PAGE,
    payload: {}
  }
}

export const albumPictureHiddenChange = async (
  id,
  pictureId,
  pictureHidden
) => {
  const URL = `${serverURL}/api/Albums/${id.toString()}`
  const AlbumData = new FormData()

  AlbumData.append('id', id.toString())
  AlbumData.append('pictureHiddenId', pictureId.toString())
  AlbumData.append('pictureHidden', pictureHidden.toString())

  const response = await performREST(URL, AlbumData, 'PUT')

  return {
    type: CHANGE_ALBUM_PICTURE_HIDDEN,
    payload: {
      response
    }
  }
}

export const albumCoverChange = async (id, oldPicturePath, newPicturePath) => {
  oldPicturePath = oldPicturePath ? oldPicturePath.toString() : 'noCoverPicture'

  const URL = `${serverURL}/api/Albums/${id.toString()}`
  const AlbumData = new FormData()

  AlbumData.append('id', id.toString())
  AlbumData.append('oldPicturePath', oldPicturePath)
  AlbumData.append('newCoverPicture', newPicturePath.toString())

  const response = await performREST(URL, AlbumData, 'PUT')

  return {
    type: CHANGE_ALBUM_COVER,
    payload: {
      response
    }
  }
}

export const getAlbumSliderByManager = async () => {
  const URL = `${serverURL}/api/Albums`
  const AlbumData = new FormData()

  AlbumData.append('actionType', 'getAlbumSliderByManager')

  const Albumdbs = await performREST(URL, AlbumData, 'POST')

  return {
    type: GET_ALBUM_SLIDER_BY_MANAGER,
    payload: {
      Albumdbs
    }
  }
}

export const editSliderAlbum = async (id, File) => {
  const URL = `${serverURL}/api/Albums/${id.toString()}`
  const AlbumData = new FormData()

  AlbumData.append('id', id.toString())
  AlbumData.append('hidden', false)
  AlbumData.append('actionType', 'editSliderAlbum')

  if (File) {
    for (const file of File) {
      AlbumData.append('albumFile', file, file.name)
    }
  }

  const response = await performREST(URL, AlbumData, 'PUT')

  return {
    type: EDIT_SLIDER_ALBUM,
    payload: {
      response
    }
  }
}

export const deleteSliderPicture = async (id, pictureId, picturePath) => {
  const URL = `${serverURL}/api/Albums/${id.toString()}`
  const AlbumData = new FormData()

  AlbumData.append('id', id.toString())
  AlbumData.append('deletePictureID', pictureId.toString())
  AlbumData.append('deletePicturePath', picturePath.toString())

  const response = await performREST(URL, AlbumData, 'PUT')

  return {
    type: DELETE_SLIDER_PICTURE,
    payload: {
      response
    }
  }
}

export const deleteFile = async (id, filePath) => {
  const URL = `${serverURL}/api/Albums/${id.toString()}`
  const AlbumData = new FormData()

  AlbumData.append('id', id.toString())
  AlbumData.append('deleteFilePath', filePath.toString())

  const response = await performREST(URL, AlbumData, 'PUT')

  return {
    type: DELETE_FILE,
    payload: {
      response
    }
  }
}

export const hiddenFile = async (id, fileHiddenId, fileHidden) => {
  const URL = `${serverURL}/api/Albums/${id.toString()}`
  const AlbumData = new FormData()

  AlbumData.append('id', id.toString())
  AlbumData.append('fileHiddenId', fileHiddenId.toString())
  AlbumData.append('fileHidden', fileHidden.toString())

  const response = await performREST(URL, AlbumData, 'PUT')

  return {
    type: HIDDEN_FILE,
    payload: {
      response
    }
  }
}

export const homeNewsChange = (changeIndex) => {
  return {
    type: CHANGE_HOME_NEWS,
    payload: {
      changeIndex
    }
  }
}

export const resetPageIndex = () => {
  return {
    type: RESET_PAGE_INDEX,
    payload: {}
  }
}
