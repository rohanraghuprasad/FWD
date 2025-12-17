if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyBAJPsFJ-nChUw1e23UC8sO299Gw2inqgM",
        authDomain: "urproject3-82514.firebaseapp.com",
        projectId: "urproject3-82514",
        storageBucket: "urproject3-82514.appspot.com",
        messagingSenderId: "120878746844",
        appId: "1:120878746844:web:03e7e50208e9cfe093f819",
        measurementId: "G-EJFK3J5MHB"
    });
}

// Define Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
