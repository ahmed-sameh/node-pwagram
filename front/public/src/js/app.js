var deferredPrompt;
const enableNotificationBtn = document.querySelectorAll(
  ".enable-notifications"
);
if (!window.Promise) {
  window.Promise = Promise;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function () {
      console.log("Service worker registered!");
    })
    .catch(function (err) {
      console.log(err);
    });
}

window.addEventListener("beforeinstallprompt", function (event) {
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

const askForNotficationPermmision = () => {
  Notification.requestPermission((resualt) => {
    if (resualt !== "granted") {
      console.log("notfication blocked");
    } else {
      displayNotificationConfirmation();
      pushSubHandler();
    }
  });
};

const displayNotificationConfirmation = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((swReg) => {
      const options = {
        body: "you succeffuly fucken subscribed to our fucken notfication services _!_",
        badge: "/src/images/icons/app-icon-96x96.png",
        icon: "/src/images/icons/app-icon-96x96.png",
        image: "/src/images/sf-boat.jpg",
        vibrate: [100, 50, 200],
        action: [
          {
            action: "confirm",
            title: "ok",
            icon: "/src/images/icons/app-icon-96x96.png",
          },
          {
            action: "cancel",
            title: "cancel",
            icon: "/src/images/icons/app-icon-96x96.png",
          },
        ],
      };
      swReg.showNotification(
        "Successfuly Enable Notfications (FROM SW)",
        options
      );
    });
  }
};

if ("Notification" in window && "serviceWorker" in navigator) {
  enableNotificationBtn.forEach((btn) => {
    btn.style.display = "inline-block";
    btn.addEventListener("click", askForNotficationPermmision);
  });
}

const pushSubHandler = () => {
  let _register;
  navigator.serviceWorker.ready
    .then((swReg) => {
      _register = swReg;
      return swReg.pushManager.getSubscription();
    })
    .then((sub) => {
      if (sub) {
        _register.pushManager.subscribe({ userVisibleOnly: true });
      } else {
      }
    });
};
