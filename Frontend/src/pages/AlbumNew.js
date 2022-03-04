/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { scrollToAnchor } from '../models/tool'
import { getAlbumByManager } from '../redux/action/album'
import PictureViewer from '../component/PictureViewer'
import AlbumPanel from '../component/AlbumPanel'
import { useRouteMatch } from 'react-router'

const AlbumNew = () => {
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

  const PrototypeBoxMidBot = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    height: 30px;
    font-size: 34px;
    color: rgb(167, 146, 104);
    padding-bottom: 25px;
  `

  const PrototypeBoxMidTop = css`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1400px;
    min-height: 250px;
    font-size: 34px;
    color: rgb(167, 146, 104);
  `

  const buttonCss = css`
    width: 1100px;
  `

  const [createPage, setCreatePage] = useState(false)
  const [reload, setReload] = useState(false)
  const dispatch = useDispatch()
  const albumData = useSelector((state) => state.albumReducer.albumDataManager)
  const match = useRouteMatch()
  const albumType = match.path.replace('/', '').replace('Create', '')

  const translateType = {
    Ceremony: '法會',
    SocialEducation: '教育文化',
    WelfareService: '福利服務',
    CharitableRelief: '慈善關懷',
    Volunteer: '如來志工'
  }

  const AlbumTtile = translateType[albumType]

  const createpage = () => {
    dispatch(getAlbumByManager(albumType))
    setCreatePage(!createPage)
  }

  useEffect(() => {
    setCreatePage(false)
    dispatch(getAlbumByManager(albumType))
    scrollToAnchor()
    reload === true && setReload(false)
  }, [reload, albumType])
  useEffect(() => {
    document.title = `管理${AlbumTtile} - 如來之家`
  }, [AlbumTtile])

  return (
    <>
      <div css={Prototype}>
        <div css={PrototypeBox}>
          <div css={PrototypeBoxTop}>{AlbumTtile}</div>
          {createPage ? (
            <div css={PrototypeBoxMidTop}>
              <AlbumPanel
                action={() => createpage()}
                inputType={albumType}
                reload={setReload}
              />
            </div>
          ) : (
            <div css={PrototypeBoxMid}>
              <button
                className="optBtn"
                css={buttonCss}
                onClick={() => createpage()}>{`建立${AlbumTtile}`}</button>
              <br />
              <PictureViewer
                albumDisplayIndex={albumData.length}
                albumData={albumData}
                text={true}
                button={true}
                type={'albumCreate'}
              />
            </div>
          )}
          <div css={PrototypeBoxMidBot}></div>
        </div>
      </div>
    </>
  )
}

export default AlbumNew
