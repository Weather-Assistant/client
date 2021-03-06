/**
 * User Log In & Log Out
 */

const googleUser = {};
let auth2;

const startApp = function() {
  gapi.load('auth2', function() {
    // retreieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: `733219071755-tv0qvd3dqqsq6n3p5bdc5nrslk4jl54m.apps.googleusercontent.com`,
      cookiepolicy: `single_host_origin`
    });
    // console.log(auth2)
    attachSignIn(document.getElementById('googleSignIn'))
  })
}

function attachSignIn(element) {
  auth2.attachClickHandler(element, {}, 
    function(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      const url = `http://localhost:3000/sign-in`
      
      $.ajax({
        url,
        method: 'POST',
        data: { id_token },
        success: (data) => {
          console.log(data)
          console.log('masuk')
          localStorage.setItem('token', data);
          console.log(`SUCCESS SIGN IN!`);
          
          // show hacktivGitPage
          $('.home').toggle();

          // hide signInPage
          $('.signInPage').toggle();
          $('.signInPage').hide()
          $('.home').show()
          getCountries()
        }
      })
    }, function (error) {
      alert(JSON.stringify(error, undefined, 2));
    }
  );
}

function signOut() {
  // var auth2 = gapi.auth2.getAuthInstance();
  console.log(auth2)
  $('.signInPage').show()
  $('.home').hide()
  localStorage.removeItem('token');
  localStorage.clear()
  // auth2.signOut().then(function () {
  //   // console.log('User signed out.');
  //   // hide hacktivGitPage
  // });
}