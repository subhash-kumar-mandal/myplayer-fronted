import React, { useEffect, useState } from 'react'
import KYEBAATHAI from '../../assets/kyabaathai.png'
import { DiscAlbum, Fullscreen, Layers, MicVocal, Pause, PictureInPictureIcon, Play, Repeat1, Shuffle, SkipBack, SkipForward } from 'lucide-react'
import Spinner from '../UX/Spinner'
import VolumeIcon from "../UX/VolumeIcon"
import { motion } from "motion/react";
import BottomLeft from './BottomLeft'
import BottomRight from './BottomRight'
import { useDispatch, useSelector } from 'react-redux'
import { isNextSongHandle, isPlayingPause, isPlayingPlay, isPrevSongHandle } from '../../utils/playerSlice'
import { URL_OBJECT } from '../../services/fetchHandleAll'
import { toast } from 'sonner'

const Bottom = () => {
  const hasStartedPlaying = React.useRef(false);
  const historyApiFlag = React.useRef(false);
  const AudioRef = React.useRef(null);
  const BarClickRef = React.useRef(null);
  const dispatch = useDispatch()
  const currentPlay = useSelector(val => val.player.currentSongPlay)
  const isPlaying = useSelector(val => val.player.isPlaying);
  const Request_Reset_Time = useSelector(val => val.player.requestTime_Zero);

  const volume = useSelector(val => val.player.volume);
  const Request_Play_Zero = useSelector(val => val.player.playRequest);
  const flag = Object.keys(currentPlay).length > 0;
  const { accessToken } = useSelector(val => val.userContext);

  const [bufferDetect, setBufferDetct] = useState(false);
  const [timeSync, setTimeSync] = React.useState({
    min: 0,
    sec: 0,
    visible: '',
    progressVisible: 0,
  });



  function fullTimeVisible(song) {
    const minutes = Math.floor(song.duration / 60);
    const seconds = Math.floor(song.duration % 60);

    const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    return duration
  }





  function handleTime(e) {


    if (Object.is(NaN, e.target.currentTime)) return

    const pro = (e.target.currentTime / e.target.duration) * 100;

    const minutes = Math.floor(e.target.currentTime / 60);
    const seconds = Math.floor(e.target.currentTime % 60);

    const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    setTimeSync({
      progressVisible: pro,
      min: minutes,
      sec: seconds,
      visible: duration,
    });



  }


  function ClickSync(e) {

    if (!BarClickRef.current) return;
    const barWithds = BarClickRef.current.clientWidth; // kitni width hai
    const clickPosition = e.nativeEvent.offsetX;// kaha par click kiya x position

    const newTime = (clickPosition / barWithds) * currentPlay.duration
    if (AudioRef.current) {
      AudioRef.current.currentTime = newTime;
    }


  }



  useEffect(() => {

    const BooleanCheck = typeof (isPlaying) === 'boolean';

    if (!BooleanCheck || !AudioRef.current || !flag) return;

    hasStartedPlaying.current = false;
    setBufferDetct(false);




    document.title = "Spotify" + " - " + currentPlay.release.name.toUpperCase();

    navigator.mediaSession.metadata = new MediaMetadata(
      {
        title: currentPlay.name.toUpperCase(),
        artist: currentPlay.artists.map(val => val.name).join(', '),
        album: currentPlay?.release?.name || "Unknow",
        artwork: [{
          src: currentPlay.release.image.url,
          sizes: '512x512',
          type: "image/jpeg"
        }]
      }
    )


    if (isPlaying) {

      AudioRef.current.play();
    } else {

      AudioRef.current.pause()
    };



  }, [isPlaying, currentPlay])







  useEffect(() => {

    const BooleanCheck = typeof (isPlaying) === 'boolean';

    if (!BooleanCheck || !AudioRef.current || !flag) return;

    AudioRef.current.currentTime = 0;;

    dispatch(isPlayingPlay())

  }, [Request_Play_Zero])

  useEffect(() => {

    if (AudioRef.current) {

      AudioRef.current.currentTime = 0;

      setTimeSync(p => {
        return {
          min: 0,
          sec: 0,
          visible: '',
          progressVisible: 0,
        }
      })

    }

  }, [Request_Reset_Time]);


  React.useEffect(() => {

    if (timeSync.progressVisible >= 40 && !historyApiFlag.current && flag) {

      fetch(URL_OBJECT.BASE_URL + `/user/track/history/${currentPlay._id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        credentials: "include"
      });

      historyApiFlag.current = true

    }

  }, [timeSync.progressVisible]);

  useEffect(() => {
    historyApiFlag.current = false;
  }, [currentPlay])


  useEffect(() => {
    // console.log(AudioRef.current.volume)
    if (!AudioRef.current) return

    AudioRef.current.volume = volume

  }, [volume]);



  //  Handle ShortCut keys
  useEffect(() => {

    function shortCutKeys(e) {


      if (e.key.toLowerCase() === 'l' || e.key.toLowerCase() === "arrowright") {
        if (!flag) {
          return CheckPlay()
        }
        dispatch(isNextSongHandle())
        e.preventDefault()


      }
      if (e.key.toLowerCase() === 'j' || e.key.toLowerCase() === "arrowleft") {
        if (!flag) {
          return CheckPlay()
        }
        e.preventDefault()
        dispatch(isPrevSongHandle())

      }

      if (e.key === " " || e.code.toLowerCase() === "space") {
        if (!flag) {
          return CheckPlay()
        }
        e.preventDefault()
        if (isPlaying) {
          dispatch(isPlayingPause())
        } else {
          dispatch(isPlayingPlay())
        }
      }
    };


    window.addEventListener("keydown", shortCutKeys)

    return () => window.removeEventListener("keydown", shortCutKeys)

  }, [isPlaying])



  useEffect(() => {
    if (!AudioRef.current) return;

    const audio = AudioRef.current;

    const handleWaiting = () => {
      // New song ke initial loading ko
      // buffering nahi maanenge
      if (hasStartedPlaying.current) {

        setBufferDetct(true);

        toast.message(<div className="flex items-center w-full  px-2  py-2 gap-3">
          <img
            src={currentPlay?.release?.image?.url}
            alt=""
            className="w-10 h-10 rounded-xs object-cover "
            
          />

          <div className="flex flex-col">
            <span className="font-semibold capitalize text-white">
              can&apos;t play player is buffering
            </span>

            <span className="text-xs capitalize text-(--text-secondary)">
              {currentPlay?.name}
            </span>
          </div>
        </div>, {
          closeButton: true,
          position: "bottom-center",
          style: {
            transform: "translateY(-80px)",
            background: " #121212",
            border: "1px solid #ffffff4d",
            padding: 0,
            margin: 0
          },
          duration: 4000
        });
      }
    };

    const handlePlaying = () => {
      hasStartedPlaying.current = true;
      setBufferDetct(false);
    };

    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);

    return () => {
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
    };
  }, [currentPlay]);



useEffect(() => {
  // 1. फंक्शन की परिभाषा
  async function checkActiveSpeaker(audioContext) {
    // अगर ऑडियो इंजन सस्पेंडेड है (ब्राउज़र प्राइवेसी के कारण), तो पहले उसे शुरू करें
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    const activeSinkId = audioContext.sinkId;

    // अगर sinkId खाली स्ट्रिंग "" या undefined है, तो डिफ़ॉल्ट स्पीकर है
    if (!activeSinkId || activeSinkId === "") {
      console.log("आवाज़ डिफ़ॉल्ट लैपटॉप स्पीकर से आ रही है।");
      return;
    }

    // सभी डिवाइसेस की लिस्ट मंगाकर नाम ढूंढें
    const devices = await navigator.mediaDevices.enumerateDevices();
    const currentDevice = devices.find(d => d.deviceId === activeSinkId);

    if (currentDevice) {
      console.log("वर्तमान में आवाज़ इस डिवाइस से आ रही है: " + currentDevice.label);

      if (currentDevice.label.toLowerCase().includes('bluetooth')) {
        console.log("यह एक ब्लूटूथ/वायरलेस स्पीकर है!");
      }
    } else {
      console.log("एक्टिव डिवाइस की ID मिल गई है, लेकिन माइक प्राइवेसी अनुमति (Permission) के बिना नाम नहीं दिख रहा।");
    }
  }

  // 2. AudioContext ऑब्जेक्ट बनाएं
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (AudioContextClass) {
    const audioCtx = new AudioContextClass();

    // 3. फंक्शन को यहाँ कॉल (Run) करें
    checkActiveSpeaker(audioCtx);

    // क्लीनअप: कंपोनेंट अनमाउंट होने पर ऑडियो कॉन्टेक्स्ट बंद करें
    return () => {
      audioCtx.close();
    };
  }
}, []);


  function CheckPlay() {
    return toast.message(
      <div className="flex items-center w-full  px-2  py-2 gap-3">

        <DiscAlbum size={28} className='text-white' />
        <div className="flex flex-col">
          <span className="font-semibold capitalize text-white">
            can&apos;t play select any album & track
          </span>

          <span className="text-xs capitalize text-(--text-secondary)">
            {currentPlay?.name}
          </span>
        </div>
      </div>, {
      closeButton: true,
      position: "bottom-center",
      style: {
        background: " #121212",
        border: "1px solid #ffffff4d",
        padding: 0,
        margin: 0
      },
      duration: 2000
    });
  }




  return (
    <div
      className='h-[88px] p-2 w-full   '
    >

      <audio ref={AudioRef} className=' hidden' src={flag ? currentPlay.audioUrl.url : '#'} onEnded={() => dispatch(isNextSongHandle())} onTimeUpdate={handleTime} />

      <div
        className='w-full grid grid-cols-[450px_1fr_450px] gap-2  h-full'
      >

        {/*  Left Bottom  */}
        <div className='bg-amber-60 flex items-center gap-3 px-3'>
          {
            flag && <BottomLeft currentPlay={currentPlay} />
          }
        </div>

        {/*  main player section */}
        <div
          className=' grid grid-cols-1 grid-rows-2 gap-2 '
        >

          <span

            className='h-[32px] w-full  grid grid-cols-[1fr_60px_1fr]'>


            <span className=' flex justify-end gap-6 px-1 items-center  '>
              <Shuffle size={18} className='text-(--text-secondary)' />
              <motion.div className='cursor-pointer group'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SkipBack size={20} className='fill-(--text-secondary) group-hover:fill-white group-hover:text-white text-(--text-secondary)'
                  onClick={() => {
                    dispatch(isPrevSongHandle())
                  }}
                />
              </motion.div>


            </span>
            <motion.div className={`
                bg-(--text-primary)
                   m-auto
                    shadow-[0_12px_30px_rgba(0,0,0,0.45)]  
                  h-8
                  cursor-pointer 
                  w-8
                  rounded-full 
                  flex 
                  justify-center 
                  items-center  
                  
                  
                 
                  
                   
                    `}

              // whileTap={{scale:0.95,background:'#b3b3b3'}}
              // whileHover={{scale:1.05}}

              onClick={() => {
                if (!flag) {
                  return CheckPlay()
                }
                if (isPlaying) {
                  dispatch(isPlayingPause());
                } else {
                  dispatch(isPlayingPlay())
                }

              }}

            >
              {
                bufferDetect ?
                  <Spinner />
                  : isPlaying
                    ? <Pause
                      color="#000000" size={18}
                      className='fill-black '

                    />
                    : <Play
                      color="#000000"
                      size={18}
                      className='fill-black '

                    />
              }
            </motion.div>
            <span className=' flex justify-start gap-5 px-1 items-center '>

              <motion.div
                className='group cursor-pointer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SkipForward size={20} className='fill-(--text-secondary) group-hover:fill-white group-hover:text-white text-(--text-secondary)'
                  onClick={() => {
                    dispatch(isNextSongHandle())
                  }}
                />
              </motion.div>
              <Repeat1 size={18} className='text-(--text-secondary)' />

            </span>

          </span>


          {/*  sync baar hai  */}
          <span className=' '>

            <div className=' h-full w-full grid grid-cols-[50px_1fr_50px] gap-1 items-center'>

              <span className=' text-right text-[10px] text-(--text-secondary)'>
                {
                  timeSync.visible.length > 0
                    ? timeSync.visible
                    : "0:00"
                }
              </span>

              <div
                className='flex items-center relative justify-center '
              >

                <div className='group h-[2.5px] w-full rounded-[5px] overflow-hidden bg-(--background4) cursor-pointer' ref={BarClickRef}
                  onClick={(e) => {
                    ClickSync(e);
                    e.stopPropagation()
                  }}
                >
                  <div className='h-2.5 w-2.5 rounded-full -top-1  absolute bg-white
                  transition-all duration-300
                  opacity-0
                  group-hover:opacity-100
                  '
                    style={{
                      left: `${timeSync.progressVisible - 1}%`
                    }}
                  />



                  <div className='bg-white rounded-2xl  h-full transition-all duration-300'
                    style={{
                      width: `${timeSync.progressVisible}%`,
                      backgroundColor:currentPlay?.release?.themeColor.primary ?? "white"
                    }}
                  >

                  </div>

                </div>

              </div>
              <span className=' text-left text-[10px] text-(--text-secondary)'>
                {
                  Object.keys(currentPlay).length > 0
                    ? fullTimeVisible(currentPlay)
                    : '0:00'
                }
              </span>


            </div>

          </span>



        </div>


        {/*  Right Bottom  */}
        <div className=' items-center flex '>
          <BottomRight />

        </div>




      </div>

    </div>
  )
}

export default Bottom