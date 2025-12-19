const form = document.getElementById("formate");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop page refresh

    let userData = {
        firstName: document.getElementById("fName1").value,
        lastName: document.getElementById("lName1").value,
        email: document.getElementById("Email1").value,
        password: document.getElementById("Password1").value,
        phone: document.getElementById("Phone1").value,
        country: document.getElementById("Country1").value
    };

    // Save to localStorage 
    localStorage.setItem("spotifyUser", JSON.stringify(userData));

    alert("Data Saved Successfully!");
});
