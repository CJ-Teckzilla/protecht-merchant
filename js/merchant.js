var baseURL = 'https://sandbox.moderntransact.com/protecht/';
$(function(){
    $('#merchant_form').bind('submit', function(e){
         e.preventDefault();
         // Validating Field
         let data = $('#merchant_form').serializeArray();
         const json_data = $.param(data);
         var callbackurl = $('#btn_proceed').attr("callbackurl");
         //Ajax call to retrieve token from server
          $.get(baseURL+ "get_token.php", function(data) {
            console.log(data);
            var url = baseURL+"hostedpage.html?"+json_data+"&token="+data+"&callbackurl="+callbackurl;
            console.log(url);
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
