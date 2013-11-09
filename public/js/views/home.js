window.HomeView = Backbone.View.extend({

    initialize:function () {
        this.render();

        setTimeout(function() {
	        var editor = ace.edit("editor");
			editor.setTheme("ace/theme/monokai");
			editor.getSession().setMode("ace/mode/c_cpp");

			//var height = $(window).height();
			var height = 300;

			$('#editor').height( height );

			var cScript = new CScript();
			document.body.appendChild( cScript );
	    }, 0);
    },

    render:function () {
        $(this.el).html(this.template());

        return this;
    }

});