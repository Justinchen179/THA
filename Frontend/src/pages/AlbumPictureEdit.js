/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useRouteMatch } from 'react-router'
import {
  getAlbumPictureByIdByManager,
  editAlbumPicture,
  editAlbumCoverPicture,
  getAlbumByIDByManager
} from '../redux/action/album'
import { S3_URI } from '../models/tool'
import { useDispatch } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const AlbumPictureEdit = () => {
  const PrototypeBoxMidCss = css`
    min-height: 0px;
    width: 800px;
    padding-bottom: 30px;
  `

  const pictureContentInput = css`
    width: 300px;
  `

  const editCoverPictureBox = css`
    width: 400px;
    font-size: 30px;
  `

  const [picturePath, setPicturePath] = useState('')
  const [pictureContent, setPictureContent] = useState('')
  const [crop, setCrop] = useState({ unit: '%', width: 100, height: 100 })
  const [reload, setReload] = useState(false)
  const [editCoverPicture, setEditCoverPicture] = useState(false)
  const editAlbumPritureContentRef = useRef()
  const pictureRef = useRef()
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const { id, pictureId } = useRouteMatch().params

  const getPicture = async () => {
    const picture = await dispatch(getAlbumPictureByIdByManager(id, pictureId))

    setPicturePath(picture.payload.Albumdbs[0].path)
    setPictureContent(picture.payload.Albumdbs[0].content)
  }

  const editPicture = async (e) => {
    e.preventDefault()

    const response = await dispatch(
      editAlbumPicture(
        pictureId ? pictureId.toString() : id,
        pictureContent.toString()
      )
    )

    if (response.payload.response.status === true) window.history.back()
  }

  const ContentChange = () => {
    const content = editAlbumPritureContentRef.current.value.slice(0, 16)

    setPictureContent(content)
    editAlbumPritureContentRef.current.value = content
  }

  const cropOnChange = ({ x, y, width, height, unit, aspect }) => {
    if (aspect === undefined) {
      setCrop({
        aspect: pictureId ? 1 : 12 / 5,
        unit: 'px',
        x: width / 2 - 50,
        y: height / 2 - 50,
        width: pictureId ? 100 : 120,
        height: pictureId ? 100 : 50
      })
    } else {
      setCrop({
        aspect: pictureId ? 1 : 12 / 5,
        unit: 'px',
        x: x,
        y: y,
        width: width,
        height: height
      })
    }
  }

  const editCover = async () => {
    await dispatch(getAlbumByIDByManager(match.params.id))
    setEditCoverPicture(!editCoverPicture)
  }

  const Cover = async () => {
    const naturalHeight = pictureRef.current.imageRef.current.naturalHeight
    const naturalWidth = pictureRef.current.imageRef.current.naturalWidth
    const displayHeight = pictureRef.current.imageRef.current.offsetHeight
    const displayWidth = pictureRef.current.imageRef.current.offsetWidth
    const heightScale = naturalHeight / displayHeight
    const widthScale = naturalWidth / displayWidth

    const response = await dispatch(
      editAlbumCoverPicture(
        pictureId ? pictureId.toString() : id,
        picturePath.toString(),
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        pictureId,
        heightScale,
        widthScale
      )
    )

    if (response.payload.response.status === true) {
      editCover()
    } else {
      alert(response.payload.response.status)
    }
  }

  useEffect(() => {
    getPicture()
    setReload(false)
  }, [reload])

  return (
    <>
      <div id="PrototypeBoxTop">管理照片</div>
      <div id="Prototype">
        <div id="PrototypeBox">
          <div id="PrototypeBoxMid" css={PrototypeBoxMidCss}>
            {picturePath && (
              <>
                {editCoverPicture ? (
                  <ReactCrop
                    ref={pictureRef}
                    src={`${S3_URI}/image/` + picturePath}
                    crop={crop}
                    onChange={cropOnChange}
                    alt={picturePath}
                    style={pictureId ? { width: '400px' } : { width: '800px' }}
                  />
                ) : (
                  <img
                    alt={picturePath}
                    src={`${S3_URI}/image/` + picturePath}
                    width="400px"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = `${S3_URI}/image/erruse.jpg`
                    }}
                  />
                )}
              </>
            )}
          </div>
          <div css={editCoverPictureBox}>
            {editCoverPicture ? (
              <>
                <button onClick={() => Cover()}>確定</button>
                <button onClick={() => editCover()}> 取消</button>
              </>
            ) : (
              <button onClick={() => editCover()}>改變縮圖</button>
            )}
            <form onSubmit={editPicture}>
              更改標題：
              <input
                required
                ref={editAlbumPritureContentRef}
                name="title"
                type="text"
                defaultValue={pictureContent}
                onInput={ContentChange}
                css={pictureContentInput}
              />
              <br />
              <button>確定</button>
              <button type="button" onClick={() => window.history.back()}>
                取消
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlbumPictureEdit
