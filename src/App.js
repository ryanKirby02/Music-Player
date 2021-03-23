import React, { useState, useRef } from 'react';
import './styles/app.scss';

import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';

import data from './data';

function App() {
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  //audio reference
  const audioRef = useRef(null);

  return (
    <div className='App'>
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        audioRef={audioRef}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />
    </div>
  );
}

export default App;
