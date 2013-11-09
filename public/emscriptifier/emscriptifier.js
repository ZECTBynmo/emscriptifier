// hide body to prevent FOUC
document.body.style.opacity = 0;
window.addEventListener('WebComponentsReady', function() {
// show body now that everything is ready
document.body.style.opacity = 1;
});


var CScriptPrototype = Object.create(HTMLElement.prototype);
CScriptPrototype.createdCallback = function() {
  	this.textContent = "I'm a c-script!";
  	alert("Test");
};
CScriptPrototype.foo = function() {
  	console.log('foo() called');
};

var CScript = document.register('c-script', {
  	prototype: CScriptPrototype
});