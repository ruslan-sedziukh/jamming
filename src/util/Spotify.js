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

      if(urlToken && urlExpiration){
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

  search: function(){

  }
};



export default Spotify;