var baseURL = 'https://sandbox.moderntransact.com/protecht/';
function submit_form(merchant_data, callbackurl, public_key, ajax_url, iframe_id, display_form){
         const query_string = $.param(merchant_data);  // Converting object to query string
         const origin = window.location.origin;
         //Ajax call to retrieve token from server
          $.get(ajax_url, function(token) {
            var url = baseURL+"hostedpage.html?"+query_string+"&token="+token+"&callbackurl="+callbackurl+"&key="+public_key+"&origin="+origin;
            $(iframe_id).attr("src", url);  // Appending url to src attribute of an iframe
            display_form();  // opening modal popup form
         });

}

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
        // For eg: this.first_name, here first_name is id of the input field so merchant has to replace first_name to the id of his first name input
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
        "expiration_date":"12/24"
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


// This will be written by merchant
$('#merchant_form').bind('submit', function(e){
    e.preventDefault();
    // sending all the input's which are present in the merchant form to map with the protecht parametes
    let mapped_data = map_params(this);
    let callbackurl = "https://google.com";
    const public_key = "pk_sandbox_c24dc55e4d07719b80c0916ce8a28e4dbf6a048f";
    let ajax_url = baseURL+"get_token.php";
    let iframe_id = "#payment_gateway";
    submit_form(mapped_data, callbackurl, public_key, ajax_url, iframe_id, display_form);
});


// This method open's the modal pop-up form.
// I have used Bootstrap for creating a modal pop up form.
// So merchant has to write his own code inside display_form function to open the modal pop up form
function display_form(){
    $('#staticBackdrop').modal('show');
}
