window.HomeView = Backbone.View.extend({

    initialize:function () {
        this.render();

        setTimeout(function() {
	        var editor = ace.edit("editor");
			editor.setTheme("ace/theme/monokai");
			editor.getSession().setMode("ace/mode/javascript");

			$('#editor').height($(window).height());
	    }, 0);
    },

    render:function () {
        $(this.el).html(this.template());

        return this;
    }

});