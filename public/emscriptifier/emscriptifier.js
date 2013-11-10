var CScriptPrototype = Object.create(HTMLElement.prototype);
CScriptPrototype.createdCallback = function() {
    this.cCode = this.textContent;
    if( this.cCode === undefined || this.cCode == "" )
        return;

    this.options = {
        extension: ".js",
        guid: getHash(".js" + this.cCode)
    };

    this.updateContents();
};

CScriptPrototype.setCode = function( code, options ) {
  	this.cCode = code;

    var extension = options.extension || ".js",
        guid = options.guid || getHash( extension + this.cCode );

    this.options = {
        guid: guid,
        extension: extension
    };

    this.updateContents();
};

CScriptPrototype.updateContents = function() {
    var _this = this;

    var url = document.location.origin + "/compile";

    var httpData = {
        guid: this.options.guid,
        c: this.cCode,
        extension: this.options.extension
    };

    postJSON( url, {"c": httpData}, function(data) {

        // If we've compiled a script, inject it into the page
        if( _this.options.extension == ".js" ) {
            // Evaluate the compiled script
            (new Function(data))()
        } else {
            // Inject an iFrame into this element, and 
            // embed the html we've received
            _this.innerHTML = '<iframe id="myFrame"></iframe>';

            var ifrm = document.getElementById('myFrame');
            ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
            ifrm.document.open();
            ifrm.document.write( data );
            ifrm.document.close();
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

    request.fail( function() {
        console.log( arguments ); 
    });
}

function getHash(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}