/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router'
import PictureViewer from './PictureViewer'
import { S3_URI } from '../models/tool'
import {
  createAlbum,
  editAlbum,
  deleteAlbum as deleteAlbumPage,
  hiddenAlbum as hiddenAlbumPage,
  deleteFile as deleteDownloadFile,
  hiddenFile as hiddenDownloadFile
} from '../redux/action/album'

const AlbumPanel = ({
  action,
  inputType,
  inputTitle,
  inputContent,
  id,
  inputPicture,
  inputHidden,
  reload,
  coverPicture,
  inputFile
}) => {
  const albumPage = css`
    display: flex;
    flex-direction: column;
  `

  const albumCreate = css`
    display: flex;
  `

  const albumContent = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 24px;
    padding: 20px;
  `

  const albumTitle = css`
    text-align: center;
    width: 100%;
    font-size: 30px;
    font-weight: bold;
  `

  const albumCreatePictureFont = css`
    font-size: 30px;
  `

  const albumCreatePictureButton = css`
    margin-left: 10px;
  `

  const albumCreatePictureButtonFont = css`
    font-size: 24px;
  `

  const AlbumCreateContentTextarea = css`
    min-height: 240px;
    width: 320px;
    resize: none;
  `

  const [title, setTitle] = useState('標題')
  const [content, setContent] = useState('內文')
  const [type, setType] = useState(inputType)
  const [uploading, setUploading] = useState(false)
  const albumCreateTitleRef = useRef()
  const albumCreateContentRef = useRef()
  const albumCreateFileRef = useRef()
  const albumCreateDownloadFileRef = useRef()
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const actionType = 'createAlbum'

  const translateType = {
    Ceremony: '法會',
    SocialEducation: '教育文化',
    WelfareService: '福利服務',
    CharitableRelief: '慈善關懷',
    Volunteer: '如來志工'
  }

  const AlbumType = translateType[inputType]

  const albumPreviewTitleChange = () => {
    setTitle(albumCreateTitleRef.current.value)
  }

  const albumPreviewContentChange = () => {
    const content = albumCreateContentRef.current.value

    setContent(content)
  }

  const createAlbumAsync = async (e) => {
    e.preventDefault()
    setUploading(true)

    if (action) {
      const createActionType = actionType.toString()
      const createTitle = title.toString()
      const createContent = content.toString()
      const file = albumCreateFileRef.current.files
      const downloadFile = albumCreateDownloadFileRef.current.files

      const create = await dispatch(
        createAlbum(
          createActionType,
          createTitle,
          createContent,
          file,
          type,
          downloadFile
        )
      )

      if (create.payload.response.status === true) {
        action()
        setUploading(false)
      }
    } else if (!action) {
      const editId = match.params.id
      const editType = type.toString()
      const editTitle = title.toString()
      const editContent = content.toString()
      const file = albumCreateFileRef.current.files
      const downloadFile = albumCreateDownloadFileRef.current.files

      const edit = await dispatch(
        editAlbum(editId, editType, editTitle, editContent, file, downloadFile)
      )

      if (edit.payload.response.status === true) {
        setUploading(false)
        reload(true)
        window.history.back()
      }
    }
  }

  const deleteAlbum = async (id) => {
    if (window.confirm('確定是否刪除？') === true) {
      const create = await dispatch(deleteAlbumPage(id))

      if (create.payload.response.status === true) window.history.back()
    }
  }

  const deleteFile = async (filePath) => {
    if (window.confirm('確定是否刪除？') === true) {
      const albumId = match.params.id

      filePath = filePath.toString()

      const create = await dispatch(deleteDownloadFile(albumId, filePath))

      if (create.payload.response.status === true) reload(true)
    }
  }

  const hiddenAlbum = async () => {
    const albumId = match.params.id
    const albumHidden = !inputHidden
    const create = await dispatch(hiddenAlbumPage(albumId, albumHidden))

    if (create.payload.response.status === true) {
      reload(true)
    }
  }

  const hiddenFile = async (fileHiddenId, fileHidden) => {
    const albumId = match.params.id

    fileHiddenId = fileHiddenId.toString()
    fileHidden = fileHidden.toString()

    const create = await dispatch(
      hiddenDownloadFile(albumId, fileHiddenId, fileHidden)
    )

    if (create.payload.response.status === true) {
      reload(true)
    } else {
      alert('登入超時')
      window.location.href = '/'
    }
  }

  useEffect(() => {
    if (inputContent) {
      setType(inputType)
      setTitle(inputTitle)
      setContent(inputContent)
      albumCreateTitleRef.current.value = inputTitle
      albumCreateContentRef.current.value = inputContent
    }
  }, [inputContent])

  return (
    <>
      {AlbumType ? (
        <div id="AlbumBox" css={albumPage}>
          <div css={albumCreate}>
            <div id="AlbumCreateLeft">
              <form onSubmit={createAlbumAsync}>
                <div className="AlbumCreateTitle">
                  <p>標題</p>
                  <input
                    required
                    ref={albumCreateTitleRef}
                    name="title"
                    type="text"
                    onInput={() => albumPreviewTitleChange()}
                    defaultValue={'標題'}
                  />
                </div>
                <div className="AlbumCreateContent">
                  <p>內文</p>
                  <textarea
                    required
                    ref={albumCreateContentRef}
                    name="content"
                    type="text"
                    css={AlbumCreateContentTextarea}
                    onInput={() => albumPreviewContentChange()}
                    defaultValue={'內文'}
                  />
                </div>
                {!uploading ? (
                  <>
                    <p>新增照片</p>
                    <input
                      ref={albumCreateFileRef}
                      component="label"
                      id="AlbumCreatePicture"
                      name="file"
                      type="file"
                      accept="image/png, image/jpeg"
                      multiple="multiple"
                    />
                    <p>新增下載檔案</p>
                    <input
                      ref={albumCreateDownloadFileRef}
                      component="label"
                      id="AlbumCreatePicture"
                      name="file"
                      type="file"
                      accept="application/pdf"
                      multiple="multiple"
                    />
                    <div id="AlbumCreatePicture" css={albumCreatePictureFont}>
                      操作
                      <br />
                      <button>
                        {action ? `建立新${AlbumType}` : '確定修改標題與內文'}
                      </button>
                      <br />
                      {action ? (
                        <button
                          type="button"
                          onClick={() => {
                            action()
                          }}>
                          {' '}
                          取消
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => window.history.back()}>
                            取消修改標題與內文
                          </button>
                          <br />
                          <button type="button" onClick={() => deleteAlbum(id)}>
                            {`刪除整個${AlbumType}`}
                          </button>
                          <br />
                          <button type="button" onClick={() => hiddenAlbum()}>
                            {!inputHidden
                              ? `隱藏整個${AlbumType}`
                              : `顯示整個${AlbumType}`}
                          </button>
                          <br />
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <div id="AlbumCreatePicture" css={albumCreatePictureFont}>
                    上傳中...請不要離開此頁面
                  </div>
                )}
              </form>
            </div>
            <div id="AlbumCreateRight">
              <div id="AlbumTxtBox">
                <div id="AlbumTxt">
                  <div css={albumTitle}>{title}</div>
                  <br />
                  <div css={albumContent}>
                    {content &&
                      content
                        .split('\n')
                        .map((it, i) => <div key={'x' + i}>{it + ' '}</div>)}
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div id="AlbumCreatePicture">
            {inputFile && (
              <>
                {inputFile.length !== 0 && (
                  <div css={albumCreatePictureFont}> 附件: </div>
                )}
                <div css={albumCreatePictureButtonFont}>
                  {inputFile.map((e, i) => (
                    <div key={i}>
                      <a href={`${S3_URI}/file/${e.path}`}>{e.content}</a>
                      <button
                        css={albumCreatePictureButton}
                        onClick={() => deleteFile(e.path)}>
                        刪除
                      </button>
                      <button
                        css={albumCreatePictureButton}
                        onClick={() => hiddenFile(e._id, e.hidden)}>
                        {e.hidden ? '顯示' : '隱藏'}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
            <br />
            <PictureViewer
              albumDisplayIndex={inputPicture && inputPicture.length}
              albumData={inputPicture}
              text={true}
              action={'lightBox'}
              button={inputPicture}
              reload={reload}
              coverPicture={coverPicture}
              type={action ? 'albumCreate' : 'albumPictureCreate'}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default AlbumPanel
