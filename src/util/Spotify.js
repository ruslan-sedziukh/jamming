let accessToken; 
const clientID = '3c829511e489443e811aca63d18c2549';
const redirectURI = "http://localhost:3000/";

let Spotify = {
  getAccessToken: function () {
    if(accessToken) {
      return accessToken;
    }
    else {
      let urlToken = window.location.href.match(/access_token=([^&]*)/);
      let tokenExpiration = window.location.href.match(/expires_in=([^&]*)/);

      if(urlToken && tokenExpiration){
        accessToken = urlToken;
        window.setTimeout(() => {
          accessToken = '';
        }, tokenExpiration * 1000);
        window.history.pushState('Access Token', null, '/'); // what is it doing? 
      }
      else {
        // !!! there is the chance that the code below should be in another place !!!
        window.location(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`); 
      }
    }
  },

  search: async function(searchTerm){
    try {
      let responseArray = [];

      let searchResponse = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
        headers: {Authorization: `Bearer ${accessToken}`}
      });
      if(searchResponse.ok){
        let responseJSON = searchResponse.json();
        for (let item in responseJSON.items){
          let track = { 
            id: item.id, 
            name: item.name, 
            artist: item.artists[0].name, 
            album: item.album.name, 
            uri: item.uri
          };

          responseArray.push(track);          
        }

      }
  
      return responseArray;
    }
    catch(error) {
      console.log(error);
    }
  }
};



export default Spotify;