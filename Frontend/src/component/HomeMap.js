/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'

const HomeMap = () => {
  const px1440Map = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 450px;
    background: rgb(245, 238, 230);
  `

  const px1440MapBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1400px;
    height: 450px;
    background: rgb(245, 238, 230);
  `

  const mapBoxLeftTopCss = css`
    margin-top: 90px;
    margin-left: 40px;
    width: 100%;
    max-width: 400px;
  `

  const mapBoxLeftMidCss = css`
    font-size: 35px;
    margin-top: 25px;
    width: 100%;
  `

  const mapBoxLeftBotCss = css`
    padding-left: 140px;
  `

  const arrow = css`
    font-size: 20px;
  `

  const map =
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2778.055956015185!2d120.46611699048059!3d23.129222586429385!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e6154c7aa4a2f%3A0xd1d49c3f399e770d!2z5aaC5L6G5LmL5a62!5e0!3m2!1szh-TW!2stw!4v1640972955242!5m2!1szh-TW!2stw'

  return (
    <div css={px1440Map}>
      <div css={px1440MapBox}>
        <div id="mapBoxLeft">
          <div id="mapBoxLeftTop" css={mapBoxLeftTopCss}>
            地址+
            <div css={mapBoxLeftMidCss}>台南市玉井區後旦街91號</div>
          </div>
          <div id="mapBoxLeftBot" css={mapBoxLeftBotCss}>
            <a href="https://goo.gl/maps/ZvWVUsxTGKYK6R9b6" id="mapLink">
              Maps
              <div css={arrow}> →</div>
            </a>
          </div>
        </div>
        <div id="mapBoxRight">
          <iframe
            src={map}
            title="map"
            width="100%"
            max-width="720"
            height="100%"
            max-height="367"
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"></iframe>
        </div>
      </div>
    </div>
  )
}

export default HomeMap
