/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Route, Link, useRouteMatch } from 'react-router-dom'
import React from 'react'

const DataRow = ({ title, path }) => {
  const px1440 = css`
    font-size: 18px;
    color: rgb(167, 146, 104);
    line-height: 40px;
    display: flex;
    align-items: center;
  `

  const hover = css`
    &&:hover {
      background: rgb(235, 208, 177);
    }
  `

  const newsSpaceTitle = css`
    font-size: 24px;
    width: 100%;
    max-width: 980px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `

  const match = useRouteMatch()

  return (
    <Route>
      <div css={hover}>
        <div css={px1440}>
          {<div className="newsspace"></div>}
          <div css={newsSpaceTitle}>{title}</div>
          <div className="opsCol">
            <Link className="optBtn optBtnSm" to={`${match.path}/${path}`}>
              編輯
            </Link>
          </div>
        </div>
      </div>
    </Route>
  )
}

export default DataRow
