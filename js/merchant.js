var baseURL = 'https://sandbox.moderntransact.com/protecht/';
$(function(){
    $('#merchant_form').bind('submit', function(e){
         e.preventDefault();
         // Validating Field
         let data = $('#merchant_form').serializeArray();
         const json_data = $.param(data);
         var callbackurl = "https://google.com";
         //Ajax call to retrieve token from server
          $.get(baseURL+ "get_token.php", function(data) {
            console.log(data);
            var url = baseURL+"hostedpage.html?"+json_data+"&token="+data+"&callbackurl="+callbackurl+"&key=pk_sandbox_c24dc55e4d07719b80c0916ce8a28e4dbf6a048f";
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
