/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import about1Image from '../assets/images/about-us-1.jpeg'
import about2Image from '../assets/images/about-us-2.jpeg'
import about3Image from '../assets/images/about-us-3.jpg'
import about4Image from '../assets/images/about-us-4.jpg'
import about5Image from '../assets/images/about-us-5.jpg'
import about6Image from '../assets/images/about-us-6.jpg'
import about7Image from '../assets/images/about-us-7.jpg'

const AboutUs = () => {
  const Prototype = css`
    display: flex;
    width: 100%;
    min-height: 600px;
    background: #fcf8f3;
    justify-content: center;
  `

  const PrototypeBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    width: 100%;
    line-height: 20px;
    max-width: 1100px;
    min-height: 250px;
    font-size: 20px;
    color: rgb(167, 146, 104);
    text-align: left;
  `

  const fontBold = css`
    font-weight: bold;
  `

  const lineheight = css`
    line-height: 40px;
  `

  useEffect(() => {
    document.title = '關於我們 - 如來之家'
  }, [])

  return (
    <>
      <div css={Prototype}>
        <div css={PrototypeBox}>
          <div css={PrototypeBoxTop}>如來之家</div>
          <div css={PrototypeBoxMid}>
            <p css={lineheight}>
              　　如來之家在玉井駐腳，將於今年 (2022)
              雙十國慶日邁入第十二個年頭。
            </p>
            <p css={lineheight}>
              　　創辦人 <span css={fontBold}>覺欣</span>
              師父認為，教育不能等，尤其位在山區的弱勢兒童們，真的需要更多的關懷與協助。當初為了修行才到台南玉井區的覺欣師父，廣結善緣，深得左鄰右舍的信任，在農忙時紛紛託他照顧孩子，就這樣由三、五個孩子慢慢增加至十多個，覺欣師父除了受託照顧孩子外，也會為孩子準備餐點，做課輔並安排其他學習課程。在其用心的關懷孩子下，每逢寒暑假期，孩子更會多達數十個人，幾年下來，小小的如來之家空間，已漸難容納需求，四年前，覺欣師父動了念頭，想為孩子們蓋大一點的活動地方，當時，鄉親們大致都不以為然，認為這不是一件容易的事。
            </p>
            <p css={lineheight}>
              　　一通電話的因緣，覺欣師父為偏鄉孩童的付出，感動了沈志忠建築設計師，就特地為如來之家設計一座結合現代美學與簡約、樸素、禪意風格的建築，新的如來之家，在歷經兩年餘的籌建，也於2020年10月10日正式落成啟用。
            </p>
            <p css={lineheight}>
              　　如來之家有了新據點，未來當地的孩子們，有更寬敞的學習空間！三樓如來殿佛陀莊嚴慈悲的聖像，相信會吸引當地更多民眾前來禮佛丶學佛！{' '}
            </p>
            <p css={lineheight}>
              　　覺欣師父說，感恩許多貴人及十方有緣人共同成就如來之家關懷新據點，真的不容易，也印證了社會的力量是無窮，如來之家把鄉親們認為不可能的事變成可能了，而今，如來之家新建築物已完工落成，特別感恩世界金獎大師
              <span css={fontBold}>沈志忠</span>
              先生無私的奉獻與付出，不求回報的為道場規劃設計，乘園建築師事務所
              <span css={fontBold}>吳怡慧</span>建築師與無界空間設計設計總監
              <span css={fontBold}>王洋</span>
              與科定（上海）商貿有限公司深圳分公司銷售總監
              <span css={fontBold}>劉俐君</span>
              ，營造商正台壹工程股份有限公司等的鼎力協助，同時感恩國內知名藝術家
              <span css={fontBold}>黃怡文</span>老師和
              <span css={fontBold}>康月足</span>
              老師伉儷號召多位藝術家們一起義賣藝術品來協助經費，更感謝長期護持的信眾們及各界人士義無反顧的幫忙，眾志成城，終讓山區的弱勢孩子有了更完善的處所。
            </p>
          </div>
          <p>
            <img src={about1Image} alt="activity" />
          </p>
          <p>
            <img src={about2Image} alt="activity" />
          </p>
          <p>
            <img src={about3Image} alt="activity" />
          </p>
          <p>
            <img src={about4Image} alt="activity" />
          </p>
          <p>
            <img src={about5Image} alt="activity" />
          </p>
          <p>
            <img src={about6Image} alt="activity" />
          </p>
          <p>
            <img src={about7Image} alt="activity" />
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutUs
