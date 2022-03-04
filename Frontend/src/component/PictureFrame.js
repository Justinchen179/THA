/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Route, Link, useRouteMatch } from 'react-router-dom'
import { S3_URI } from '../models/tool'
import {
  deleteAlbumPicture,
  albumPictureHiddenChange,
  albumCoverChange
} from '../redux/action/album'
import { useDispatch } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'

const PictureFrame = ({
  picture,
  date,
  title,
  hidden,
  type,
  path,
  action = 'href',
  lightBoxPicture = null,
  button = false,
  reload,
  coverPicture
}) => {
  const albumSliderCss = css`
    height: ${title ? '400px' : '335px'};
  `

  const albumPictureBox = css`
    width: 100%;
    max-width: 300px;
  `

  const albumIntroduceButton = css`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 335px;
    height: 30px;
  `

  const buttonBox = css`
    display: flex;
    height: 30px;
  `

  const fristButtonCss = css`
    height: 30px;
  `

  const buttonCss = css`
    margin: 0 10px;
    height: 30px;
  `

  const [loadingPicture, setLoadingPicture] = useState(false)
  const pictureRef = useRef()
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const albumId = match.params.id
  const routerPath = match.path.replace(':id', match.params.id)
  const coverPhoto = coverPicture === picture.replace('cover%2B', '')
  const pictureId = path.toString().replace('undefined/', '')

  const lightBoxPictureChange = (picture) => {
    const path = picture.replace('cover%2B', '')

    lightBoxPicture.current.style.backgroundImage = `url('${S3_URI}/image/${path.replace(
      /cover%2B/,
      ''
    )}')`
  }

  const deletePicture = async (picture) => {
    if (
      type === 'albumPictureCreate' &&
      window.confirm('確定是否刪除？') === true
    ) {
      const deleteAlbumId = albumId
      const deletePictureId = pictureId
      const deletePicturePath = picture.replace('cover%2B', '')

      const create = await dispatch(
        deleteAlbumPicture(deleteAlbumId, deletePictureId, deletePicturePath)
      )

      if (create.payload.response.status === true) reload(true)
    }
  }

  const hiddenPicture = async () => {
    if (type === 'albumPictureCreate') {
      const hiddenAlbumId = albumId
      const hiddenPictureId = pictureId
      const PictureHidden = !hidden

      const create = await dispatch(
        albumPictureHiddenChange(hiddenAlbumId, hiddenPictureId, PictureHidden)
      )

      if (create.payload.response.status === true) {
        reload(true)
      }
    }
  }

  const coverChange = async () => {
    if (type === 'albumPictureCreate') {
      const CoverChangeAlbumId = albumId
      const OldCoverChangePicturePath = coverPicture
      const NewCoverChangePicturePath = picture.replace('cover%2B', '')

      const create = await dispatch(
        albumCoverChange(
          CoverChangeAlbumId,
          OldCoverChangePicturePath,
          NewCoverChangePicturePath
        )
      )

      if (create.payload.response.status === true) {
        reload(true)
      }
    }
  }

  useEffect(() => {
    setLoadingPicture(false)
    setTimeout(() => {
      setLoadingPicture(true)
    }, 500)
  }, [picture])

  action === 'lightBox' ? (path = '#coverbox') : path.toString()

  return (
    <div className="albumSlider" css={albumSliderCss}>
      <Route>
        {path !== '#coverbox' ? (
          <Link to={path}>
            <div
              className="picture opacity"
              style={
                loadingPicture ? { opacity: '1', transition: 'opacity 1s' } : {}
              }>
              <img
                src={`${S3_URI}/image/` + picture}
                alt={picture}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = `${S3_URI}/image/erruse.jpg`
                }}
                onClick={() => {
                  action === 'lightBox' && lightBoxPictureChange(picture)
                }}
                css={albumPictureBox}
              />
            </div>
          </Link>
        ) : (
          <a href={path}>
            <div
              className="picture opacity"
              style={
                loadingPicture ? { opacity: '1', transition: 'opacity 1s' } : {}
              }>
              <img
                src={`${S3_URI}/image/` + picture}
                ref={pictureRef}
                alt={picture}
                title={`${title}`}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = `${S3_URI}/image/erruse.jpg`
                }}
                onClick={() => {
                  action === 'lightBox' && lightBoxPictureChange(picture)
                }}
                css={albumPictureBox}
              />
            </div>
          </a>
        )}

        <div className="albumIntroduce">
          <div className="albumIntroduceDate">{date}</div>
          <div className="albumIntroduceTitle" title={title || undefined}>
            {title.length > 16 ? `${title.slice(0, 14)}...` : title}
          </div>
          <div css={albumIntroduceButton}>
            {button && (
              <>
                {type === 'albumCreate' ? (
                  <Link to={`/Edit${path.toString()}`} css={buttonBox}>
                    <button className="optBtn" css={fristButtonCss}>
                      編輯
                    </button>
                  </Link>
                ) : (
                  <>
                    <Link to={`${routerPath}/${pictureId}`} css={buttonBox}>
                      <button className="optBtn" css={buttonCss}>
                        編輯
                      </button>
                    </Link>
                    {!coverPhoto && (
                      <>
                        <button
                          className="optBtn"
                          type="button"
                          onClick={() => deletePicture(picture)}
                          css={buttonCss}>
                          刪除
                        </button>
                        <button
                          className="optBtn"
                          type="button"
                          onClick={() => hiddenPicture()}
                          css={buttonCss}>
                          {!hidden ? '隱藏' : '顯示'}
                        </button>
                        <button
                          className="optBtn"
                          type="button"
                          onClick={() => coverChange()}
                          css={buttonCss}>
                          {type === 'albumPictureCreate'
                            ? '設為縮圖'
                            : '設為首頁縮圖'}
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Route>
    </div>
  )
}

export default PictureFrame
