import React, { useState, useRef } from 'react';
import './styles/app.scss';

import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

import data from './data';

function App() {
  // State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  //audio reference
  const audioRef = useRef(null);

  return (
    <div className={`App ${isLibraryOpen ? 'library-active' : ''}`}>
      <Nav isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} />
      <Song currentSong={currentSong} />
      <Player
        songs={songs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        setSongs={setSongs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        isLibraryOpen={isLibraryOpen}
      />
    </div>
  );
}

export default App;
