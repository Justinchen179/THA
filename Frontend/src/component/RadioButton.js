/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'

const RadioButton = ({ action = null, background }) => {
  const RadioButton = css`
    cursor: pointer;
    transition: 0.5s all ease-in;
    background: ${background || 'rgba(255, 255, 255, 0.1)'};
    width: 10px;
    height: 10px;
    border-radius: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-left: 5px;
    margin-right: 5px;
  `

  return (
    <div
      css={RadioButton}
      onClick={() => {
        action()
      }}
    />
  )
}

export default RadioButton
