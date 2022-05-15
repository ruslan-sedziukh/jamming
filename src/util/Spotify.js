let accessToken; 
const clientID = '3c829511e489443e811aca63d18c2549';
const redirectURI = "http://localhost:3000/";

const Spotify = {
  getAccessToken: function () {
    if(accessToken) {
      console.log('accessToken is already here: ' + accessToken);
      // return accessToken;
      return;
    }
    else {
      // window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`; 
      let urlToken = window.location.href.match(/access_token=([^&]*)/); 
      let tokenExpiration = window.location.href.match(/expires_in=([^&]*)/); 

      console.log('============ New token gotten ==============');

      if(urlToken && tokenExpiration){
        accessToken = urlToken[1];
        tokenExpiration = tokenExpiration[1];
        window.setTimeout(() => {
          accessToken = '';
        }, tokenExpiration * 1000);
        // Does not work with window.history.pushState. It push page to reload. 
        window.history.pushState('Access Token', null, '/'); // what is it doing? 
        console.log('we get an accessToken: ' + accessToken);
      }
      else {
        // !!! there is the chance that the code below should be in another place !!!
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`; 
      }
    }
  },

  search: async function(searchTerm){
    try {
      let responseArray = [];
      // ====== Here is the problem now!!! ======= 
      // ============ Bad request ================
      // ================ Why? ===================

      console.log('func search() accessToken: ' + accessToken);
      let searchResponse = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, 
        {
          headers: {Authorization: `Bearer ${accessToken}`},
          method: 'GET'
        }
      );

      if(searchResponse.ok){
        console.log('-------- searchRepsonse.ok! -----------');

        let responseJSON = await searchResponse.json();
        console.log('--->>> responseJSON: ' + responseJSON);

        // for(let i in responseJSON.tracks.items){
        //   console.log(i);
        // }

        // ======= for that should get array of tracks =======
        for (let item of responseJSON.tracks.items){
          let track = { 
            id: item.id, 
            name: item.name, 
            artist: item.artists[0].name, 
            album: item.album.name, 
            uri: item.uri
          };

          console.log('>>> track: ' + track);
          // console.log()
          responseArray.push(track);          
        }
      }
  
      return responseArray;
    }
    catch(error) {
      console.log(error);
    }
  },

  savePlaylist: async function (playlistName, trackURIs) {
    if(playlistName && trackURIs){
      let token = accessToken;
      let headers = { Authorization: `Bearer ${token}` }; 
      let userID;

      // ## Task 1 - Get userID
      try {
        let userRepsonse = await fetch('https://api.spotify.com/v1/me', {headers: headers});

        if(userRepsonse.ok) {
          console.log('--------->>>> Got userID <<<<<---------');

          let userRepsonseJSON = await userRepsonse.json();
          userID = userRepsonseJSON.id; // need to check this object structure to get id in right way

          // ## Task 2 - Post new playlist 
          try {
            let createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({ name: playlistName }) 
            });

            if(createPlaylistResponse.ok) {
              let createPlaylistResponseJSON = await createPlaylistResponse.json();
              let playlistID = createPlaylistResponseJSON.id; // here should be ID to make another post of track URI`s

              // ## Task 3 - Post tracks URI to playlist
              try {
                let postTrackURIsResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                  headers: headers,
                  method: 'POST',
                  body: JSON.stringify({ uris: trackURIs })
                });
                
                if(postTrackURIsResponse.ok) {
                  console.log('>>>>> Playlist is added <<<<<');
                  // return 'ok';
                }
    
              }
              catch(error) {
                console.log(error);
              }
            }
          }
          catch(error) {
            console.log(error);
          }
        }
      }
      catch(error) {
        console.log(error);
      }

    }
    else {
      return;
    }
  }
};



export default Spotify;