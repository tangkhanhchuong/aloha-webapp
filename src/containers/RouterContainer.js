import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import styled from 'styled-components'

import Layout from "styles/Layout"
import Nav from "components/layout/Nav"
import MasterTweet from "components/Tweet/MasterTweet"
import EditProfile from "components/Profile/EditProfile"
import Profile from "components/Profile/Profile"
import Home from "pages/Home"
import Bookmarks from "pages/Bookmarks"
import Notifications from "pages/Notifications"
import Explore from "pages/Explore"

import Messages from "features/messages"

const MainPageContainer = styled.div`
  margin-left: 26%;
`

const RouterContainer = () => {
  return (
    <Router>
      <Nav />
      <MainPageContainer>  
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/explore" component={Explore} />
          <Route path="/messages/:id" component={Messages} />
          <Route path="/messages" component={Messages} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/bookmarks" component={Bookmarks} />
          <Route
            exact
            path={`/:handle/status/:tweetId`}
            component={MasterTweet}
          />
          <Route exact path={`/settings/profile`} component={EditProfile} />
          <Route exact path={`/:handle`} component={Profile} />
          <Redirect from="*" to="/" />
        </Switch>
      </MainPageContainer>
    </Router>
  )
}

export default RouterContainer
