window.controlador = {

  registro: () => {
    const signIn = document.getElementById("sign-in-new");
    const password = document.getElementById("password-new");
    const buttonSignIn = document.getElementById("button-sign-in-new");
    const modalWarning = document.getElementById("modal-warning");
    const modalInvalidEmail = document.getElementById("modal-invalid-email");
    const errorRegistro = document.getElementById("error-reg");
    const nombre = document.getElementById("name");
    const botonCerrar = document.getElementById("button-comeback");


    var db = firebase.firestore();
    botonCerrar.addEventListener("click", () => {
      window.location.hash = '#/';


    })

    buttonSignIn.addEventListener("click", () => {
      let signInValue = signIn.value;
      let passwordValue = password.value;
      let name = nombre.value;

      if (signInValue == "" || passwordValue == "" || name == "") {
        $("#modal-reg").modal()
      } else {
        firebase.auth().createUserWithEmailAndPassword(signInValue, passwordValue)
          .then(function () {
            var user = firebase.auth().currentUser;

            user.updateProfile({
              displayName: name,

              photoURL: "assets/img/alien.png"
            })
            verification()

              .catch(function (error) {
                var errorMessage = error.message;
                alert(errorMessage);
                modalInvalidEmail.innerHTML = ` <div class="alert alert-warning" role="alert">
                                          <p> ${errorMessage} </p></div>`;
              });
          }).catch(function (error) {
            var errorMessage = error.message;
            console.log(errorMessage)

            if (errorMessage == "The email address is badly formatted.") {
              errorRegistro.innerHTML = ` <div class="alert alert-warning" role="alert">
              <p> El email no tiene el formato correcto</p></div>`;
              setTimeout(function () {
                errorRegistro.innerHTML = "";
              }, 3000);

            } else if (errorMessage == "Password should be at least 6 characters") {
              errorRegistro.innerHTML = ` <div class="alert alert-warning" role="alert">
              <p> La contraseña deberia de tener al menos 6 caracteres</p></div>`;
              setTimeout(function () {
                errorRegistro.innerHTML = "";
              }, 3000);
            }
          })
      }
    })

    const verification = () => {
      var user = firebase.auth().currentUser;

      user.sendEmailVerification().then(function () {
        modalWarning.innerHTML = ` <div class="alert alert-warning" role="alert">
        <p>Se te ha enviado un correo de verificacion de Usuario</p></div>`;
      }).then(function () {
        setTimeout(function () {
          window.location.hash = '#/';
        }, 3000);
      }).catch(function (error) {
        alert("error");
      });
    }
  },
  iniciosesion: () => {
    // termina registro de personas
    const signinGoogle = document.getElementById("button-sign-in-google");

    signinGoogle.addEventListener("click", () => {
      var googleProvider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithRedirect(googleProvider)
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode);
          alert(errorMessage);
          var email = error.email;
          alert(email);
          var credential = error.credential;
          alert(credential)
        });

    })
    const state = () => {
      firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
          showUser(user)
        }
      });
    }

    state();

    const showUser = (user) => {
      var user = user;
      var providerId = user.providerData[0].providerId;

      if (user.emailVerified || providerId == "facebook.com") {
        window.location.hash = '#/wall';
        //poniendolo antes de las variables y dentro del settimeout
        setTimeout(function () {
          const signOut = document.getElementById("signOut")
          signOut.addEventListener("click", () => {

            firebase.auth().signOut()
              .then(function () {
                window.location.hash = '#/'

              })
              .catch(function (error) {
                console.log(error);
              })
          })
        }, 500);
      }
    }
  },
  posteos: () => {
  }
}