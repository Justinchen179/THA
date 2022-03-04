/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  albumListPrevious,
  albumListNext,
  resetPageIndex
} from '../redux/action/album'
import { scrollToAnchor } from '../models/tool'
import ArrowLeft from '../component/ArrowLeft'
import ArrowRight from '../component/ArrowRight'
import PictureViewer from '../component/PictureViewer'
import { useRouteMatch } from 'react-router'
import React, { useEffect, useState } from 'react'

const Album = () => {
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

  const arrow = css`
    margin-right: 500px;
  `

  const [loading, setLoading] = useState(false)
  const [displayArrow, setDisplayArrow] = useState(false)
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const albumType = match.path.replace('/', '').replace('Create', '')

  const albumListData =
    albumType.replace(albumType[0], albumType[0].toLowerCase()) + 'ListData'

  const albumPageData =
    albumType.replace(albumType[0], albumType[0].toLowerCase()) + 'PageData'

  const albumData = useSelector((state) => state.albumReducer[albumListData])

  const albumLength = useSelector(
    (state) => state.albumReducer[albumPageData].length
  )

  const translateType = {
    Ceremony: '法會',
    SocialEducation: '教育文化',
    WelfareService: '福利服務',
    CharitableRelief: '慈善關懷',
    Volunteer: '如來志工'
  }

  const AlbumTtile = translateType[albumType]

  useEffect(() => {
    dispatch(resetPageIndex())
  }, [albumType])
  useEffect(() => {
    setDisplayArrow(albumLength > 12)
  }, [albumLength])
  useEffect(() => {
    document.title = `${AlbumTtile} - 如來之家`
  }, [AlbumTtile])

  return (
    <>
      <div css={Prototype}>
        <div css={PrototypeBox}>
          <div css={PrototypeBoxTop}>
            {albumData.length !== 0 ? AlbumTtile : '敬啟期待'}
          </div>
          <div css={PrototypeBoxMid}>
            <PictureViewer
              albumDisplayIndex={12}
              albumData={albumData}
              text={true}
              min={false}
            />
          </div>
          <div css={PrototypeBoxMidBot}>
            {displayArrow && (
              <>
                <div css={arrow}>
                  <ArrowLeft
                    action={() => {
                      if (!loading) {
                        setLoading(true)
                        dispatch(albumListPrevious(albumType))
                        scrollToAnchor('albumAnchor')
                        setInterval(() => setLoading(false), 300)
                      }
                    }}
                  />
                </div>
                <div>
                  <ArrowRight
                    action={() => {
                      if (!loading) {
                        setLoading(true)
                        dispatch(albumListNext(albumType))
                        scrollToAnchor('albumAnchor')
                        setInterval(() => setLoading(false), 300)
                      }
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Album
