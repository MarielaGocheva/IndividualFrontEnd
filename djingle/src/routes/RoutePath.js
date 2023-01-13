import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import ClientHomePage from "../Pages/ClientHomePage"
import Authentication from "./Authentication";
import Authorization from "./Authorization";
import PERMISSIONS from "../permissions/Permissions";
import Playlists from "../Pages/PlaylistsPage";
import ArtistPage from "../Pages/ArtistPage";
import PlaylistViewClient from "../Pages/PlaylistViewClient";
import RecentlyPlayed from "../Pages/RecentlyPlayed";
import PlaylistView from "../Components/PlaylistView";

const RoutePath = () => {
    return (
      <Routes>
        <Route
          element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_DJ]} />}
        >
          <Route path='/playlists/:userId' element={<Playlists />} />
        </Route>
        <Route
          path='/'
          element={
            <Authentication>
              <HomePage />
            </Authentication>
          }
        />
        <Route
          path='/recentlyPlayed'
          element={
            <Authentication>
              <RecentlyPlayed />
            </Authentication>
          }
        />
        <Route
          element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_CLIENT]} />}
        >
          <Route path='/client' element={<ClientHomePage />} />
        </Route>
        <Route
          element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_CLIENT]} />}
        >
          <Route path='/artist' element={<ArtistPage />} />
        </Route>
    
        <Route
          path='/artist/playlist'
          element={
            <Authentication>
              <PlaylistViewClient />
            </Authentication>
          }
        />
        <Route
          path='/playlist'
          element={
            <Authentication>
              <PlaylistView />
            </Authentication>
          }
        />
          {/* <Route path='/artist/playlist' element={} /> */}
      
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    );
  };
  
  export default RoutePath;