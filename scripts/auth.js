// Sign-up Logic
const signupForm = document.querySelector('#signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // User info
    const fname = signupForm['signupFname'].value;
    const lname = signupForm['signupLname'].value;
    const userName = signupForm['signupUsername'].value;
    const email = signupForm['signupEmail'].value;
    const password = signupForm['signupPassword'].value
    const zipCode = signupForm['signupZipCode'].value
    const phone = signupForm['signupNumber'].value;
    // const country = signupForm['signupCountry'].value;
    const gender = signupForm['signupSex'].value;

   
    auth.createUserWithEmailAndPassword(email, password).then(user => {
        const newUser = auth.currentUser
        alert(user.user.email, "Created")
        newUser.updateProfile({
            displayName: userName
        }).then(() => {
            alert("profile added")
            db.collection("users").doc(newUser.uid.toString()).set({
                fname: fname,
                gender: gender,
                lname: lname,
                number: phone,
                zipCode: zipCode
            }).then(() => {
                alert("document added");
                signupForm.reset()
                newUser.sendEmailVerification().then(function () {
                    alert("We just sent a massage to your mail, thank you for signing up")
                    auth.signOut().then(() => {
                        console.log("SignOut successfully")
                        window.location.replace("../login.html")
                    }).catch((error) => {
                        console.log("Signout error")
                    })
                }).catch(function (error) {
                    alert("An error occurred!")
                });
            }).catch(error => {
                alert(error)
            })
        }).catch(error => {
            alert(error)
        })
    }).catch(error => {
        alert(error)
        let errcode = error.zipCode
        let errMsg = error.message
        if (errCode == "auth/weak-password") {
            alert('errCode')
        } else {
            alert(errMsg)
        }
    });
});
