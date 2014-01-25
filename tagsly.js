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
      'type': 'text',
      'class': 'tag-textbox'
    });

    var suggest = $('<ul/>', {
      'class': 'suggest'
    });

    // Keep track of the text input to store the comma separated values
    var backing = this;

    function split() {
      var value = input.val();

      // If empty don't create a tag
      if (value == '') {
        return;
      }

      // Build and add the tag span
      var tag =  $('<span/>', {
        'class': 'tag',
        'text': value
      });
      var close = $('<a/>', {
        'text': 'x',
        'href': '#'
      });
      close.click(function() {
        remove(tag);
      });
      tag.append(close);
      input.before(tag);

      // Reset the textbox
      input.val('');

      // Add the text to the backing textbox
      backing.val(function(i, val) { 
        return val + (val ? ',' : '') + value;
      });

      suggest.offset({ left: input.offset().left });
    }

    function remove(tag) {
      // Remove the tag from the DOM
      tag.find('a').remove();
      var value = tag.text();
      tag.remove();
      input.focus();

      // Remove the text from the backing textbox
      var tags = backing.val().split(',');
      tags.splice(tags.indexOf(value), 1);
      backing.val(tags.join(','));

      suggest.offset({ left: input.offset().left });
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
          remove(input.prev());
          return false;
        }
      }
      if (e.which == 38) {
        // Up arrow key
        var active = suggest.find('li.active');
        var activate;
        if (active.length > 0) {
          activate = active.prev();
          active.removeClass('active');
        } else {
          activate = suggest.children().last();
        }
        activate.addClass('active');
        input.val(activate.text());
        return false;
      }
      if (e.which == 40) {
        // Down arrow key
        var active = suggest.find('li.active');
        var activate;
        if (active.length > 0) {
          activate = active.next();
          active.removeClass('active');
        } else {
          activate = suggest.children().first();
        }
        activate.addClass('active');
        input.val(activate.text());
        return false;
      }
    });

    // Dummy suggest tags
    var langs = ['Java', 'JavaScript', 'Ruby on Rails'];
    for (var i = 0; i < langs.length; i++) {
      suggest.append($('<li/>', {
        'text': langs[i]
      }));
    }

    // Throw a wrapper around the targeted input and hide it
    this.wrap(wrapper);
    this.parent().append(input);
    this.parent().append(suggest);
    this.parent().click(function() {
      input.focus();
    });
    this.hide();

    // For chaining
    return this;
  };

})(jQuery);
