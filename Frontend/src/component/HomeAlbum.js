/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PictureViewer from './PictureViewer'
import { homeAlbumNext, homeAlbumPrevious } from '../redux/action/album'
import { Link } from 'react-router-dom'
import ArrowLeft from './ArrowLeft'
import ArrowRight from './ArrowRight'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const HomeAlbum = () => {
  const container = css`
    display: flex;
    width: 1400px;
    opacity: 0;
  `

  const display = css`
    transition: opacity 1s;
    opacity: 1;
  `

  const arrow = css`
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: flex-end;
  `

  const arrowLeft = css`
    margin-right: 15px;
  `

  const arrowRight = css`
    margin-right: 45px;
  `

  const album = css`
    background: rgb(252, 248, 243);
    display: flex;
    width: 100%;
    min-height: 360px;
    justify-content: center;
  `

  const albumTitleLink = css`
    width: 100%;
    max-width: 347px;
    height: 45px;
    font-size: 44px;
    color: #a79268;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 20px;
  `

  const px1440AlbumTitleContent = css`
    display: flex;
    width: 100%;
    max-width: 347px;
    height: 200px;
    font-size: 20px;
    letter-spacing: 4px;
    line-height: 35px;
    padding-left: 20px;
    color: rgb(167, 146, 104);
  `

  const px1440 = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1093px;
    font-size: 34px;
    color: rgb(167, 146, 104);
  `

  const px1440Album = css`
    display: flex;
    width: 100%;
    max-width: 1400px;
    height: 335px;
    justify-content: flex-end;
  `

  const px1440AlbumChange = css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1400px;
    height: 360px;
  `

  const dispatch = useDispatch()
  const albumData = useSelector((state) => state.albumReducer.homeAlbum)

  return (
    <div css={album}>
      <div
        css={
          albumData[0] && albumData[0].type ? [container, display] : [container]
        }>
        <div css={px1440AlbumChange}>
          <div css={px1440Album}>
            <div id="albumtitle">
              <div css={albumTitleLink}>
                <Link to="/Ceremony">本寺法會</Link>
              </div>
              <div css={px1440AlbumTitleContent}>
                查看我們最近的
                <br />
                法會活動
              </div>
              <div css={arrow}>
                <div css={arrowLeft}>
                  <ArrowLeft action={() => dispatch(homeAlbumPrevious())} />
                </div>
                <div css={arrowRight}>
                  <ArrowRight action={() => dispatch(homeAlbumNext())} />
                </div>
              </div>
            </div>
            <div css={px1440}>
              <PictureViewer albumDisplayIndex={3} albumData={albumData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeAlbum
