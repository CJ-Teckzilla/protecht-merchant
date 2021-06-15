var baseURL = 'https://sandbox.moderntransact.com/protecht/';
$(function(){
    $('#merchant_form').bind('submit', function(e){
         e.preventDefault();
         let mapped_data = map_params(this);
         const query_string = $.param(mapped_data);
         const callbackurl = "https://google.com";
         const origin = window.location.origin;
         const public_key = "pk_sandbox_c24dc55e4d07719b80c0916ce8a28e4dbf6a048f"
         //Ajax call to retrieve token from server
          $.get(baseURL+ "get_token.php", function(token) {
            var url = baseURL+"hostedpage.html?"+query_string+"&token="+token+"&callbackurl="+callbackurl+"&key="+public_key+"&origin="+origin;
            $('#payment_gateway').attr("src", url);
            $('#staticBackdrop').modal('show');
         });
    });
});

window.addEventListener("message", (event) => {
    if (event.data === "Close Iframe"){
         $('#staticBackdrop').modal('hide');
    }
});


function map_params(data){
    return {
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
