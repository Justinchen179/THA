/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { S3_URI } from '../models/tool'
import React from 'react'

const HomeNewsLeftSide = ({ path = 'news/', picture }) => {
  const newsLeft = css`
    display: flex;
    width: 100%;
    height: 100;
    max-width: 700px;
    max-height: 700px;
    justify-content: center;
    overflow: hidden;
  `

  const newsLeftPicture = css`
    object-fit: cover;
    width: 100%;
    height: 100;
  `

  return (
    <div css={newsLeft}>
      <a href={path}>
        <img
          src={`${S3_URI}/image/HomeCover%2B${picture}`}
          alt={picture}
          css={newsLeftPicture}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `${S3_URI}/image/erruse.jpg`
          }}
        />
      </a>
    </div>
  )
}

export default HomeNewsLeftSide
