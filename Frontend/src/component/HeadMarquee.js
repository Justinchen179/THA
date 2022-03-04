/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import activity from '../assets/images/logosd.png'
import React from 'react'

const HeadMarquee = () => {
  const activityBox = css`
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 90px;
    background: rgb(214, 190, 162);
  `

  const activityBar = css`
    display: flex;
    height: 90px;
    width: 100%;
    background: rgb(214, 190, 162);
  `

  const activityBarLu = css`
    display: flex;
    background: rgb(214, 190, 162);
    width: calc((100%-875px) / 2);
    height: 90px;
    align-items: flex-end;
  `

  const activityBarRu = css`
    display: flex;
    background: rgb(214, 190, 162);
    width: calc((100%-875px) / 2);
    height: 90px;
    align-items: flex-end;
  `

  const activityBarLd = css`
    display: flex;
    background: #fcf8f3;
    width: 100%;
    height: 30px;
  `

  const activityBarRd = css`
    display: flex;
    background: #fcf8f3;
    width: 100%;
    height: 30px;
  `

  const activityBackground = css`
    display: flex;
    width: 100%;
    min-width: 850px;
    align-items: flex-end;
    background: #f5eee6;
  `

  const logosd = css`
    background: #f5eee6;
    width: 40px;
    height: 60px;
    padding: 0 30px;
  `

  const marqueeCss = css`
    width: 100%;
    height: 60px;
    line-height: 60px;
    justify-content: center;
    color: #a79268;
    font-size: 20px;

    margin: 0 auto;
    overflow: hidden;
    position: relative;
    & > ul {
      margin-top: 0px;
      padding-left: 0;
      display: flex;
      flex-direction: column;
      list-style-type: none;
      animation: marqee 15s linear infinite;
      position: absolute;
    }
    & > ul > li {
      white-space: nowrap;
      margin-right: 8em;
      font-weight: bold;
    }
    @keyframes marqee {
      0% {
        transform: translateY(20%);
      }

      100% {
        transform: translateY(-90%);
      }
    }
  `

  const marquee = useSelector((state) => state.dharmReducer.Marquee)

  return (
    <section css={activityBar}>
      <div css={activityBarLu}>
        <div css={activityBarLd}></div>
      </div>
      <div css={activityBox}>
        <div css={activityBackground} id="anchor">
          <div css={logosd}>
            <img src={activity} alt="activity" />
          </div>
          <div css={marqueeCss}>
            <ul>
              {marquee && marquee.map((e, i) => <li key={i}>{e.content}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <div css={activityBarRu}>
        <div css={activityBarRd}></div>
      </div>
    </section>
  )
}

export default HeadMarquee
