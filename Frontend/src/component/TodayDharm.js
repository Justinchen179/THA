/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'

const TodayDharm = ({ dharmData }) => {
  const DharmContent = css`
    justify-content: center;
    writing-mode: vertical-lr;
    word-break: break-word;
    height: 245px;
    line-height: 40px;
    letter-spacing: 4px;
    text-align: justify;
    color: #a79268;
    font: 24px bold;
  `

  return (
    <div css={DharmContent}>
      {dharmData.content.split('\n').map((it, i) => (
        <div key={'x' + i}>{it}</div>
      ))}
    </div>
  )
}

export default TodayDharm
