import React, { useState } from 'react'
import NavBar from '../components/Home/NavBar/NavBar'
import Left from '../components/Main/Left/Left'
import Middle from '../components/Main/Middle/Middle'
import Right from '../components/Main/Right/Right'
import Bottom from '../components/Bottom/Bottom'
import { useDispatch, useSelector } from 'react-redux'
import { isLoaderfalse, isLoaderTrue, setUserAll } from '../utils/userDateSlice'
import { apifetch, URL_OBJECT } from '../services/fetchHandleAll'


const HomeLoyout = () => {

    const dispatch = useDispatch()


    const [IsLeftOpen, setIsLeftOpen] = useState(false);


    const { accessToken } = useSelector(val => val.userContext);
    const { fetchBoolean } = useSelector(val => val.userData)

    React.useEffect(() => {




        async function fetchLib() {

            try {

                if (fetchBoolean) {

                    return
                }

                dispatch(isLoaderTrue())

                const res = await apifetch(URL_OBJECT.BASE_URL+'/user/randoms', {
                    headers: {
                        'Content-Type': 'application/json',
                        method: "GET",
                        Authorization: `Bearer ${accessToken}`,

                    },
                    credentials: "include"
                });

                if (!res) return;
         
                if (!res.success) throw new Error('Somthing is worng')

                const sections = res?.sections || [];
                const follows = res?.follows
                const jump = res?.JumpBack ?? []
                const topsCard = res?.topsCard??[];
                


                dispatch(setUserAll({
                    albums: follows.albums,
                    artists: follows.artists,
                    user: sections,
                    jumpBack: jump || {},
                    topCards  : topsCard
                }))






            } catch (err) {
                console.log(err)
            } finally {
                dispatch(isLoaderfalse())
            }


        }


        fetchLib();

    }, []);

    //  error yadi mein route call thik nhi hai to 


    return (
        <div
            className=' flex flex-col w-screen h-screen'
        >
            <NavBar />

            <div
                className='flex px-2  overflow-hidden gap-2 h-[calc(100vh-64px-88px)] text-white'
            >
                <Left IsLeftOpen={IsLeftOpen} setIsLeftOpen={setIsLeftOpen} />
                <Middle />
                <Right />


            </div>

            <Bottom />


        </div>
    )
}

export default HomeLoyout