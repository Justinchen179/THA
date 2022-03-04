/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import {
  getAlbumByID,
  albumPagePrevious,
  albumPageNext,
  resetPageIndex
} from '../redux/action/album'
import { scrollToAnchor, S3_URI } from '../models/tool'
import ArrowLeft from '../component/ArrowLeft'
import ArrowRight from '../component/ArrowRight'
import PictureViewer from '../component/PictureViewer'

const Photo = () => {
  const px1440 = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1065px;
    min-height: 250px;
    font-size: 34px;
    color: rgb(167, 146, 104);
  `

  const titleFlexRow = css`
    flex-direction: row;
    flex-wrap: wrap;
    white-space: pre-wrap;
    word-spacing: 9px;
  `

  const fileTitleCss = css`
    font-size: 24px;
  `

  const fileContentCss = css`
    font-size: 20px;
  `

  const albumTop = css`
    font-size: 20px;
    padding: 10px 0;
    color: rgb(225, 192 119);
  `

  const albumTitle = css`
    text-align: center;
    width: 100%;
    font-size: 30px;
    font-weight: bold;
  `

  const albumContent = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 24px;
    padding: 20px;
  `

  const arrow = css`
    margin-right: 500px;
  `

  const [loadingText, setLoadingText] = useState(false)
  const [displayArrow, setDisplayArrow] = useState(false)
  const dispatch = useDispatch()
  const albumData = useSelector((state) => state.albumReducer.pageAlbum)

  const albumPictureData = useSelector(
    (state) => state.albumReducer.pageAlbumPicture
  )

  const match = useRouteMatch()
  const albumType = match.path.replace(':id', '')

  const translateType = {
    Ceremony: '法會',
    SocialEducation: '教育文化',
    WelfareService: '福利服務',
    CharitableRelief: '慈善關懷',
    Volunteer: '如來志工'
  }

  const AlbumType = translateType[albumType.replaceAll('/', '')]

  useEffect(() => {
    dispatch(getAlbumByID(match.params.id))
    scrollToAnchor()
  }, [match.params.id])
  useEffect(() => {
    document.title = `${AlbumType} - 如來之家`
    dispatch(resetPageIndex())
  }, [])
  useEffect(() => {
    setLoadingText(false)
    setTimeout(() => {
      setLoadingText(true)
    }, 300)
  }, [albumType])
  useEffect(() => {
    albumData &&
      albumData.pictures &&
      setDisplayArrow(albumData.pictures.length > 12)
  }, [albumData])

  return (
    <>
      <div id="PrototypeBoxTop" css={titleFlexRow}>
        <div css={albumTop}> - {AlbumType} -</div>
        <div
          className="opacity"
          style={loadingText ? { opacity: '1', transition: 'opacity 1s' } : {}}
          css={albumTitle}>
          {albumData.title}
        </div>
      </div>
      <div id="Prototype">
        <div
          className="opacity"
          style={loadingText ? { opacity: '1', transition: 'opacity 1s' } : {}}>
          <div id="PrototypeBox">
            <div id="PrototypeBoxMid">
              <div className="PrototypeBoxMidTop" css={px1440}>
                <div id="AlbumTxtBox">
                  <div id="AlbumTxt">
                    <div css={albumContent}>
                      {albumData.content &&
                        albumData.content
                          .split('\n')
                          .map((it, i) => <div key={'x' + i}>{it + ' '}</div>)}
                    </div>
                    <br />
                    {albumData.file && (
                      <>
                        {albumData.file.length !== 0 && (
                          <div css={fileTitleCss}> 附件 </div>
                        )}
                        <div css={fileContentCss}>
                          {albumData.file.map((e, i) => (
                            <div key={i}>
                              {i + 1}.{' '}
                              <a href={`${S3_URI}/file/${e.path}`}>
                                {e.content}
                              </a>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <br />
                  </div>
                </div>
                <PictureViewer
                  albumDisplayIndex={12}
                  albumData={albumPictureData}
                  text={true}
                  action={'lightBox'}
                  min={false}
                />
              </div>
              {displayArrow && (
                <div id="PrototypeBoxMidBot">
                  <div css={arrow}>
                    <ArrowLeft
                      action={() => {
                        dispatch(albumPagePrevious())
                        scrollToAnchor('albumAnchor')
                      }}
                    />
                  </div>
                  <div>
                    <ArrowRight
                      action={() => {
                        dispatch(albumPageNext())
                        scrollToAnchor('albumAnchor')
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Photo
