/**
 * User Log In & Log Out
 */

const googleUser = {};

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
      const url = `http://localhost:3003/sign-in`
      
      $.ajax({
        url,
        method: 'POST',
        data: { id_token },
        success: (data) => {
          localStorage.setItem('token', data);
          console.log(`SUCCESS SIGN IN!`);
          
          // show hacktivGitPage
          $('.calendarific').toggle();

          // hide signInPage
          $('.signInPage').toggle();
        }
      })
    }, function (error) {
      alert(JSON.stringify(error, undefined, 2));
    }
  );
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  localStorage.removeItem('token');
  auth2.signOut().then(function () {
    console.log('User signed out.');
    // hide hacktivGitPage
    $('.hacktivGitPage').toggle();

    // show signInPage
    $('.signInPage').toggle();
  });
}