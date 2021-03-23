import React from 'react';
import DisplaySong from './DisplaySong';

const Library = ({
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  isLibraryOpen
}) => {
  return (
    <div className={`library ${isLibraryOpen ? 'library-open' : ''}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map((song) => (
          <DisplaySong
            isPlaying={isPlaying}
            audioRef={audioRef}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
            song={song}
            songs={songs}
            id={song.id}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
