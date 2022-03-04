/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'

const SliderArrow = ({ action = null, style = {}, id = '' }) => {
  const arrow = css`
    font-size: 50px;
    justify-content: flex-end;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.3);
    box-shadow: 2px 2px 2px 1px rgba(255, 255, 255, 0.5);
    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  `

  return (
    <div
      css={arrow}
      className={'SliderArrow'}
      style={style}
      onClick={action}
      id={id}>
      {' '}
      ➜
    </div>
  )
}

export default SliderArrow
