/** @jsxImportSource @emotion/react */
import { cx, css } from '@emotion/css'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import SliderArrow from './SliderArrow'
import { S3_URI } from '../models/tool'

const HeadSlider = () => {
  const hide = css`
    display: none;
  `

  const px1440 = css`
    // width: calc(100% - 280px);
    width: 1160px;
    height: 500px;
    box-sizing: border-box;
    outline: 10px solid rgba(255, 255, 255, 0.5);
    outline-offset: -10px;
    box-shadow: 0px 0px 15px 10px rgba(255, 255, 255, 0.2);
  `

  const px1440Slider0 = css`
    transform: translate(-25px, 0px);
    z-index: 6;
    opacity: 0;
  `

  const px1440Slider1 = css`
    transform: translate(0px, 0px);
    z-index: 5;
    opacity: 1;
  `

  const px1440Slider2 = css`
    transform: translate(25px, 0px);
    z-index: 4;
    opacity: 0;
  `

  const px1440Slider3 = css`
    transform: translate(50px, 0px);
    z-index: 3;
    opacity: 0;
  `

  const px1440Slider4 = css`
    transform: translate(50px, 0px);
    z-index: 2;
    opacity: 0;
  `

  const arrowCss = css`
    display: flex;
    justify-content: space-between;
  `

  const linkTop = css`
    display: flex;
    background: rgb(214, 190, 162);
    width: 100%;
    height: 120px;
    margin-top: 380px;
  `

  const linkR = css`
    display: flex;
    background: rgb(214, 190, 162);
    width: 100%;
    height: 120px;
  `

  const dharmLinkR = css`
    display: flex;
    align-items: flex-end;
    width: calc((100% - 1400px) / 2);
  `

  const titleSlide = css`
    transition: 0.3s all ease-in-out;
    position: absolute;
  `

  const titleImages = css`
    z-index: 3;
    width: 1160px;
    overflow: hidden;
  `

  const [index, setIndex] = useState([])
  const [startTurnR, setStartTurnR] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loadingPicture, setLoadingPicture] = useState(false)
  const itemsRef = useRef([])
  const displayRef = useRef([])
  const albumSliderData = useSelector((state) => state.albumReducer.homeSlider)

  const CssList = [
    px1440Slider0,
    px1440Slider1,
    px1440Slider2,
    px1440Slider3,
    px1440Slider4
  ]

  const sliderIndexChangeLeft = () => {
    if (loading === false) {
      setLoading(true)

      const sliderArray = index

      sliderArray.unshift(sliderArray[sliderArray.length - 1])
      sliderArray.pop()
      setIndex(sliderArray)
      setTimeout(() => setLoading(false), 300)
    }
  }

  const sliderIndexChangeRight = () => {
    if (loading === false && index.length !== 0) {
      setLoading(true)

      const sliderArray = index

      sliderArray.push(sliderArray[0])
      sliderArray.shift()
      setIndex(sliderArray)
      setTimeout(() => setLoading(false), 300)
    }
  }

  useEffect(() => {
    if (loading === true) {
      itemsRef.current.forEach((el, i) => {
        const isHidden = index[i] !== 'hidden'

        el.className = cx(px1440, titleSlide, {
          [CssList[index[i]]]: isHidden,
          [hide]: !isHidden
        })
      })
    }
  }, [loading])
  useEffect(() => {
    let changeIndex = []

    for (let i = 0; i < albumSliderData.length; i++) {
      changeIndex = [...changeIndex, i < 5 ? i : 'hidden']
    }

    setIndex(changeIndex)
  }, [albumSliderData])
  useEffect(() => {
    if (startTurnR === true && index.length !== 0) {
      setInterval(sliderIndexChangeLeft, 6000)
      setStartTurnR(false)
    }
  }, [index])

  return (
    <>
      <div
        ref={displayRef}
        id="titleSlide"
        className="opacity"
        style={
          loadingPicture ? { opacity: '1', transition: 'opacity 1s' } : {}
        }>
        <div css={arrowCss}>
          <SliderArrow
            id={'titleSlideArrow'}
            action={() => sliderIndexChangeLeft()}
            style={{
              marginLeft: '80px',
              marginTop: '480px',
              transform: 'rotate(180deg)'
            }}
          />

          <SliderArrow
            id={'titleSlideArrow'}
            action={() => sliderIndexChangeRight()}
            style={{
              marginLeft: '110px',
              marginTop: '418px',
              transform: 'rotate(0deg)'
            }}
          />
        </div>
        <div css={[titleImages, px1440]}>
          {albumSliderData &&
            albumSliderData.map((e, i) => (
              <img
                className={cx(
                  px1440,
                  {
                    [CssList[i]]: i <= 4,
                    [hide]: i > 4
                  },
                  titleSlide
                )}
                ref={(el) => (itemsRef.current[i] = el)}
                onLoad={() => i === 3 && setLoadingPicture(true)}
                src={`${S3_URI}/image/cover%2B${e.path}`}
                alt={`slide${i}`}
                id={`slide${i}`}
                key={`slide${i}`}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = `${S3_URI}/image/erruse.jpg`
                }}
              />
            ))}
        </div>
        <div css={linkTop}></div>
      </div>
      <div css={dharmLinkR}>
        <div css={linkR}></div>
      </div>
    </>
  )
}

export default HeadSlider
