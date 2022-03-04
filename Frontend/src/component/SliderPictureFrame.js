/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Route, Link } from 'react-router-dom'
import { deleteSliderPicture } from '../redux/action/album'
import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { S3_URI } from '../models/tool'

const SliderPictureFrame = ({
  picture,
  date,
  title,
  id,
  path = 'Album/',
  action = 'href',
  lightBoxPicture = null,
  reload,
  pictureNumber
}) => {
  const pictureCss = css`
    display: flex;
    align-items: center;
    width: 300px;
    height: 230px;
    margin: 17.5px;
  `

  const imgCss = css`
    width: 300px;
  `

  const albumIntroduceTitleCss = css`
    margin-top: 0px;
  `

  const albumIntroduceButton = css`
    display: flex;
    justify-content: center;
    width: 335px;
    height: 30px;
  `

  const editButtonCss = css`
    display: flex;
    height: 30px;
  `

  const buttonCss = css`
    height: 30px;
  `

  const [deletepic, setDeletepic] = useState(false)
  const dispatch = useDispatch()
  const pictureId = path.toString().replace('Album/', '')

  const lightBoxPictureChange = (picture) => {
    const path = picture.replace('cover%2B', '')

    lightBoxPicture.current.style.backgroundImage = `url('${S3_URI}/image/${path.replace(
      /cover%2B/,
      ''
    )}')`
  }

  const deletePicture = async (picture) => {
    if (window.confirm('確定是否刪除？') === true) {
      const deletePictureId = pictureId
      const deletePicturePath = picture.replace('cover%2B', '')

      const create = await dispatch(
        deleteSliderPicture(id, deletePictureId, deletePicturePath)
      )

      if (create.payload.response.status === true) {
        setDeletepic(true)
      }

      reload(true)
    }
  }

  action === 'lightBox' ? (path = '#coverbox') : path.toString()

  return (
    <>
      {!deletepic && (
        <div className="albumSlider">
          <Route>
            <a href={path}>
              <div css={pictureCss}>
                <img
                  src={`${S3_URI}/image/` + picture}
                  loading="lazy"
                  css={imgCss}
                  alt={picture}
                  title={`${title}`}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = `${S3_URI}/image/erruse.jpg`
                  }}
                  onClick={() => {
                    action === 'lightBox' && lightBoxPictureChange(picture)
                  }}
                />
              </div>
            </a>
            <div className="albumIntroduce">
              <div className="albumIntroduceDate">{date}</div>
              <div
                className="albumIntroduceTitle"
                title={title}
                css={albumIntroduceTitleCss}>
                {title.length > 16 ? `${title.slice(0, 14)}...` : title}
              </div>
              <div css={albumIntroduceButton}>
                <Link to={`/SliderAlbum/${pictureId}`} css={editButtonCss}>
                  <button className="optBtn" css={buttonCss}>
                    編輯
                  </button>
                </Link>
                {pictureNumber > 3 && (
                  <button
                    className="optBtn"
                    css={buttonCss}
                    type="button"
                    onClick={() => deletePicture(picture)}
                    style={pictureNumber < 3 ? {} : { marginLeft: '20px' }}>
                    刪除
                  </button>
                )}
              </div>
            </div>
          </Route>
        </div>
      )}
    </>
  )
}

export default SliderPictureFrame
