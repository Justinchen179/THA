/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'

const ArrowLeft = ({ action = null, style = {}, id = '' }) => {
  const ArrowLeftCss = css`
    display: flex;
    justify-content: flex-end;
    border: solid black;
    border-width: 0px 2px 2px 0;
    display: inline-block;
    padding: 10px;
    transform: rotate(135deg);
    box-shadow: 2px 2px 2px 1px rgba(255, 255, 255, 0.5);
    font-size: 50px;
    cursor: pointer;
  `

  return <div css={ArrowLeftCss} style={style} onClick={action} id={id}></div>
}

export default ArrowLeft
