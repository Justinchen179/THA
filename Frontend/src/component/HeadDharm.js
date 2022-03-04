/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import HeadLink from './HeadLink'
import TodayDharm from './TodayDharm'
import { useSelector, useDispatch } from 'react-redux'
import { getDharm, getTodaydharm } from '../redux/action/dharm'
import { useLocation } from 'react-router'

const HeadDharm = () => {
  const px1440 = css`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 500px;
    min-width: 240px;
    max-width: 240px;
  `

  const dharmTitle = css`
    display: flex;
    justify-content: center;
    color: #bd8d55;
    font-size: 32px;
    margin-top: 45px;
    margin-bottom: 40px;
  `

  const dharmContent = css`
    display: flex;
    justify-content: center;
    height: 270px;
  `

  const dharmaBox = css`
    width: 240px;
    height: 335px;
    opacity: 0;
  `

  const display = css`
    transition: opacity 1s;
    opacity: 1;
  `

  const Location = useLocation()
  const dispatch = useDispatch()
  const dharm = useSelector((state) => state.dharmReducer.todayDharm)

  useEffect(() => {
    dispatch(getDharm())
  }, [])
  useEffect(() => {
    dispatch(getTodaydharm())
  }, [Location.pathname])

  return (
    <>
      <div css={px1440}>
        {dharm && dharm.content && (
          <div css={[dharmaBox, display]}>
            <div>
              <div css={dharmTitle}>今日法語</div>
              <div css={dharmContent}>
                <TodayDharm dharmData={dharm} />
              </div>
            </div>
          </div>
        )}
        <HeadLink />
      </div>
    </>
  )
}

export default HeadDharm
