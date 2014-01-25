(function($) {

  $.fn.tagsly = function() {
    // Split tags when comma or space is pressed
    var SPLIT_ON = [13, 188];
    // Remove the previous tag when backspace is pressed
    var REMOVE_ON = [8];

    // Create the wrapper
    var wrapper = $('<div/>', {
      'class': 'tagsly'
    });

    // Create the textbox
    var input = $('<input/>', {
      'type': 'text'
    });

    function split() {
      // Split contents of textbox into a tag element
      if (input.val() == '') {
        return;
      }
      var tag =  $('<span/>', {
        'class': 'tag',
        'text': input.val()
      });
      var close = $('<a/>', {
        'text': 'x',
        'href': '#'
      });
      close.click(remove);
      tag.append(close);
      input.before(tag);
      input.val('');
    }

    function remove() {
      $(this).parent().remove();
      input.focus();
    }

    input.focusout(function(e) {
      split();
    });

    input.keydown(function(e) {
      if (SPLIT_ON.indexOf(e.which) != -1) {
        split();
        return false;
      }
      if (REMOVE_ON.indexOf(e.which) != -1) {
        if (input.val() == '') {
          input.prev().remove();
          return false;
        }
      }
    });

    // Throw a wrapper around the targeted input and hide it
    this.wrap(wrapper);
    this.parent().append(input);
    this.hide();

    // For chaining
    return this;
  };

})(jQuery);
