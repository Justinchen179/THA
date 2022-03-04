/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateDgarmPage from '../component/DharmPanel'
import DataRow from '../component/DataRow'
import { getDharm } from '../redux/action/dharm'

const DharmaNew = () => {
  const Prototype = css`
    display: flex;
    width: 100%;
    min-height: 600px;
    background: #fcf8f3;
    justify-content: center;
    align-items: center;
  `

  const PrototypeBox = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1400px;
    min-height: 600px;
    font-size: 34px;
    color: rgb(167, 146, 104);
  `

  const PrototypeBoxTop = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    font-size: 40px;
    background: #fcf8f3;
    color: rgb(167, 146, 104);
    padding: 60px;
  `

  const PrototypeBoxMid = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    min-height: 250px;
    font-size: 34px;
    color: rgb(167, 146, 104);
  `

  const PrototypeBoxMidRow = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
    min-height: 250px;
    font-size: 34px;
    color: rgb(167, 146, 104);
  `

  const [createPage, setCreatePage] = useState(false)
  const dispatch = useDispatch()
  const dharm = useSelector((state) => state.dharmReducer.dharmData)
  const Marquee = useSelector((state) => state.dharmReducer.Marquee)

  const createDharmChange = () => {
    dispatch(getDharm())
    setCreatePage(!createPage)
  }

  useEffect(() => {
    dispatch(getDharm())
  }, [])

  return (
    <>
      <div css={Prototype}>
        <div css={PrototypeBox}>
          <div css={PrototypeBoxTop}>管理法語</div>
          <div css={PrototypeBoxMid}>
            {!createPage && Marquee && (
              <div css={PrototypeBoxMidRow}>
                <button
                  className="optBtn"
                  onClick={() => {
                    createDharmChange()
                  }}>
                  建立新法語
                </button>
                <br />
                法語
                {dharm &&
                  dharm.map(
                    (e, i) =>
                      e._id && (
                        <DataRow
                          key={i}
                          title={e.content}
                          path={`${e._id}`}
                          action={() => {
                            createDharmChange()
                          }}
                          type={'dharmCreate'}
                        />
                      )
                  )}
                <br />
                跑馬燈
                {Marquee &&
                  Marquee.map(
                    (e, i) =>
                      e._id && (
                        <DataRow
                          key={i}
                          title={e.content}
                          path={`${e._id}`}
                          action={() => {
                            createDharmChange()
                          }}
                          type={'dharmCreate'}
                        />
                      )
                  )}
              </div>
            )}
            {createPage && (
              <CreateDgarmPage
                action={() => {
                  createDharmChange()
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DharmaNew
