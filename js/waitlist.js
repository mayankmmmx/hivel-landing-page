var waitlistEmail = document.getElementById("waitlist-email");

var waitlistButton = document.getElementById("waitlist-btn");

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

waitlistButton.addEventListener("click", function () {
  email = document.getElementById("waitlist-email").value;
  if (validateEmail(email))
  {
    data = {
      "email": email
    };

    fetch("https://hives-7fbbb-default-rtdb.firebaseio.com/waitlist/waitlist.json", {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(function (response) {
      if (response.status == 200) {
        alert("Thank you for your interest. We'll be in touch!")
      }
      return response.json();
    })
    .then(function (result) {
      // If redirectToCheckout fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using error.message.
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
  } else {
    alert("Please enter a valid email.");
  }
});
