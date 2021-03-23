import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songs,
  setCurrentSong,
  setSongs,
  songInfo,
  setSongInfo,
}) => {


  //handler functions

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: animation,
    });
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === 'next') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    } else if (direction === 'back') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) {
          audioRef.current.play();
        }
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  //helpful fuctions
  const timeFormatter = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  //animation styles
  const trackAnimation = {
    transition: 'all 0.6s ease',
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const trackColors = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[2]})`,
  };

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{timeFormatter(songInfo.currentTime)}</p>
        <div style={trackColors} className='track'>
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type='range'
          />
          <div style={trackAnimation} className='animate-track'></div>
        </div>
        <p>{songInfo.duration ? timeFormatter(songInfo.duration) : '0:00'}</p>
      </div>
      <div className='player-controls'>
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('back')}
          className='back'
          size='2x'
          icon={faAngleLeft}
          color={currentSong.color[0]}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
          color={currentSong.color[1]}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('next')}
          className='next'
          size='2x'
          icon={faAngleRight}
          color={currentSong.color[2]}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      />
    </div>
  );
};

export default Player;
