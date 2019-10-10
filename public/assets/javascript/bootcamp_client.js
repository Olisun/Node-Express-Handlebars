// Making sure we wait to attach our handlers until tje DOM is fully loaded. 
$(function() {
  // This click function adds a new technology subject to the list. 
  $('.create-form').on('submit', function(event) {
    // This prevents the default action of a form which just clears it upon submitting. 
    event.preventDefault();
    // Grabbing the user input value for what she enters for a technology. 
    var name = $('[name=technology-name]').val().trim();

    if (name !== '') {
      var newTech = {
        name: name
      };
      // Sending the POST request. 
      $.ajax('/api/subjects', {
        type: 'POST',
        data: newTech
      }).then(
        function() {
          console.log('You added a new technology subject.')
            // Geting the updated list. 
          location.reload();
        })
    } else {
      $('[name=technology-name]').val();
    };
  });

  // This click function updateds the new technology subject to the list the user entered. 
  $('.learned').on('click', function(event) {
    var id = $(this).data('id');
    // Updatig the state from the default set in the mysl db when the button is clicked. 
    var newState = {
      learned: true
    };
    // Sending the PUT request. 
    $.ajax('api/subjects/' + id, {
      type: 'PUT',
      data: newState
    }).then(
      function() {
        console.log('changed learned to ', true);
        // This updates the list by reloading the DOM. 
        location.reload();
      });
  });

  // This click function removes a technology subject from the list. 
  $('.remove-subject').on('click', function(event) {
    var id = $(this).data('id');
    // Sending the delete request. 
    $.ajax('/api/subjects/' + id, {
      type: 'DELETE',
    }).then(
      function() {
        console.log('Removed subject: ', id);
        // Getting the updated list. 
        location.reload();
      }
    );
  })
});