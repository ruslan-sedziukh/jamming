let accessToken; 
const clientID;
const redirectURI = "http://localhost:3000/";

let Spotify = {
  getAccessToken: function () {
    if(accessToken) {

    }
    else {
      let urlToken = window.location.href.match(/access_token=([^&]*)/);
      let tokenExpiration = window.location.href.match(/expires_in=([^&]*)/)

      if(urlToken && urlExpiration);{
        accessToken = urlToken;
        window.setTimeout(() => {
          accessToken = '';
        }, tokenExpiration * 1000);
        window.history.pushState('Access Token', null, '/'); // what is it doing? 

        // !!! there is the chance that the code below should be in another place !!!
        window.location(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`); 
      }
    }
  }
};





export default Spotify;