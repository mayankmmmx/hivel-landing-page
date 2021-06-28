var stripe = Stripe("pk_test_51HiOXCFHHxbM9ctm10sNaowc3mWToOlR1u5VITEgt3zKLKex3rvEpWg4zLiY9VbOpzncxRRbFkPHqvK0TJpDfjDL00GdVr8v60");
var mayankCheckoutButton = document.getElementById("mayank-checkout-btn");
var neekCheckoutButton = document.getElementById("neek-checkout-btn");

var hairData = {
  'line_items': [ 
    {
      'price_data': {
        'currency': 'usd',
        'unit_amount': 2500,
        'product_data': {
          'name': 'Hair Session w/ Mayank',
          'description': 'This includes a 1:1 session where we discuss your hair/skin care needs, followed by personalized product and routine recommendations.'
        },
      },
    'quantity': 1,
    }
  ]
};

var styleData = {
  'line_items': [ 
    {
      'price_data': {
        'currency': 'usd',
        'unit_amount': 2500,
        'product_data': {
          'name': 'Style Session w/ Neek',
          'description': 'This includes a 1:1 session where we discuss how to find or improve your style, followed by personalized outfit/style recommendations.'
        },
      },
    'quantity': 1,
    }
  ]
};

mayankCheckoutButton.addEventListener("click", function () { checkout(hairData); });

neekCheckoutButton.addEventListener("click", function () { checkout(styleData); });


function checkout(data) {
	fetch("https://3hpxbe0263.execute-api.us-east-1.amazonaws.com/default/checkout", {
		method: "POST",
		body: JSON.stringify(data),
	})
	.then(function (response) {
	  return response.json();
	})
  .then(function (session) {
    return stripe.redirectToCheckout({ sessionId: session.id });
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
}