import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { getDharmByID } from '../redux/action/dharm'
import CreateDgarmPage from '../component/DharmPanel'

const DharmEdit = () => {
  const dispatch = useDispatch()
  const dharmData = useSelector((state) => state.dharmReducer.pageDharm)
  const match = useRouteMatch()

  useEffect(() => {
    dispatch(getDharmByID(match.params.id))
  }, [match.params.id])

  return (
    <>
      <div id="PrototypeBoxTop">管理法語</div>
      <div id="Prototype">
        <div id="PrototypeBox">
          <div id="PrototypeBoxMid">
            <CreateDgarmPage
              inputContent={dharmData.content}
              id={dharmData._id}
              type={dharmData.type}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default DharmEdit
