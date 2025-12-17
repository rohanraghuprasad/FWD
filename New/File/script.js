// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAJPsFJ-nChUw1e23UC8sO299Gw2inqgM",
    authDomain: "urproject3-82514.firebaseapp.com",
    projectId: "urproject3-82514",
    storageBucket: "urproject3-82514.firebasestorage.app",
    messagingSenderId: "120878746844",
    appId: "1:120878746844:web:03e7e50208e9cfe093f819",
    measurementId: "G-EJFK3J5MHB"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// User Authentication (Login & Registration)
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            document.getElementById("user-info").innerText = `Logged in as: ${email}`;
            loadDoctors();
            loadAppointments();
        })
        .catch(error => alert(error.message));
}

function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Registration Successful! Please log in.");
        })
        .catch(error => alert(error.message));
}

function logout() {
    auth.signOut().then(() => {
        document.getElementById("user-info").innerText = "Logged out.";
        document.getElementById("doctor-list").innerHTML = `<option value="">Login to see doctors</option>`;
    });
}

// Load Doctors from Firestore
function loadDoctors() {
    const doctorList = document.getElementById("doctor-list");
    doctorList.innerHTML = `<option value="">Loading doctors...</option>`;

    db.collection("doctors").get().then(snapshot => {
        doctorList.innerHTML = "";
        snapshot.forEach(doc => {
            const doctor = doc.data();
            doctorList.innerHTML += `<option value="${doc.id}">${doctor.name} - ${doctor.specialization}</option>`;
        });
    }).catch(error => console.log(error));
}

// Load Available Time Slots when Date is Selected
document.getElementById("appointment-date").addEventListener("change", function() {
    const doctorId = document.getElementById("doctor-list").value;
    const date = this.value;
    const timeSlot = document.getElementById("time-slot");

    if (!doctorId) return alert("Select a doctor first.");

    timeSlot.innerHTML = `<option value="">Loading time slots...</option>`;

    db.collection("doctors").doc(doctorId).get().then(doc => {
        if (doc.exists) {
            const availableSlots = doc.data().availableSlots[date] || [];
            timeSlot.innerHTML = availableSlots.length
                ? availableSlots.map(slot => `<option value="${slot}">${slot}</option>`).join("")
                : `<option value="">No slots available</option>`;
        }
    });
});

// Book an Appointment
function bookAppointment() {
    const user = auth.currentUser;
    if (!user) return alert("Please log in first.");

    const doctorId = document.getElementById("doctor-list").value;
    const date = document.getElementById("appointment-date").value;
    const time = document.getElementById("time-slot").value;

    if (!doctorId || !date || !time) return alert("Please select doctor, date, and time.");

    db.collection("appointments").add({
        userId: user.uid,
        doctorId: doctorId,
        date: date,
        time: time,
        status: "Booked"
    }).then(() => {
        alert("Appointment booked successfully!");
        loadAppointments();
    }).catch(error => alert(error.message));
}

// Load User's Appointments
function loadAppointments() {
    const user = auth.currentUser;
    if (!user) return;

    const appointmentsList = document.getElementById("appointments-list");
    appointmentsList.innerHTML = `<li>Loading appointments...</li>`;

    db.collection("appointments").where("userId", "==", user.uid).get().then(snapshot => {
        appointmentsList.innerHTML = "";
        snapshot.forEach(doc => {
            const appointment = doc.data();
            appointmentsList.innerHTML += `
                <li>
                    Doctor: ${appointment.doctorId} | Date: ${appointment.date} | Time: ${appointment.time}
                    <button onclick="cancelAppointment('${doc.id}')">Cancel</button>
                </li>`;
        });
    });
}

// Cancel an Appointment
function cancelAppointment(appointmentId) {
    db.collection("appointments").doc(appointmentId).delete()
        .then(() => {
            alert("Appointment cancelled.");
            loadAppointments();
        })
        .catch(error => alert(error.message));
}

// Monitor Authentication State
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("user-info").innerText = `Logged in as: ${user.email}`;
        loadDoctors();
        loadAppointments();
    } else {
        document.getElementById("user-info").innerText = "Not logged in.";
    }
});
