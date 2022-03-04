/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { homeNewsChange } from '../redux/action/album'
import RadioButton from './RadioButton'

const HomeNewsRightSide = ({ path, newsCount }) => {
  const px1440NewsRightChange = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 185px;
    height: 450px;
    background: rgb(244, 234, 225);
  `

  const px1440NewsRight = css`
    width: 185px;
    height: 550px;
  `

  const newsRightTitle = css`
    background: rgb(244, 234, 225);
    text-align: center;
    width: 100%;
    margin: 70px 0;
  `

  const [albumTtile, setAlbumTtile] = useState('')
  const dispatch = useDispatch()
  const colorIndex = useSelector((state) => state.albumReducer.blackButton)
  const changeNum = 5
  const btnNum = Math.min(newsCount || changeNum, changeNum)
  const changeButtonIndex = [...Array(btnNum).keys()]

  const translateType = {
    Ceremony: '法會',
    SocialEducation: '教育文化',
    WelfareService: '福利服務',
    CharitableRelief: '慈善關懷',
    Volunteer: '如來志工'
  }

  useEffect(() => {
    const pathTitle = path && path.split('/')
    const title = translateType[pathTitle[0]]

    setAlbumTtile(title)
  }, [path])

  return (
    <div css={px1440NewsRight}>
      <div css={newsRightTitle}>
        <a id="newsRightTitleLink" href="/SocialEducation">
          {albumTtile}
        </a>
      </div>
      <div css={px1440NewsRightChange}>
        {changeButtonIndex.map((e) => (
          <RadioButton
            key={e}
            action={() => dispatch(homeNewsChange(e))}
            background={
              colorIndex === e ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 0.1)'
            }
          />
        ))}
      </div>
    </div>
  )
}

export default HomeNewsRightSide
