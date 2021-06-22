// the below baseURL is of sandbox we need to change this url once the project is live
var baseURL = 'https://sandbox.moderntransact.com/protecht/';
$(function(){
    // 1.Merchant needs to replace the below form id to their form id
    $('#merchant_form').bind('submit', function(e){
         e.preventDefault();
         // sending all the input's which are present in the merchant form to map with the protecht parametes
         let mapped_data = map_params(this);
         const query_string = $.param(mapped_data);  // Converting object to query string
         //2. Merchant will be redirected to the callbackurl after the successful response from protecht
         const callbackurl = "https://google.com";  // Merchant has to replace the value of callbackurl
         const origin = window.location.origin;
         // protecht public key is a required parameter to display protecht iframe
         //3. Merchant has to replace the value of public_key to his public_key
         const public_key = "pk_sandbox_c24dc55e4d07719b80c0916ce8a28e4dbf6a048f"
         //Ajax call to retrieve token from server
         //4. Merchant has to replace the baseURL + "get_token.php to their url
          $.get(baseURL+ "get_token.php", function(token) {
            var url = baseURL+"hostedpage.html?"+query_string+"&token="+token+"&callbackurl="+callbackurl+"&key="+public_key+"&origin="+origin;
            //5. Merchant has to replace the below iframe id to their iframe id
            $('#payment_gateway').attr("src", url);  // Appending url to src attribute of an iframe
            // We have use bootstrap modal popup form for example.
            //6. Merchant has to replace the below code for displaying the modal popup form
            $('#staticBackdrop').modal('show');  // opening modal popup form
         });
    });
});

// function to close iframe
// How it works As the user clicks on the decline payment button a postmessage will be send to the merchant website
// Then this below code will catch the message and hide the modal popup form
window.addEventListener("message", (event) => {
    // if the message received is Close iframe then it will close modal popup form
    if (event.data === "Close Iframe"){
         //7. Merchant has to replace the below line of code to hide their modal popup form
         $('#staticBackdrop').modal('hide');
    }
});


// Function to map parameters
function map_params(data){
    return {
        //8. merchant has to replace the id here
        // For eg: this.first_name, here first_name is id of the input field so merchant has to replace first_name
        // to their respective field id
        "first_name": extract_value(this.first_name),
        "last_name": extract_value(this.last_name),
        "email": extract_value(this.email_form),
        "phone": extract_value(this.phone),
        "address1": extract_value(this.address1),
        "address2": extract_value(this.address2),
        "city": extract_value(this.city),
        "state": extract_value(this.state),
        "zip_code": extract_value(this.zip_code),
        "country": extract_value(this.country),
        "sameasbilling": extract_value(this.sameasbilling),
        "shipping_address1": extract_value(this.shipping_address1),
        "shipping_address2": extract_value(this.shipping_address2),
        "shipping_city": extract_value(this.shipping_city),
        "shipping_state": extract_value(this.state),
        "shipping_zip_code": extract_value(this.shipping_zip_code),
        "shipping_country": extract_value(this.shipping_country),
        "name": extract_value(this.item_name),
        "reference_number": extract_value(this.reference_number),
        "cost": extract_value(this.cost),
        "order_number": extract_value(this.order_number),
        "currency": extract_value(this.currency),
        // value of below fields are hardcoded just for example
        "number": "4242 4242 4242 4242",
        "cvv": "589",
        "expiration_date"="12/24"
    };
}

function extract_value(field){
    try{
       return field.value
    }
    catch(err){
        return "";
    }
}
