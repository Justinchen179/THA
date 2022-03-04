import './App.css'
import Head from './pages/Head'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Album from './pages/Album'
import DharmaNew from './pages/DharmaNew'
import AlbumNew from './pages/AlbumNew'
import Logout from './pages/Logout'
import Login from './pages/Login'
import Foot from './pages/Foot'
import Photo from './pages/Photo'
import Calendar from './pages/Calendar'
import DharmaEdit from './pages/DharmaEdit'
import AlbumEdit from './pages/AlbumEdit'
import AlbumPictureEdit from './pages/AlbumPictureEdit'
import SliderAlbum from './component/SliderAlbum'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'

function App() {
  const login = useSelector((state) => state.loginReducer.login)

  return (
    <Router>
      <Head />
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/AboutUs">
            <AboutUs />
          </Route>
          <Route exact path="/Ceremony">
            <Album />
          </Route>
          <Route exact path="/Calendar">
            <Calendar />
          </Route>
          <Route exact path="/Ceremony/:id">
            <Photo />
          </Route>
          <Route exact path="/SocialEducation">
            <Album />
          </Route>
          <Route exact path="/SocialEducation/:id">
            <Photo />
          </Route>
          <Route exact path="/WelfareService">
            <Album />
          </Route>
          <Route exact path="/WelfareService/:id">
            <Photo />
          </Route>
          <Route exact path="/CharitableRelief">
            <Album />
          </Route>
          <Route exact path="/CharitableRelief/:id">
            <Photo />
          </Route>
          <Route exact path="/Volunteer">
            <Album />
          </Route>
          <Route exact path="/Volunteer/:id">
            <Photo />
          </Route>

          {!login ? (
            <Route exact path="/loginMPG">
              <Login />
            </Route>
          ) : (
            <Redirect from="/loginMPG" to="/" />
          )}

          {login && (
            <>
              <Route exact path="/DharmaCreate">
                <DharmaNew />
              </Route>
              <Route exact path="/DharmaCreate/:id">
                <DharmaEdit />
              </Route>
              <Route exact path="/CeremonyCreate">
                <AlbumNew />
              </Route>
              <Route exact path="/SocialEducationCreate">
                <AlbumNew />
              </Route>
              <Route exact path="/WelfareServiceCreate">
                <AlbumNew />
              </Route>
              <Route exact path="/CharitableReliefCreate">
                <AlbumNew />
              </Route>
              <Route exact path="/VolunteerCreate">
                <AlbumNew />
              </Route>
              <Route exact path="/EditCeremony/:id">
                <AlbumEdit />
              </Route>
              <Route exact path="/EditSocialEducation/:id">
                <AlbumEdit />
              </Route>
              <Route exact path="/EditWelfareService/:id">
                <AlbumEdit />
              </Route>
              <Route exact path="/EditCharitableRelief/:id">
                <AlbumEdit />
              </Route>
              <Route exact path="/EditVolunteer/:id">
                <AlbumEdit />
              </Route>
              <Route exact path="/EditCeremony/:id/:pictureId">
                <AlbumPictureEdit />
              </Route>
              <Route exact path="/EditSocialEducation/:id/:pictureId">
                <AlbumPictureEdit />
              </Route>
              <Route exact path="/EditWelfareService/:id/:pictureId">
                <AlbumPictureEdit />
              </Route>
              <Route exact path="/EditCharitableRelief/:id/:pictureId">
                <AlbumPictureEdit />
              </Route>
              <Route exact path="/EditVolunteer/:id/:pictureId">
                <AlbumPictureEdit />
              </Route>
              <Route exact path="/AlbumNew/:id">
                <AlbumEdit />
              </Route>
              <Route exact path="/SliderAlbum/">
                <SliderAlbum />
              </Route>
              <Route exact path="/SliderAlbum/:id">
                <AlbumPictureEdit />
              </Route>
              <Route exact path="/Logout">
                <Logout />
              </Route>
            </>
          )}
          <Redirect to="/" />
        </Switch>
      </div>
      <Foot />
    </Router>
  )
}

export default App
