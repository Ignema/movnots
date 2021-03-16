
navigator.serviceWorker.register('/service-worker');

const socket = io.connect("/")

const pushButton = document.getElementById('push')
const options = {
    body: "No Quote Found :(",
    icon: '../assets/icon.png',
    image: '../assets/image.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {action: 'explore', title: 'Like',
        icon: '../assets/checkmark.png'},
      {action: 'close', title: 'Dislike',
        icon: '../assets/xmark.png'},
    ]
  };


function clicked() {
    if(pushButton.textContent==="unsubscribe"){
        socket.emit("unsubscribe")
        pushButton.textContent = "Subscribe!"
        pushButton.disabled = false
        return
    }
    pushButton.textContent = "unsubscribe"
    pushButton.disabled = true
    socket.emit("trigger")
}

socket.on("notify", (data)=>{
    params = options
    params.body = data.quote.text
    params.image = data.image
    if (!("Notification" in window)) alert("This browser does not support notifications")
    else if (Notification.permission === "granted") navigator.serviceWorker.getRegistrations()
    .then(registrations => {
        registrations[0].showNotification("MovNot", params)
        pushButton.disabled = false
    })
    else if (Notification.permission !== "denied") Notification.requestPermission()
    .then(permission => {
    if (permission === "granted") navigator.serviceWorker.ready
    .then(registration => {
        registration.showNotification("MovNot", params)
        pushButton.disabled = false
    })
    })
})