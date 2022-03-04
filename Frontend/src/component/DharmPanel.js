/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createDharm, editDharm, deleteDharm } from '../redux/action/dharm'

const DharmPanel = ({ action = null, inputContent, id, type = null }) => {
  const dharma = css`
    display: flex;
    align-content: flex-start;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
  `

  const dharmaBox = css`
    display: flex;
    justify-content: center;
  `

  const dharmaCreateLeft = css`
    z-index: 1;
    padding-bottom: 20px;
    width: 400px;
  `

  const dharmaCreateRight = css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 400px;
  `

  const dharmaCreateType = css`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  `

  const dharmViewBox = css`
    width: 240px;
    height: 335px;
    background: #efe6d7;
  `

  const dharmTitle = css`
    display: flex;
    justify-content: center;
    color: #bd8d55;
    font-size: 32px;
    margin-bottom: 40px;
  `

  const dharmContentBox = css`
    display: flex;
    justify-content: center;
  `

  const dharmContent = css`
    justify-content: center;
    writing-mode: vertical-lr;
    word-break: break-word;
    height: 245px;
    line-height: 40px;
    letter-spacing: 4px;
    text-align: justify;
    color: #a79268;
    font: 24px bold;
  `

  const dharmCreatContentInput = css`
    width: 800px;
    margin-top: 20px;
    margin-bottom: 20px;
  `

  const dharmCreateContentTextarea = css`
    max-lines: 3;
    height: 144px;
    width: 269px;
    resize: none;
    margin: 20px;
  `

  const [content, setContent] = useState('內文')
  const [error, setError] = useState(true)
  const [dharmaType, setDharmaType] = useState('Dharm')
  const dharmCreatContentRef = useRef()
  const dharmaCreateTypeRef = useRef()
  const dispatch = useDispatch()

  const dharmPreviewContentChange = () => {
    const content =
      type === 'Marquee'
        ? dharmCreatContentRef.current.value.slice(0, 37)
        : dharmCreatContentRef.current.value.slice(0, 54)

    dharmCreatContentRef.current.value = content

    if (content.match(/\n/gi) && content.match(/\n/gi).length > 5) {
      setError(false)
    } else {
      setError(true)
    }

    setContent(content)
  }

  const dharmDelet = async () => {
    if (window.confirm('確定是否刪除？') === true) {
      const create = await dispatch(deleteDharm(id))

      if (create.payload.response.status === true) window.history.back()
    }
  }

  const dharmCreate = async (e) => {
    e.preventDefault()

    const restContent = content.toString()

    if (action) {
      const create = await dispatch(createDharm(restContent, dharmaType))

      if (create.payload.response.status === true) action()
    } else if (!action) {
      const restId = id.toString()
      const create = await dispatch(editDharm(restContent, restId, dharmaType))

      if (create.payload.response.status === true) window.history.back()
      if (create.payload.response.status !== true)
        alert(create.payload.response.status)
    }
  }

  const dharmaTypeChange = () => {
    setDharmaType(dharmaCreateTypeRef.current.value)
    if (content.length > 54) setError(false)
  }

  useEffect(() => {
    if (inputContent) {
      setDharmaType(type)
      setContent(inputContent)
      dharmCreatContentRef.current.value = inputContent
      dharmaCreateTypeRef.current.value = type
    }
  }, [inputContent])

  return (
    <>
      <div css={dharma}>
        <div css={dharmaBox}>
          <div css={dharmaCreateLeft}>
            <form onSubmit={dharmCreate}>
              <div css={dharmaCreateType}>
                分類：
                <select
                  onChange={() => dharmaTypeChange()}
                  ref={dharmaCreateTypeRef}
                  name="type">
                  <option value="Dharm">法語</option>
                  <option value="Marquee">跑馬燈</option>
                </select>
              </div>
              <div>
                法語
                <br />
                {dharmaType === 'Marquee' ? (
                  <input
                    ref={dharmCreatContentRef}
                    required
                    css={dharmCreatContentInput}
                    name="content"
                    onInput={() => dharmPreviewContentChange()}
                    defaultValue={content}
                  />
                ) : (
                  <textarea
                    ref={dharmCreatContentRef}
                    required
                    name="content"
                    css={dharmCreateContentTextarea}
                    onInput={() => dharmPreviewContentChange()}
                    defaultValue={content}
                  />
                )}
              </div>
              <div>
                <button disabled={!error}>
                  {!error ? '行數過多' : '確定'}
                </button>
                {action ? (
                  <button
                    type="button"
                    onClick={() => {
                      action()
                    }}>
                    取消
                  </button>
                ) : (
                  <button type="button" onClick={() => window.history.back()}>
                    取消
                  </button>
                )}
              </div>
            </form>
            <div>
              {!action && <button onClick={() => dharmDelet()}>刪除</button>}
            </div>
          </div>
          <div css={dharmaCreateRight}>
            {dharmaType !== 'Marquee' && (
              <div css={dharmViewBox}>
                <div css={dharmTitle}>今日法語</div>
                <div css={dharmContentBox}>
                  <div css={dharmContent}>
                    {content.split('\n').map((it, i) => (
                      <div key={'x' + i}>{it}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DharmPanel
