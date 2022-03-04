/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/action/login'

const Login = () => {
  const loginCss = css`
    display: flex;
    width: 100%;
    background: #fcf8f3;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `

  const loginBox = css`
    display: flex;
    width: 100%;
    max-width: 1400px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 28px;
  `

  const loginTop = css`
    display: flex;
    width: 100%;
    max-width: 1400px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 28px;
  `

  const loginIdPass = css`
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const username = useRef()
  const password = useRef()
  const dispatch = useDispatch()

  const Login = async (e) => {
    e.preventDefault()

    const status = await dispatch(
      login(
        username.current.value.toString(),
        password.current.value.toString()
      )
    )

    if (status.payload.login === false) {
      alert('帳號密碼錯誤')
      username.current.value = ''
      password.current.value = ''
    }
  }

  return (
    <div css={loginCss}>
      <div css={loginTop}>登入</div>
      <div css={loginBox}>
        <form onSubmit={Login}>
          <br />
          <div css={loginIdPass}>
            帳號：
            <input ref={username} required type="text" />
          </div>
          <div css={loginIdPass}>
            密碼：
            <input ref={password} required type="password" />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
