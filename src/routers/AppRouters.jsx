import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'


import AdminLayout from '@/layouts/AdminLayout';
import PhoneSignUp from '../pages/PhoneSignup/PhoneSignUp'


// Pages jsx all handle 
import Dashboard from '../pages/admin/Dashboard';
import Albums from '../pages/admin/Albums';
import Songs from '../pages/admin/Songs';
import Users from '../pages/admin/Users';

import Artists from '../pages/admin/Artists';



import Premium from '../pages/Premium/Premium';
import HomeLoyout from '../layouts/HomeLoyout';
import Artist from '../pages/Artists/Artist';
import UserHome from '../pages/userHome/UserHome';
import PlayList from '../pages/playlist/PlayList';
import Album from '../pages/album/Album';
import LikeSongs from '../pages/likesSongs/LikeSongs';
import SongAdd from '../pages/admin/song/SongAdd';
import ArtistAdd from '../pages/admin/artist/ArtistAdd';
import AlbumAdd from '../pages/admin/album/AlbumAdd';
import Track from '../pages/track/Track';



import LogoutLayout from '../layouts/LogoutLayout'
import LogoutHome from '../pages/logout/logoutHome'
import Login from '../components/Login/Login';
import SignUp from '../components/Signup/SignUp';
import CreatePasswordStep_1 from '../components/EmailHandle/CreatePasswordStep-1';
import UserDetails from '../components/EmailHandle/UserDetails ';
import { useSelector } from 'react-redux';

import GlobalContext from '../components/Reused/GlobalContext';
import PreviewContext from '../components/Reused/PreviewContext'
import TremAndCondition from '../components/EmailHandle/TremAndCondition';

import OTPhandle from '../components/Login/OTPhandle';
import PasswordFill from '@/components/Login/Password';




const AppRouters = () => {

    const { user, accessToken } = useSelector(val => val.userContext);
    const { isOpen, preViewArray } = useSelector(val => val.preview);

    const isAuthenticated = !!accessToken;


    const isAdmin = isAuthenticated && user?.role === "ADMIN";




    const val = useSelector(val => val.contextMenu);

    return (
        <React.Fragment>
            <Routes>


                <Route path='/login' element={<Login />} />
                <Route path='/login/otp' element={<OTPhandle />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/signup/phone' element={<PhoneSignUp />} />
                <Route path='/signup/email/step-1' element={<CreatePasswordStep_1 />} />
                <Route path='/signup/email/step-2' element={<UserDetails />} />
                <Route path='/signup/email/step-3' element={<TremAndCondition />} />
                <Route path="/password/fill" element={<PasswordFill/>}/>





                <Route path='/' element={isAuthenticated ? <HomeLoyout /> : <Navigate to='/signup' replace />} >




                    <Route index element={isAuthenticated ? <UserHome /> : <Navigate to='/signup' replace />} />



                    <Route path='playlist' element={<PlayList />} />


                    <Route path='premium' element={<Premium />} />




                    <Route path='likesongs' element={isAuthenticated ? <LikeSongs /> : <Navigate to='/signup' replace />} />
                    <Route path='artist/:id' element={isAuthenticated ? <Artist /> : <Navigate to='/signup' replace />} />
                    <Route path='album/:id' element={isAuthenticated ? <Album /> : <Navigate to='/signup' replace />} />
                    <Route path="track/:id" element={isAuthenticated ? <Track /> : <Navigate to='/signup' replace />} />


                </Route>

                <Route path='/admin' element={isAuthenticated && isAdmin ? <AdminLayout /> : <Navigate to='/signup' replace />} >

                    <Route index element={<Dashboard />} />

                    <Route path='dashboard' element={<Dashboard />} />

                    <Route path='albums' element={<Albums />} />
                    <Route path='albums/add' element={<AlbumAdd />} />


                    <Route path='songs' element={<Songs />} />
                    <Route path='songs/add' element={<SongAdd />} />


                    <Route path='users' element={<Users />} />



                    <Route path='artists' element={<Artists />} />
                    <Route path='artists/add' element={<ArtistAdd />} />
                </Route>


            </Routes>

            {
                val.open &&
                <GlobalContext x={val.x} y={val} boolean={val.open} song={val.song} />
            }

            {
                isOpen && <PreviewContext previewArray={preViewArray} />
            }
        </React.Fragment >
    )
}

export default AppRouters