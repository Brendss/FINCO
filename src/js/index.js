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
      const addForm = document.forms.namedItem("add-form");
      let select = document.getElementById("select")
      // const selectBoot = select.value
      

      
      
      if (signInValue == "" ||  passwordValue == "" || name == "") {
        $("#modal-reg").modal() 
      }else{
      


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
                errorRegistro.innerHTML="";
              }, 3000);
              
            
          }else if (errorMessage == "Password should be at least 6 characters") {
            errorRegistro.innerHTML = ` <div class="alert alert-warning" role="alert">
              <p> La contraseña deberia de tener al menos 6 caracteres</p></div>`;
              setTimeout(function () {
                errorRegistro.innerHTML="";
              }, 3000);
             
          }
          

        })
        
        
  
  
          db.collection("bootcamp").add({
              
              email: addForm.elements.email.value,
  
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
          //const userIds = addForm.elements.userId.value;

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
    const buttonSignInRegister = document.getElementById("button-sign-in-reg");
    const buttonSignInFacebook = document.getElementById("button-sign-in-facebook");
    const buttonSignInPhone = document.getElementById("button-sign-in-phone");
    const signinGoogle = document.getElementById("button-sign-in-google");
    const signInRegister = document.getElementById("sign-in-reg");
    const passwordRegister = document.getElementById("password-reg");
    const show = document.getElementById("show");

    buttonSignInRegister.addEventListener("click", () => {

      let signInValue = signInRegister.value;
      let passwordValue = passwordRegister.value;
      firebase.auth().signInWithEmailAndPassword(signInValue, passwordValue)
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message;
          if (errorMessage == 'The email address is badly formatted.') {
            show.innerHTML = ` <div class=" alert-warning alert" role="alert">
                                <p class="margin-warning">La direccion del correo no es valida</p></div>`;
                                setTimeout(function () {
                                  show.innerHTML="";
                                }, 3000);
          } else {
            show.innerHTML = ` <div class=" alert-warning alert" role="alert">
                                <p class="margin-warning">${errorCode}</p></div>`;
                                setTimeout(function () {
                                  show.innerHTML="";
                                }, 3000);

          }
        });
    });
    

    buttonSignInPhone.addEventListener("click",()=>{
      // firebase.auth().languageCode = 'it';
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captcha', {
        'size': 'invisible',
        'callback': function(response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        }
      });
  //     const appVerifier = new firebase.auth.RecaptchaVerifier('captcha', {
  //       'size': 'invisible',
  //       'callback': function(response) {
  //         // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         onSignInSubmit();
  //       }
  //     });
  // window.recaptchaVerifier.render().then(function(widgetId){
  //    window.appVerifier = widgetId;
  // });
      const phoneNumber = document.getElementById("input-sing-in-phone").value;
      console.log(phoneNumber)
      var appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          alert("hey estas usando sm")
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
        }).catch(function (error) {
          grecaptcha.reset(window.recaptchaWidgetId);

          // Or, if you haven't stored the widget ID:
          // window.recaptchaVerifier.render().then(function(widgetId) {
          //   grecaptcha.reset(widgetId);
          })
       
    });

    

    
 

    buttonSignInFacebook.addEventListener("click", () => {
      const provider = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithRedirect(provider).then(function (result) {}).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode);
        alert(errorMessage);
        var email = error.email;
        alert(email);
        var credential = error.credential;
        alert(credential)
      });
    });

    


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

          let emailUser = document.getElementById("emailUser");
          let nameUser = document.getElementById("name-user");
          let avatarUser = document.getElementById("avatar-user");
          let email = user.email;
          nameUser.innerHTML = `<p> ${user.displayName} !</p>`
          emailUser.innerHTML = `${email}`
          avatarUser.innerHTML = `<img class="avatar" src="${user.photoURL}">`
        }, 500);
      }

          
         
          }
          
 
          
  },


  posteos: () => {
    

    const btnAfore = document.getElementById("btn-afore");
    const vistaDirectorio = document.getElementById("directorio");
    const vistaBienvenida = document.getElementById("bienvenidas");
    


    btnAfore.addEventListener("click",()=>{
      vistaBienvenida.style.display = "none"
      vistaDirectorio.style.display = "inline-grid"
    })
    const btnCards = document.getElementById("btn-cards");
    const vistaCards = document.getElementById("vista-cards");
    btnCards.addEventListener("click",()=>{
      vistaBienvenida.style.display = "none"
      vistaCards.style.display = "inline-grid"
    })
  }
}