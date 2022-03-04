/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'

const HomeNewsMidSide = ({
  path = '/news',
  title,
  content,
  useSlice = false,
  more = false
}) => {
  const newsMidTitle = css`
    color: rgb(167, 146, 104);
    width: 100%;
    max-width: 400px;
    height: 185px;
    text-align: center;
    font-size: 30px;
    padding-top: 70px;
    overflow: hidden;
  `

  const newsMidContent = css`
    display: flex;
    line-height: 40px;
    flex-direction: column;
    white-space: pre-wrap;
    word-break: break-word;
    overflow: hidden;
    width: 400px;
    max-width: 400px;
    text-align: left;
    min-height: 470px;
    font-size: 20px;
    padding: 10px 0;
  `

  const moretxt = css`
    color: rgb(167, 146, 104);
    text-align: right;
    right: 0px;
  `

  if (
    useSlice &&
    content !== null &&
    content.match(/\n/gi) &&
    content.match(/\n/gi).length > 8
  ) {
    more = true
  }

  if (useSlice && content !== null && content.length > 150) {
    content = content.slice(0, 150)
    more = true
  }

  const contentSplit = content && content.split('\n')

  return (
    <div id="newsMid">
      <div css={newsMidTitle} title={title}>
        {title}
      </div>
      <a href={path !== '/news' ? path : undefined}>
        <div css={newsMidContent}>
          {content &&
            contentSplit.map(
              (it, i) =>
                (!useSlice || i < 9) && <div key={'x' + i}>{it + ' '}</div>
            )}
          {more && (
            <>
              <br />
              <div css={moretxt}>(More)</div>
            </>
          )}
        </div>
      </a>
    </div>
  )
}

export default HomeNewsMidSide
