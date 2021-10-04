import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import LeftSideBar from './components/Sections/leftSideBar/leftsidebar'
import NewsFeed from './components/Sections/newsfeed/newfeed'
import Post from './components/Sections/newsfeed/Post';
import Profile from './components/Sections/profile/Profile';
import RightSideBar from './components/Sections/rightsidebar/rightsidebar'

const Feed = ({ currentUser }) => {
    return (
        <div className="bg-light">
            <Header currentUser={currentUser} />
            <Switch>
                <Route exact path="/">
                    <div className="row position-relative gx-0 px-3 px-md-0 gx-md-4 gx-lg-0">
                        <div className="col-xl-3 position-sticky leftcol d-none d-xl-block">
                            <LeftSideBar currentUser={currentUser} />
                        </div>
                        <div className="col-12 col-md-7 col-lg-8 col-xl-6">
                            <NewsFeed currentUser={currentUser} />
                        </div>
                        <div className="col-md-5 col-lg-4 col-xl-3 d-none d-md-block position-sticky rightcol">
                            <RightSideBar />
                        </div>
                    </div>
                </Route>
                <Route path="/profile">
                    <Profile currentUser={currentUser}/>
                </Route>
                <Route path="/post">
                    <div className="row position-relative justify-content-center gx-0 px-3 px-md-0 gx-md-4 gx-lg-0">
                        {/* <div className="col-xl-3 position-sticky leftcol d-none d-xl-block">
                            <LeftSideBar currentUser={currentUser} />
                        </div> */}
                        <div className="col-12 col-md-7 col-lg-8 col-xl-6">
                            <Post currentUser={currentUser} />
                        </div>
                        {/* <div className="col-md-5 col-lg-4 col-xl-3 d-none d-md-block position-sticky rightcol">
                            <RightSideBar />
                        </div> */}
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default Feed
