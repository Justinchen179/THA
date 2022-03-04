/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'

const HeadLink = () => {
  const linkBackground = css`
    text-align: right;
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const link = css`
    font-size: 24px;
    width: 200px;
    height: 60px;
    border-radius: 120px;
    background: rgb(94, 91, 85);
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const facebookLink = css`
    display: flex;
    font-size: 24px;
    color: rgb(241, 213, 157);
  `

  return (
    <div css={linkBackground}>
      <a href="https://<facebook>" css={facebookLink}>
        <div css={link}>facebook→</div>
      </a>
    </div>
  )
}

export default HeadLink
