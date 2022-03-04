/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { logout as getLogout } from '../redux/action/login'
import React from 'react'

const Logout = () => {
  const logoutCss = css`
    display: flex;
    width: 100%;
    min-height: 200px;
    background: #fcf8f3;
    justify-content: center;
    align-items: center;
  `

  const buttonCss = css`
    height: 100px;
    width: 200px;
  `

  const dispatch = useDispatch()

  return (
    <div css={logoutCss}>
      <button css={buttonCss} onClick={() => dispatch(getLogout())}>
        Logout
      </button>
    </div>
  )
}

export default Logout
