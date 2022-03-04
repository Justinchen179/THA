/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PictureViewer from './PictureViewer'
import { editSliderAlbum, getAlbumSliderByManager } from '../redux/action/album'

const AlbumPanel = () => {
  const Prototype = css`
    display: flex;
    width: 100%;
    min-height: 600px;
    background: #fcf8f3;
    justify-content: center;
    align-items: center;
  `

  const PrototypeBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 1400px;
    min-height: 600px;
    font-size: 34px;
    color: rgb(167, 146, 104);
  `

  const PrototypeBoxTop = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    font-size: 40px;
    background: #fcf8f3;
    color: rgb(167, 146, 104);
    padding: 60px;
  `

  const PrototypeBoxMid = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    min-height: 250px;
    font-size: 34px;
    color: rgb(167, 146, 104);
  `

  const albumSliderCss = css`
    display: flex;
    width: 100%;
    min-height: 250px;
    background: #fcf8f3;
    justify-content: center;
  `

  const albumSliderCreateCss = css`
    display: flex;
    padding-top: 20px;
    width: 400px;
    font-size: 34px;
    color: rgb(167, 146, 104);
  `

  const buttonBoxCss = css`
    display: flex;
    align-items: center;
  `

  const fristButtonCss = css`
    display: flex;
    align-items: center;
    height: 30px;
  `

  const buttonCss = css`
    display: flex;
    align-items: center;
    height: 30px;
    margin-right: 20px;
  `

  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(false)
  const albumCreateFileRef = useRef()
  const dispatch = useDispatch()

  const albumSliderData = useSelector(
    (state) => state.albumReducer.albumSliderManager
  )

  const albumSliderPicture = albumSliderData && albumSliderData.pictures

  const albumSliderPictureNumber =
    albumSliderPicture && albumSliderPicture.length

  const AlbumCreate = async (e) => {
    e.preventDefault()

    const id = albumSliderData._id.toString()
    const File = albumCreateFileRef.current.files
    const edit = await dispatch(editSliderAlbum(id, File))

    if (edit.payload.response.status === true) {
      setReload(true)
    }
  }

  useEffect(() => {
    dispatch(getAlbumSliderByManager())
    setLoading(false)
  }, [reload])

  return (
    <>
      <div css={Prototype}>
        <div css={PrototypeBox}>
          <div css={PrototypeBoxTop}>管理照片跑馬燈</div>
          <div css={albumSliderCss}>
            <div css={albumSliderCreateCss}>
              <form onSubmit={AlbumCreate}>
                新增照片：
                <input
                  ref={albumCreateFileRef}
                  component="label"
                  css={fristButtonCss}
                  name="file"
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple="multiple"
                />
                <div css={buttonBoxCss}>
                  操作
                  <br />
                  <button css={buttonCss}>確定新增</button>
                </div>
              </form>
            </div>
          </div>
          <div css={PrototypeBoxMid}>
            {!loading && (
              <div css={albumSliderCss}>
                <PictureViewer
                  albumDisplayIndex={
                    albumSliderPicture && albumSliderPicture.length
                  }
                  albumData={albumSliderPicture}
                  text={true}
                  action={'lightBox'}
                  button={albumSliderPicture}
                  reload={setReload}
                  path={albumSliderPicture && albumSliderPicture.path}
                  coverPicture={albumSliderPicture}
                  type={'albumSliderPicture'}
                  id={albumSliderData && albumSliderData._id}
                  albumSliderPictureNumber={albumSliderPictureNumber}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AlbumPanel
