/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Route, Link, useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'
import { tokenCheck } from '../redux/action/login'
import { useDispatch, useSelector } from 'react-redux'
import { scrollToAnchor } from '../models/tool'

const List = () => {
  const px1440 = css`
    height: 50px;
    display: flex;
    justify-content: flex-start;
    font-size: 24px;
    margin-top: 0px;
    padding: 0px;
    & .li {
      margin-right: 40px;
    }
  `

  const loggedIn = css`
    width: 100%;
  `

  const loggedInLi = css`
    & .li {
      margin-right: 20px;
    }
  `

  const dispatch = useDispatch()
  const login = useSelector((state) => state.loginReducer.login)
  const locat = useLocation()

  useEffect(() => {
    dispatch(tokenCheck())
  }, [locat.pathname])

  return (
    <Route>
      <ul css={[px1440, login && loggedIn, login && loggedInLi]}>
        <Link className="li" to="/AboutUs" onClick={() => scrollToAnchor()}>
          如來之家
        </Link>
        <Link className="li" to="/Ceremony" onClick={() => scrollToAnchor()}>
          本寺法會
        </Link>
        <Link
          className="li"
          to="/SocialEducation"
          onClick={() => scrollToAnchor()}>
          教育文化
        </Link>
        <Link
          className="li"
          to="/WelfareService"
          onClick={() => scrollToAnchor()}>
          福利服務
        </Link>
        <Link
          className="li"
          to="/CharitableRelief"
          onClick={() => scrollToAnchor()}>
          慈善關懷
        </Link>
        <Link className="li" to="/Volunteer" onClick={() => scrollToAnchor()}>
          如來志工
        </Link>
        <Link className="li" to="/Calendar" onClick={() => scrollToAnchor()}>
          行事曆
        </Link>
      </ul>
      <ul css={[px1440, login && loggedIn, login && loggedInLi]}>
        {login && (
          <>
            <Link
              className="li"
              to="/DharmaCreate"
              onClick={() => scrollToAnchor()}>
              <h5>管理法語</h5>
            </Link>
            <Link
              className="li"
              to="/CeremonyCreate"
              onClick={() => scrollToAnchor()}>
              <h5>管理法會</h5>
            </Link>
            <Link
              className="li"
              to="/SocialEducationCreate"
              onClick={() => scrollToAnchor()}>
              <h5>管理教育文化</h5>
            </Link>
            <Link
              className="li"
              to="/WelfareServiceCreate"
              onClick={() => scrollToAnchor()}>
              <h5>管理福利服務</h5>
            </Link>
            <Link
              className="li"
              to="/CharitableReliefCreate"
              onClick={() => scrollToAnchor()}>
              <h5>管理慈善關懷</h5>
            </Link>
            <Link
              className="li"
              to="/VolunteerCreate"
              onClick={() => scrollToAnchor()}>
              <h5>管理如來志工</h5>
            </Link>
            <Link
              className="li"
              to="/SliderAlbum"
              onClick={() => scrollToAnchor()}>
              <h5>管理照片跑馬燈</h5>
            </Link>
            <Link className="li" to="/Logout" onClick={() => scrollToAnchor()}>
              <h5>登出</h5>
            </Link>
          </>
        )}
      </ul>
    </Route>
  )
}

export default List
