/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import React from 'react'
import logoL from '../assets/images/logo_l.png'
import logoR from '../assets/images/logo_r.png'

const HomeAbout = () => {
  const px1440AboutContent = css`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1400px;
    height: 300px;
  `

  const px1440AboutLinkBackground = css`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1400px;
    height: 100px;
  `

  const about = css`
    padding: 25px 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 400px;
    justify-content: center;
    align-items: center;
    background: rgb(252, 248, 243);
  `

  const Slogan = css`
    display: flex;
    justify-content: center;
    word-break: break-word;
    flex-direction: column;
    width: 660px;
    height: 300px;
    font-size: 32px;
    color: #a79268;
    text-align: center;
  `

  const SloganL = css`
    width: 45px;
    height: 60px;
  `

  const SloganR = css`
    width: 45px;
    height: 60px;
  `

  const arrow = css`
    font-size: 20px;
  `

  const aboutLink = css`
    font-size: 24px;
    width: 200px;
    height: 60px;
    border-radius: 120px;
    background: rgb(94, 91, 85);
    color: rgb(241, 213, 157);
    display: flex;
    justify-content: center;
    align-items: center;
  `

  return (
    <>
      <section css={about}>
        <div css={px1440AboutContent}>
          <img css={SloganL} src={logoL} alt={logoL} />
          <div css={Slogan}>
            如諸佛而來 無凡聖之家
            <br />
            <br />
            發菩提心 修如來行
            <br />
            <br />
            不來不去 生死自在
            <br />
          </div>
          <img css={SloganR} src={logoR} alt="logoR" />
        </div>
        <div css={px1440AboutLinkBackground}>
          <Link to="/AboutUs" css={aboutLink}>
            關於本寺
            <span css={arrow}> → </span>
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomeAbout
