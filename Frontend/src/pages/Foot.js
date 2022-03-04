/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import footUseLogo from '../assets/images/footUseLogo.png'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVisitorCounter, addVisitorCounter } from '../redux/action/login'

const Foot = () => {
  const px1440 = css`
    display: flex;
    align-items: center;
    width: 30%;
    height: 266px;
    font-size: 14px;
    color: rgb(241, 213, 157);
  `

  const footer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 266px;
    background: rgb(33, 40, 6);
  `

  const footerBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    height: 266px;
  `

  const footerBoxLeft = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 235px;
    height: 266px;
  `

  const footerBoxRight = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 320px;
    height: 266px;
    font-size: 14px;
    color: rgb(241, 213, 157);
  `

  const [visitorCounterNumber, setVisitorCounterNumber] = useState(0)
  const dispatch = useDispatch()

  const albumSliderData = useSelector(
    (state) => state.loginReducer.visitorCounter
  )

  useEffect(() => {
    setVisitorCounterNumber(albumSliderData)
  }, [albumSliderData])
  useEffect(() => {
    dispatch(getVisitorCounter())
    dispatch(addVisitorCounter())
  }, [])

  return (
    <div css={footer}>
      <div css={footerBox}>
        <div css={footerBoxLeft}>
          <img src={footUseLogo} alt="Foot Use Logo" />
        </div>
        <div css={px1440}>
          點閱人數：{visitorCounterNumber}
          <br />
          <br />
          南市寺登字第 23-029 號<br />
          地　　址：臺南市玉井區中正里 001 鄰後旦街 91 號<br />
          電　　話：06-574-7449/06-272-9144
          <br />
          服務時間：09:00~17:00
          <br />
        </div>
        <div css={px1440}>
          捐贈帳號：066-125-007-709
          <br />
          銀行代號：0540663（京城銀行玉井分行）
          <br />
          戶　　名：如來之家杜麗真
          <br />
          <br />
          劃撥帳號：31649740
          <br />
          戶　　名：如來之家杜麗真
        </div>
        <div css={footerBoxRight}>如來之家 © 2021</div>
      </div>
    </div>
  )
}

export default Foot
