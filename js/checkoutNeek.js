var neekCheckoutStyleConsult = document.getElementById("neek-chkout-style-consult");
var neekCheckoutApparelReccs = document.getElementById("neek-chkout-apparel-reccs");

var styleConsultData = {
  'line_items': [ 
    {
      'price_data': {
        'currency': 'usd',
        'unit_amount': 1000,
        'product_data': {
          'name': 'Style Consultations w/ Neek',
          'description': 'We’ll take a look at your current look, identify any gaps, and help you find the best style for you.'
        },
      },
    'quantity': 1,
    }
  ]
};

var checkoutApparelReccsData = {
  'line_items': [ 
    {
      'price_data': {
        'currency': 'usd',
        'unit_amount': 1000,
        'product_data': {
          'name': 'Apparel and Accessories Recommendations w/ Neek',
          'description': 'Based on your current style preferences, we will find the best outfits and accessories that are within your budget.'
        },
      },
    'quantity': 1,
    }
  ]
};

neekCheckoutStyleConsult.addEventListener("click", function () { checkout(styleConsultData); });
neekCheckoutApparelReccs.addEventListener("click", function () { checkout(checkoutApparelReccsData); });

function checkout(data) {
  var stripe = Stripe("pk_live_51HiOXCFHHxbM9ctm1BGpp6amLZ604svd4c4Lu6brGPgXZV9pxXlXIQ9EkrTeePMyI8GlBbDqxbD1BdNIf48NzeZr00DY1HiJBB");
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