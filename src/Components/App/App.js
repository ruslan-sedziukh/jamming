import React from 'react';
import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [
        { id: 1, artist: 'kurt', name: 'best song', album: 'krokodile'},
        { id: 2, artist: 'oasis', name: 'wonderwall', album: 'retro'}
      ],
      playlistName: 'My first playlist',
      playlistTracks: [
        { id: 3, artist: 'Pink Floyd', name: 'Wish you where here', album: 'psychodelic'},
        { id: 4, artist: 'Nirvana', name: 'Smels Like Teen`s Spirit', album: '90`s'}
      ]
     };
    // this.state = { searchResults: [1, 5] };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
