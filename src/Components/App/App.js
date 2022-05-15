import React from 'react';
import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import './App.css';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [
        // { id: 1, artist: 'kurt', name: 'best song', album: 'krokodile', uri: 'uri 1' },
        // { id: 2, artist: 'oasis', name: 'wonderwall', album: 'retro', uri: 'uri 2' }
      ],
      playlistName: 'New Playlist',
      playlistTracks: [
        // { id: 3, artist: 'Pink Floyd', name: 'Wish you where here', album: 'psychodelic', uri: 'uri 3' },
        // { id: 4, artist: 'Nirvana', name: 'Smels Like Teen`s Spirit', album: '90`s', uri: 'uri 4' }
      ]
     };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let newPlaylistTracks = this.state.playlistTracks;

    let trackIn = this.state.playlistTracks.findIndex(trackInPlaylist => {
      return track.id === trackInPlaylist.id;
    });

    if(trackIn === -1) {
      newPlaylistTracks.push(track);
      this.setState( { playlistTracks: newPlaylistTracks} );
    }
  }

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks.filter(trackInPlaylist => {
      return track.id !== trackInPlaylist.id;
    });

    this.setState( { playlistTracks: newPlaylistTracks} );
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  async savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => {
      return track.uri;
    });

    // console.log('track uri: ' + trackURIs);
    try {
      // let savePlaylistResponse = 
      await Spotify.savePlaylist(this.state.playlistName, trackURIs);

      this.setState({ playlistName: 'New Playlist', playlistTracks: [] });
      // this.setState({ playlistTracks: [] });
    }
    catch(error) {
      console.log(error);
    }
    
  }

  async search(searchTerm) {
    // console.log(searchTerm);
    try {
      let newSearchResults = await Spotify.search(searchTerm);
      this.setState( { searchResults:  newSearchResults} );
      console.log('newSearchResults: ' + newSearchResults);
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    Spotify.getAccessToken();

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistTracks={this.state.playlistTracks} 
              playlistName={this.state.playlistName} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
