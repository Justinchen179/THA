/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { getAlbumByIDByManager } from '../redux/action/album'
import AlbumPanel from '../component/AlbumPanel'

const AlbumEdit = () => {
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

  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const albumData = useSelector((state) => state.albumReducer.pageAlbumManager)
  const match = useRouteMatch()

  const translateType = {
    Ceremony: '法會',
    SocialEducation: '教育文化',
    WelfareService: '福利服務',
    CharitableRelief: '慈善關懷',
    Volunteer: '如來志工'
  }

  const AlbumTtile = translateType[albumData.type]

  useEffect(() => {
    dispatch(getAlbumByIDByManager(match.params.id)).then(() => {
      setLoading(false)
      setReload(false)
    })
  }, [reload])

  return (
    <>
      <div css={Prototype}>
        <div css={PrototypeBox}>
          <div css={PrototypeBoxTop}>{`管理${AlbumTtile}`}</div>
          <div css={PrototypeBoxMid}>
            {!loading && (
              <AlbumPanel
                inputTitle={albumData.title}
                inputContent={albumData.content}
                inputPicture={albumData.pictures}
                inputHidden={albumData.hidden}
                id={albumData._id}
                inputType={albumData.type}
                coverPicture={albumData.coverPicture}
                reload={setReload}
                inputFile={albumData.file}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AlbumEdit
