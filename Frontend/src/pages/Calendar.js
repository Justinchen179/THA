/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect } from 'react'

const Calendar = () => {
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
    text-align: center;
  `

  const calendarTabletsTitle = css`
    font-size: 24px;
  `

  useEffect(() => {
    document.title = '行事曆 - 如來之家'
  }, [])

  return (
    <>
      <div css={Prototype}>
        <div css={PrototypeBox}>
          <div css={PrototypeBoxTop}>如來之家</div>
          <div css={PrototypeBoxMid}>
            <table className="calendarTable">
              <th colSpan={4} className="calendarTablets" />
              <tr>
                <th colSpan={4} css={calendarTabletsTitle}>
                  道場法會
                </th>
              </tr>
              <tr>
                <th>法會內容</th>
                <th>日期</th>
                <th>時間</th>
                <th>備註</th>
              </tr>
              <th colSpan={4} className="calendarTablets" />
              <tr>
                <td>佛成道日</td>
                <td>1/10(一)</td>
                <td></td>
                <td>1/9-1/10分發臘八粥</td>
              </tr>
              <tr>
                <td>圓燈法會</td>
                <td>1/16(日)</td>
                <td>下午 2:00-4:30</td>
                <td></td>
              </tr>
              <tr>
                <td rowSpan={2}>新春燃燈供佛</td>
                <td>1/31 (一)</td>
                <td>晚 9:00-11:00</td>
                <td>
                  1/31除夕
                  <br />
                  藥師經、普佛叩鐘108拜
                </td>
              </tr>
              <tr>
                <td>2/1-2/6 (二-日)</td>
                <td>晚 7:00-9:00</td>
                <td>誦藥師經</td>
              </tr>
              <tr>
                <td>上燈法會</td>
                <td>2/13（日）</td>
                <td>下午 1:30-5:00</td>
                <td></td>
              </tr>
              <tr>
                <td rowSpan={3}>大悲懺法會</td>
                <td>3/20（日）</td>
                <td>下午 2:00-4:30</td>
                <td>農2/18舉行</td>
              </tr>
              <tr>
                <td>7/17（日）</td>
                <td>下午 2:00-4:30</td>
                <td></td>
              </tr>
              <tr>
                <td>10/14（五）</td>
                <td>晚 6:30-9:00</td>
                <td></td>
              </tr>
              <tr>
                <td>
                  禮懺法會
                  <br />
                  1. 藥師懺(單月)
                </td>
                <td>
                  3/13(日)
                  <br />
                  5/15(日)
                  <br />
                  7/10(日)
                  <br />
                  9/11(日)
                  <br />
                  11/13(日)
                  <br />
                  112/1/8(日)
                </td>
                <td rowSpan={2}>下午 1:30-5:30</td>
                <td rowSpan={2}>
                  每月第二星期日
                  <br />
                  PS-時間會因特殊情況而做適當調整。
                </td>
              </tr>
              <tr>
                <td>
                  禮懺法會
                  <br />
                  2. 水懺(雙月)
                </td>
                <td>
                  2/13(日)
                  <br />
                  4/02(六)
                  <br />
                  6/12(日)
                  <br />
                  10/2(日)
                  <br />
                  12/25(日)
                </td>
              </tr>
              <tr>
                <td>清明三時繫念</td>
                <td>4/2(六)</td>
                <td>下午 2:00</td>
                <td></td>
              </tr>
              <tr>
                <td>中元焰口法會</td>
                <td>8/20(六)</td>
                <td>下午 1:30</td>
                <td></td>
              </tr>
              <tr>
                <td rowSpan={2}>藥師法會</td>
                <td>10/21-10/22（五-六）</td>
                <td>晚 6:30-9:00</td>
                <td rowSpan={2}>藥師法門修持</td>
              </tr>
              <tr>
                <td>10/23（日）</td>
                <td>早 9:00-17:00</td>
              </tr>
              <tr>
                <td rowSpan={3}>彌陀法會</td>
                <td>12/9（五）</td>
                <td>晚 7:00-9:00</td>
                <td rowSpan={3}>淨土法門修持</td>
              </tr>
              <tr>
                <td>12/10（六）</td>
                <td>早 9:00-16:30</td>
              </tr>
              <tr>
                <td>12/11(日)</td>
                <td>早 9:00-16:30</td>
              </tr>
            </table>

            <table className="calendarTable">
              <th colSpan={4} className="calendarTablets" />
              <tr>
                <th colSpan={4} css={calendarTabletsTitle}>
                  道場活動
                </th>
              </tr>
              <tr>
                <th>法會內容</th>
                <th>日期</th>
                <th>時間</th>
                <th>備註</th>
              </tr>
              <th colSpan={4} className="calendarTablets" />
              <tr>
                <td>歲末餐會</td>
                <td>1/23(日)</td>
                <td>中午 11:30</td>
                <td></td>
              </tr>
              <tr>
                <td>兒童冬令營</td>
                <td>1/24-1/25(一-二)</td>
                <td>早 8:00-16:30</td>
                <td></td>
              </tr>
              <tr>
                <td>八關齋戒</td>
                <td>5/14(六) 12/17(六)</td>
                <td>早 8:00-18:30</td>
                <td></td>
              </tr>
              <tr>
                <td>一日禪</td>
                <td>8/28(日) 11/27(日)</td>
                <td>早 8:00-16:30</td>
                <td>對象：對禪修有興趣者</td>
              </tr>
              <tr>
                <td>淨土修持 - 精進念佛</td>
                <td>
                  1/1(六)
                  <br />
                  4/17(日)
                  <br />
                  7/31(日)
                  <br />
                  9/25(日)
                  <br />
                  12/9-12/11(五-日)
                </td>
                <td>早 8:00-16:30</td>
                <td>對象：對念佛 / 修淨土法門有興趣者</td>
              </tr>
              <tr>
                <td>新春麻糬禮盒義賣</td>
                <td>1/20-1/29</td>
                <td></td>
                <td>1/17與1/21包裝</td>
              </tr>
              <tr>
                <td>義工親子聯誼旅遊</td>
                <td>4/23-4/24(日-一)</td>
                <td></td>
                <td>知本國家森林遊樂區</td>
              </tr>
              <tr>
                <td>端午養生素粽義賣</td>
                <td>5/28-6/2(六-四)</td>
                <td></td>
                <td>5/28-5/29製作</td>
              </tr>
              <tr>
                <td>中秋麻糬禮盒義賣</td>
                <td>9/3-9/9 (六-五)</td>
                <td></td>
                <td>9/3-9/4包裝</td>
              </tr>
              <tr>
                <td>供僧暨落成紀念日</td>
                <td>10/10(一)</td>
                <td>早 9:00-14:00</td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Calendar
