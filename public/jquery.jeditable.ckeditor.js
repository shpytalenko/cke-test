/*
 * CKEditor input for Jeditable
 * 
 * Adapted from Wysiwyg input for Jeditable by Mike Tuupola
 *   http://www.appelsiini.net/2008/9/wysiwyg-for-jeditable
 *
 * Copyright (c) 2009 Jeremy Bell
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 * 
 * Depends on CKEditor:
 *   http://ckeditor/
 *
 * Revision: $Id$
 *
 */
 
(function($) {
$.editable.addInputType('ckeditor', {
    /* Use default textarea instead of writing code here again. */
    //element : $.editable.types.textarea.element,
    element : function(settings, original) {
        /* Hide textarea to avoid flicker. */
        var textarea = $('<textarea>').css("opacity", "0").generateId();
        if (settings.rows) {
            textarea.attr('rows', settings.rows);
        } else {
            textarea.height(settings.height);
        }
        if (settings.cols) {
            textarea.attr('cols', settings.cols);
        } else {
            textarea.width(settings.width);
        }
        $(this).append(textarea);
        return(textarea);
    },
    content : function(string, settings, original) { 
        /* jWYSIWYG plugin uses .text() instead of .val()        */
        /* For some reason it did not work work with generated   */
        /* textareas so I am forcing the value here with .text() */
        $('textarea', this).text(string);
    },
    plugin : function(settings, original) {
        var self = this;
        if (settings.ckeditor) {
            setTimeout(function() { CKEDITOR.replace($('textarea', self).attr('id'), settings.ckeditor); }, 0);
        } else {
            setTimeout(function() { CKEDITOR.replace($('textarea', self).attr('id'), {toolbar: [{ name: 'document', items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
	{ name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
	{ name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
	{ name: 'forms', items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 
        'HiddenField' ] },
	'/',
	{ name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
	{ name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv',
	'-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
	{ name: 'links', items : [ 'Link','Unlink','Anchor' ] },
	{ name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
	'/',
	{ name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
	{ name: 'colors', items : [ 'TextColor','BGColor' ] },
	{ name: 'tools', items : [ 'Maximize', 'ShowBlocks','-','About' ] }]}); }, 0);
        }
    },
    submit : function(settings, original) {
        $('textarea', this).val(CKEDITOR.instances[$('textarea', this).attr('id')].getData());
	CKEDITOR.instances[$('textarea', this).attr('id')].destroy();
    }
});
})(jQuery);
