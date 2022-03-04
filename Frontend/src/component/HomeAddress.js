/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import aboutAddressPictureLeft from '../assets/images/aboutAddressPictureLeft.png'
import aboutAddressPictureMiddle from '../assets/images/aboutAddressPictureMiddle.png'
import aboutAddressPictureRight from '../assets/images/aboutAddressPictureRight.png'
import React from 'react'

const HomeAddress = () => {
  const aboutAddressPictureLeftCss = css`
    width: 100%;
    max-height: 740px;
  `

  const aboutAddressMidTopCss = css`
    margin-top: 70px;
  `

  const aboutAddressMidTopContentCss = css`
    font-size: 24px;
    margin-top: 10px;
  `

  const arrow = css`
    font-size: 20px;
  `

  const aboutAddressPictureMiddleCss = css`
    width: 100%;
  `

  const aboutAddressPictureRightCss = css`
    width: 100%;
    max-height: 740px;
  `

  return (
    <div id="aboutAddress">
      <div className="container">
        <div id="aboutAddressBox">
          <div id="aboutAddressLeft">
            <img
              src={aboutAddressPictureLeft}
              css={aboutAddressPictureLeftCss}
              alt="aboutAddressPictureLeft"
            />
          </div>
          <div id="aboutAddressMid">
            <div id="aboutAddressMidTop">
              <div id="aboutAddressMidTopTop" css={aboutAddressMidTopCss}>
                探索如來之家
                <div css={aboutAddressMidTopContentCss}>查看如來之家的資訊</div>
              </div>
              <div id="aboutAddressMidTopBot">
                <a href="#mapBoxRight" id="addressLink">
                  <div id="aboutAddressLink">
                    地址
                    <div css={arrow}> →</div>
                  </div>
                </a>
              </div>
            </div>
            <div id="aboutAddressMidBot">
              <img
                src={aboutAddressPictureMiddle}
                css={aboutAddressPictureMiddleCss}
                alt="aboutAddressPictureMiddle"
              />
            </div>
          </div>
          <div id="aboutAddressRight">
            <img
              src={aboutAddressPictureRight}
              css={aboutAddressPictureRightCss}
              alt="aboutAddressPictureRight"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeAddress
