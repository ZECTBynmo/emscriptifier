window.HomeView = Backbone.View.extend({

    initialize:function () {
        this.render();

        var _this = this;
        setTimeout(function() {
        	console.log( "SDFSDFSD ");

	        document.editor = ace.edit("editor");
			document.editor.setTheme("ace/theme/monokai");
			document.editor.getSession().setMode("ace/mode/c_cpp");

			//var height = $(window).height();
			var height = 250;

			$('#editor').height( height );
	    }, 0);
    },

    render:function () {
        $(this.el).html(this.template());

        return this;
    }

});