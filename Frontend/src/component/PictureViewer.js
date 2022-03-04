/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useRef } from 'react'
import PictureFrame from './PictureFrame'
import SliderPictureFrame from './SliderPictureFrame'

const PictureViewer = ({
  albumDisplayIndex = 1,
  albumData,
  type,
  text = false,
  button = false,
  action,
  reload,
  coverPicture,
  id,
  albumSliderPictureNumber
}) => {
  const px1440 = css`
    justify-content: flex-start;
    width: 100%;
    max-width: 1065px;
    display: flex;
    background: rgb(252, 248, 243);
    flex-wrap: wrap;
  `

  const lightBoxPicture = useRef()
  const albumDisplay = [...Array(albumDisplayIndex).keys()]

  return (
    <div css={px1440} id="albumAnchor">
      {action === 'lightBox' && (
        <div id="coverbox">
          <span
            ref={lightBoxPicture}
            onClick={() => window.history.back()}
            style={{ backgroundImage: 'url()' }}
          />
        </div>
      )}
      {albumData &&
        albumDisplay.map(
          (e) =>
            albumData[e] && (
              <>
                {type === 'albumSliderPicture' ? (
                  <SliderPictureFrame
                    key={e}
                    picture={'cover%2B' + albumData[e].path}
                    path={'Album/' + albumData[e]._id}
                    title={text && albumData[e].content}
                    action={action}
                    type={type}
                    hidden={albumData[e].hidden}
                    lightBoxPicture={lightBoxPicture}
                    coverPicture={coverPicture}
                    reload={reload}
                    pictureNumber={albumSliderPictureNumber}
                    id={id}
                  />
                ) : (
                  <PictureFrame
                    key={e}
                    picture={
                      'cover%2B' +
                      (albumData[e].coverPicture || albumData[e].path)
                    }
                    path={`${albumData[e].type}/` + albumData[e]._id}
                    title={text && (albumData[e].title || albumData[e].content)}
                    action={action}
                    type={type}
                    hidden={albumData[e].hidden}
                    lightBoxPicture={lightBoxPicture}
                    button={button}
                    coverPicture={coverPicture}
                    reload={reload}
                  />
                )}
              </>
            )
        )}
    </div>
  )
}

export default PictureViewer
