// Logout Function
function logout() {
    auth.signOut().then(() => {
        window.location.href = "login.html"; // Redirect to login page after logout
    }).catch((error) => {
        console.error("Logout Error:", error.message);
    });
}

