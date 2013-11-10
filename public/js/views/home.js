var code = "#include &#60;emscripten.h&#62;\
\nint main() {\
\n	EM_ASM(\
\n		alert('hello from C++!');\
\n	);\
\n	return 0;\
\n}"

window.HomeView = Backbone.View.extend({

    initialize:function () {
        this.render();

        var _this = this;
        setTimeout(function() {
	        document.editor = document.getElementById('editor');

	        document.editor = CodeMirror.fromTextArea( document.editor, {
	        	mode: "cpp",
			    lineNumbers: true,
			    lineWrapping: true,
	        });

			//var height = $(window).height();
			var height = 200;

			$('#editor').height( height );
	    }, 0);
    },

    render:function () {
        $(this.el).html(this.template());

        return this;
    }

});