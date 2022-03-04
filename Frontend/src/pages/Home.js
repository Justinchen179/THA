import HomeAbout from '../component/HomeAbout'
import HomeAddress from '../component/HomeAddress'
import HomeMap from '../component/HomeMap'
import HomeNews from '../component/HomeNews'
import HomeAlbum from '../component/HomeAlbum'
import React, { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    document.title = '如來之家'
  }, [])

  return (
    <>
      <HomeAbout min={false} />
      <HomeAlbum min={false} />
      <HomeNews min={false} />
      <HomeAddress min={false} />
      <HomeMap min={false} />
    </>
  )
}

export default Home
