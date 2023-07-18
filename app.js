var loginEmail = document.getElementById('emailField')
var loginPassword = document.getElementById('passwordField')
var loginBtn = document.querySelector('.loginBtn')
var firstName = document.querySelector('#fname')
var surName = document.querySelector('#lname')
var signupEmail = document.querySelector('#phoneNum')
var signUpPass = document.querySelector('#signUpPass')
var signUpBtn = document.querySelector('.signupBtn')

var overlay = document.querySelector('.overlay')
var createBtn = document.querySelector('.createBtn')
var hidden = document.querySelector('.hidden')

// var dayBtn = document.querySelector('.dayBtn')
// var monthBtn = document.querySelector('.monthBtn')
// var yearBtn = document.querySelector('.yearBtn')
// // var dayBtn = document.querySelector('.dayBtn')

// var day = document.querySelectorAll('.day')
// console.log(day)
// var month = document.querySelectorAll('.month')
// var year = document.querySelectorAll('.year')

// var string = 'soban'
// console.log(string.length)



let dayValue;
let monthValue;
let yearValue;
let gender;

let persons = JSON.parse(localStorage.getItem('persons')) || []
console.log(persons)

createBtn.addEventListener('click', createHandler)
signUpBtn.addEventListener('click', signUpHandler)
loginBtn.addEventListener('click', loginHandler)

function createHandler() {
    overlay.classList.remove('hidden')

}


function loginHandler() {
    console.log(loginEmail.value)
    console.log(loginPassword.value)

    if(loginEmail.value !== '' && loginPassword.value !== ''){
        
        if(loginEmail.value.indexOf('@mail.com') === -1) return alert('Please enter a valid email address');

    } else return alert('Please fill out the fields');

    const personDetected = persons.filter((person) => {
        return person.email === loginEmail.value
    })

    console.log(personDetected);

    if(!personDetected.length) return alert('This email is not registered, please create an account before logging in.');

    if(loginPassword.value === personDetected[0].password){
        alert('User is logging in');

        localStorage.setItem('isloggedUser', JSON.stringify(personDetected[0]));

        window.location.href="./landingpage/index.html";

    } else {
        alert('User credentials mismatched!');
    }
}


function signUpHandler() {
    
    const personDetected = persons.filter((person) => {
        return person.email === signupEmail.value;
    })

    console.log(personDetected)

    if(personDetected.length) return alert("Email address already in use, please use another email address");


    // var signupChar = signUpPass.value

    if(firstName.value !== '' && firstName.value !== '' && signupEmail.value !== '' && signUpPass.value !== '' && dayValue !== undefined && monthValue !== undefined && yearValue !== undefined && gender !== undefined){
        if(signUpPass.value.length < 8){
            alert('Password must contain of atleast 8 characters.');
        }

        var personData = {
            fname: firstName.value,
            lname: surName.value,
            dob: new Date(`${yearValue}-${monthValue}-${dayValue}`),
            email: signupEmail.value,
            password: signUpPass.value,
            genderIdentity: gender,
        };

    
        persons.push(personData)

        localStorage.setItem('persons', JSON.stringify(persons));

        
        alert("Click 'Ok' to signup!")

        firstName.value = ""
        surName.value = ""
        new Date(`${yearValue}-${monthValue}-${dayValue}`) 
        signupEmail.value = ""
        signUpPass.value = ""
        gender = ""

        // window.location.href = './loginPage/index.html'
        overlay.classList.add('hidden')
    }

    else{
        alert('Please fill out all the fields')
    }

    
}



function getDayHandler(d){
    console.log(d)
    dayValue = d;
}

function getMonthHandler(m){
    console.log(m)
    monthValue = m;
}

function getYearHandler(y){
    console.log(y)
    yearValue = y;
}

function getGenderHandler(gIdentity){
    console.log(gIdentity)
    gender = gIdentity;
}

// for(i = 0; i < day.length; i++){
//     day[i].addEventListener('click', () => {
//         console.log(day[i])
//     })
// }

