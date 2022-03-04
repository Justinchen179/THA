/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import HomeNewsRightSide from './HomeNewsRightSide'
import HomeNewsLeftSide from './HomeNewsLeftSide'
import HomeNewsMidSide from './HomeNewsMidSide'
import React from 'react'

const HomeNews = () => {
  const px1440News = css`
    width: 100%;
    height: 700px;
    background: rgb(244, 234, 225);
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const px1440NewsBox = css`
    display: flex;
    width: 100%;
    max-width: 1400px;
    height: 700px;
    opacity: 0;
  `

  const display = css`
    transition: opacity 1s;
    opacity: 1;
  `

  const newsData = useSelector((state) => state.albumReducer.homeNewsData)
  const homeNewsData = useSelector((state) => state.albumReducer.homeNews)

  return (
    <div css={px1440News}>
      <div className="container">
        <div
          css={
            homeNewsData && homeNewsData.type
              ? [px1440NewsBox, display]
              : [px1440NewsBox]
          }>
          {homeNewsData && newsData && (
            <>
              <HomeNewsLeftSide
                path={`${homeNewsData.type}/${homeNewsData._id}`}
                picture={`${homeNewsData.coverPicture}`}
              />
              <HomeNewsMidSide
                path={`${homeNewsData.type}/${homeNewsData._id}`}
                title={`${homeNewsData.title}`}
                content={`${homeNewsData.content}`}
                useSlice={true}
              />
              <HomeNewsRightSide
                path={`${homeNewsData.type}/${homeNewsData._id}`}
                newsCount={newsData.length}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeNews
