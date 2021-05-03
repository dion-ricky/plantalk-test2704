self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
      self.skipWaiting();
  }
});

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDrJgW6fmPInCTGKhKVZuEZbqn2k0Mmz3s",
    authDomain: "plantalk-test2704.firebaseapp.com",
    projectId: "plantalk-test2704",
    storageBucket: "plantalk-test2704.appspot.com",
    messagingSenderId: "179398843604",
    appId: "1:179398843604:web:a37a1da6ce25c4dbbfaf41",
    measurementId: "G-K9N15WE0GH"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background ajahxhjjkq Title';
    const notificationOptions = {
      body: 'Background Message body.',
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });