//initial socket connection
console.log("attempting connect");
var socket = io.connect('your nodejs server here');
console.log("done");
socket.on('connect',function(){
    console.log("made socket connection to server " + socket.id);         
});

//receive credit notification and server-side credit amount
socket.on('creditValue', function(creditValue){
    credits = creditValue;
    UpdateCredits();
    //begin relevant animations on canvas
    if (creditValue > 0) {
        CoinInsertedSound();
        FlashPressStart();
    }
});

socket.on('creditValueOnStartPress', function(creditValue){
    credits = creditValue;
    UpdateCredits();
    //begin relevant animations on canvas
    if (creditValue > 0) {
        FlashPressStart();
    }
});

//receive new payment code from server, format and display
socket.on('NewPaymentCodeResponse', function(paymentCode){
    document.getElementById('qr-container1').innerHTML = "";
    var qrcode = new QRCode(document.getElementById('qr-container1'),{
        text: paymentCode,
        width: 200,
        height: 200,
        colorDark: "#000000",
        correctLevel: QRCode.CorrectLevel.L
    });
    document.getElementById('copy-qr-btn').setAttribute('data-clipboard-text', paymentCode);
});
        
//server-side credit allows for a new game to start, update client-side credit
socket.on("CreditCheckTrue", function(){
    //start game and update pacman.js credits variable and redraw with Updatecredits()
    StartGame();
    UpdateCredits();
});    
