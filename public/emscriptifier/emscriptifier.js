var codeString = "#include <emscripten.h> \
\nint main() {\
\n  EM_ASM(\
\n    alert('hello world!');\
\n    throw 'all done';\
\n  );\
\n  return 0;\
\n}";



var CScriptPrototype = Object.create(HTMLElement.prototype);
CScriptPrototype.createdCallback = function() {
  	this.textContent = "I'm a c-script!";
  	
  	var url = document.location.origin + "/compile";

  	var httpData = {
  		c: codeString
  	};

  	postJSON( url, httpData, function(data) {
  	    // Evaluate the compiled script
        (new Function(data))()
  	});
};

CScriptPrototype.foo = function() {
  	console.log('foo() called');
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