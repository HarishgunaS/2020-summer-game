//change the url to whatver server you are testing on
//this is the front end file.
//This will be imported as a script in the index.html file
let socket = io.connect("http://localhost:3000");

//Using DOM
let message = document.querySelector("#message");
let handle  = document.querySelector("#handle");
let button  = document.querySelector("#send");
let output  = document.querySelector("#output");

handle.value = req.user.username;

button.addEventListener("click", function () {
    console.log("This is working");
    socket.emit("chat",{
        message:message.value,
        handle:handle.value
    })

})

socket.on("chat", function (mssgObject) {
    output.innerHTML += "<p><strong>"+mssgObject.handle+"</strong>" +mssgObject.message +"</p>";

})