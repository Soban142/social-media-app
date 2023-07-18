var isLoggedInUser = JSON.parse(localStorage.getItem('isloggedUser'))
console.log(isLoggedInUser)

var userName = document.getElementById('userName');
var userEmail = document.getElementById('userEmail');
var userGender = document.getElementById('userGender');
var userDescription = document.getElementById('userDescription');
var creationOfPost =  document.querySelector('.postField');
var logOutBtn = document.querySelector('.logoutBtn');
var myProfile = document.querySelector('.myProfile');


if(!isLoggedInUser){
    window.location.href="../index.html";
}

logOutBtn.addEventListener('click', () => {
    // localStorage.removeItem
    window.location.href="../index.html";
})

userName.textContent = `${isLoggedInUser.fname} ${isLoggedInUser.lname}`
userEmail.textContent = `${isLoggedInUser.email}`
userGender.textContent = `${isLoggedInUser.genderIdentity}`
// if(isLoggedInUser.description){
//     userDescription.innerText = `${isLoggedInUser.description}`
// } else{
//     userDescription.innerText= 'No description added'
// }

userDescription.innerText = isLoggedInUser.description || "No description added"


//   || CREATION OF A POST


var hidden = document.querySelector('.hidden');
var postBox = document.querySelector('.postBox');
var overlay = document.querySelector('.overlay');
var postBtn = document.querySelector('.postBtn');
var postDiv = document.querySelector('.postDiv');
var postDescription = document.querySelector('.postCaption')


let posts = JSON.parse(localStorage.getItem('posts')) || []

// console.log(posts)



posts.filter(post => post.postUserEmail === isLoggedInUser.email).forEach((post) => {
    var postContent = `<div class="post">
    <div class="authorDetails">
        <img src="../assests/avatarDummy.png" alt="" class="userPostImg">
        <div class="">
            <div class="postData postUserName">${post.postUserName}</div>
            <div class="postData postUserDesc">${post.postUserDescription || "No description added"}</div>
            <div class="postData postTime">${post.postTime}</div>
        </div>
    </div>
    <div class="postCaption">${post.postCaption}</div>
    <div>
        <img src="../assests/dummyPostImage.jpg" alt="" id="postImage">
    </div>
</div>`;

var postParent = document.createElement('div');
postParent.innerHTML = postContent;


postDiv.appendChild(postParent);

});



overlay.addEventListener('click', () => {
    postBox.classList.add('hidden');
    overlay.classList.add('hidden');
})

creationOfPost.addEventListener('click', postCreator);
postBtn.addEventListener('click', postHandler)

function postCreator () {
    postBox.classList.remove('hidden');
    overlay.classList.remove('hidden');
} 

function postHandler() {
    var postContent = `<div class="post">
    <div class="authorDetails">
        <img src="../assests/avatarDummy.png" alt="" class="userPostImg">
        <div class="">
            <div class="postData postUserName">${isLoggedInUser.fname} ${isLoggedInUser.lname}</div>
            <div class="postData postUserDesc">${isLoggedInUser.description || "No description added"}</div>
            <div class="postData postTime">${new Date().toLocaleString().split(',')[1]}</div>
        </div>
    </div>
    <div class="postCaption">${postDescription.value}</div>
    <div>
        <img src="../assests/dummyPostImage.jpg" alt="" id="postImage">
    </div>
</div>`;

var postParent = document.createElement('div');
postParent.innerHTML = postContent;
console.log(postParent);


postDiv.appendChild(postParent);


postBox.classList.add('hidden');
overlay.classList.add('hidden');

postData = {
    postUserName : `${isLoggedInUser.fname} ${isLoggedInUser.lname}`,
    postUserDescription: isLoggedInUser.description,
    postUserEmail: isLoggedInUser.email,
    postCaption: postDescription.value.trim(),
    // postImg: 
    postTime: new Date().toLocaleString().split(',')[1],
}

// console.log(postData.postTime)

posts.push(postData);

localStorage.setItem('posts',JSON.stringify(posts));
}