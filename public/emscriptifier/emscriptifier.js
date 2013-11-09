var CScriptPrototype = Object.create(HTMLElement.prototype);
CScriptPrototype.createdCallback = function() {
    this.cCode = this.textContent;
    if( this.cCode === undefined || this.cCode == "" )
        return;

    this.updateContents();
};

CScriptPrototype.setCode = function( code ) {
  	this.cCode = code;

    this.updateContents();
};

CScriptPrototype.updateContents = function( code ) {
    var url = document.location.origin + "/compile";

    var httpData = {
        c: this.cCode
    };

    postJSON( url, httpData, function(data) {
        // Evaluate the compiled script
        try { 
            (new Function(data))()
        } catch( err ) {
            console.log( "Error: " + err );
        }
    });
};

var CScript = document.register('c-script', {
  	prototype: CScriptPrototype
});

function postJSON(url, data, callback) {
    request = $.ajax({
        url: url,
        type: "post",
        data: data
    });

    // callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        callback( response );
    });

    // callback handler that will be called on failure
    //request.fail(function (jqXHR, textStatus, errorThrown){
    //    // log the error to the console
    //    console.error( "The following error occured: " + textStatus, errorThrown );
    //});
}