/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { getAlbum } from '../redux/action/album'
import { useDispatch } from 'react-redux'
import List from '../component/List'
import headUseLogo from '../assets/images/headUseLogo.png'
import HeadSlider from '../component/HeadSlider'
import HeadDharm from '../component/HeadDharm'
import HeadMarquee from '../component/HeadMarquee'

const Head = () => {
  const px1440 = css`
    width: 240px;
    height: 230px;
  `

  const container = css`
    display: flex;
    width: 1400px;
  `

  const logo = css`
    background: #efe6d7;
  `

  const nav = css`
    display: flex;
    width: 1160px;
    justify-content: flex-start;
    margin-top: 44px;
    flex-direction: column;
  `

  const dharmSlider = css`
    display: flex;
    width: 100%;
    background: linear-gradient(180deg, #efe6d7 76%, rgb(214, 190, 162) 24%);
    justify-content: center;
  `

  const header = css`
    display: flex;
    width: 100%;
    background: #efe6d7;
    justify-content: center;
  `

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAlbum())
  }, [])

  return (
    <>
      <header css={header}>
        <div css={container}>
          <div css={logo}>
            <Link to="/">
              <img css={px1440} src={headUseLogo} alt="Head Use Logo" />
            </Link>
          </div>
          <nav css={nav}>
            <List min={false} />
          </nav>
        </div>
      </header>
      <section css={dharmSlider}>
        <div css={container}>
          <HeadDharm min={false} />
          <HeadSlider min={false} />
        </div>
      </section>
      <HeadMarquee />
    </>
  )
}

export default Head
