$(document).ready(function(){
  // var createButton = $('#create-idea');
  $('#save-edited-idea').hide();

  createIdea();
  deleteIdea();
  editIdea();
  upQuality();
  downQuality();
  saveEditedIdea();
});

function createIdea(){
  $("#create-idea").on('click', function(event){
    event.preventDefault();
    var ideaParams = { idea: {  title: $("#idea_title").val(),
                                body: $("#idea_body").val(),
                                quality: $("input[name='idea[quality]']:checked").val()} 
                      }
    $.ajax({
      type: 'POST',
      url: '/ideas',
      data: ideaParams,
      success: function(newIdea){
        $('.errors').html('');
        addIdeaToTable(newIdea);
        clearIdeaForm();
        upIdeaCount();
      },
      error: function(xhr){
        var errors = $.parseJSON(xhr.responseText).errors; 
        $('.errors').html(errors);
      }
    })
  })
}

function upIdeaCount(){
  var counter = $("#idea_counter").text();
  counter++;
  $('#idea_counter').html(counter);
}

function downIdeaCount(){
  var counter = $("#idea_counter").text();
  counter--;
  $('#idea_counter').html(counter);
}

function editIdea(){
  $("#newest-ideas").on('click', '.edit-idea', function(event) {
    event.preventDefault();
    var id = $(this).parents('tr').data('id');
    var editButton = $(this);
    $('#save-edited-idea').show();
    $('#create-idea').hide();


    $.ajax({
      type: 'GET',
      url: '/ideas/' + id
    }).done(function(idea){
      populateEditForm(idea);
    })
  })
}

function populateEditForm(idea){
  var ideaTitle = idea.title;
  var ideaBody = idea.body;
  var ideaQuality = idea.quality;
  var ideaId = idea.id;

  $("#idea_title").val(ideaTitle);
  $("#idea_body").val(ideaBody);
  $('#idea_id').val(ideaId);
  $('input[name="idea[quality]"][value="' + ideaQuality + '"]').prop('checked', true);
}

function saveEditedIdea(){
  $(".form-area").on('click', '#save-edited-idea', function(event) {
    event.preventDefault();
    var updatedParams = { idea: { title: $("#idea_title").val(),
                                  body: $("#idea_body").val(),
                                  quality: $("input[name='idea[quality]']:checked").val(),
                                }
                        }

    var id = $('#idea_id').val();

    $.ajax({
      type: 'PATCH',
      contentType: 'application/json', 
      data: JSON.stringify(updatedParams),
      url: '/ideas/' + id,
    }).done(function(updatedIdea){
      updateIdeaOnTable(updatedIdea);
      clearIdeaForm();
      $('#save-edited-idea').hide();
      $('#create-idea').show();

    })
  })
}

var updateIdeaOnTable = function(updatedIdea) {
  var td = 
      '<td>' + updatedIdea.title + '</td>' +
      '<td>' + updatedIdea.body + '</td>' +
      '<td class="quality-text">' + updatedIdea.quality + '</td>' +
      '<td><a class="btn btn-success btn-xs up-quality" href="#">+</a></td>' +
      '<td><a class="btn btn-danger btn-xs down-quality" href="#">-</a></td>' +
      '<td><a class="btn btn-info btn-xs edit-idea" href="/ideas/' + updatedIdea.id + '/edit">Edit</a></td>' +
      '<td><a class="btn btn-warning btn-xs delete-idea" href="/ideas/' + updatedIdea.id + '">Delete</a></td>';

  $('.idea-number-'+ updatedIdea.id).html(td);
}

var addIdeaToTable = function(idea) {
  var tr = 
    '<tr class="idea-number-' + idea.id + '" data-id="' + idea.id + '" data-quality="' + idea.quality_number + '">' +
      '<td>' + idea.title + '</td>' +
      '<td>' + idea.body + '</td>' +
      '<td class="quality-text">' + idea.quality + '</td>' +
      '<td><a class="btn btn-success btn-xs up-quality" href="#">+</a></td>' +
      '<td><a class="btn btn-danger btn-xs down-quality" href="#">-</a></td>' +
      '<td><a class="btn btn-info btn-xs edit-idea" href="/ideas/' + idea.id + '/edit">Edit</a></td>' +
      '<td><a class="btn btn-warning btn-xs delete-idea" href="/ideas/' + idea.id + '">Delete</a></td>' +
    '</tr>';

  $('#newest-ideas').prepend(tr);
}

var clearIdeaForm = function() {
  $("#idea-form")[0].reset();
};

function deleteIdea() {
  $("#newest-ideas").on('click', '.delete-idea', function(event) {
    debugger;
    event.preventDefault();
    var id = $(this).parents('tr').data('id');

    $.ajax({
      type: 'DELETE',
      url: '/ideas/' + id 
    }).done(function(){
      removeIdeaFromTable(id);
      downIdeaCount();
    })
  })
}

var removeIdeaFromTable = function(id) {
  $('.idea-number-' + id).remove();
}

function updateQualityInTable (updatedQuality) {
  $('.quality-text').html(updatedQuality);
}

function upQuality() {
  $("#newest-ideas").on('click', '.up-quality', function(event) {
    //get idea.quality and the id
    //this is the button that triggers the event
    event.preventDefault();
    var ideaQuality = $(this).parents('tr').data('quality');
    var id = $(this).parents('tr').data('id');
    var upButton = $(this);

    if (ideaQuality < 2) { ideaQuality++ }
    $(this).parents('tr').data('quality', ideaQuality);

    $.ajax({
      type: 'PATCH',
      contentType: 'application/json', //
      url: '/ideas/' + id,
      data: JSON.stringify({ idea: { quality: ideaQuality } })
      // contentType tells Rails how to interpret this data, 
          // JSON.stringify will take the js object and generate a json string. '{"idea": {"quality": 1}}'
      // Rails doesn't know this is a number 'idea[quality]=1' => { idea: { quality: "1" } }
    }).done(function(updatedIdea){
      upButton.parents('tr').find('.quality-text').html(updatedIdea.quality);
    })
  })
}

function downQuality() {
  $("#newest-ideas").on('click', '.down-quality', function(event) {
    event.preventDefault();
    var ideaQuality = $(this).parents('tr').data('quality');
    var id = $(this).parents('tr').data('id');
    var downButton = $(this);

    if (ideaQuality > 0) { ideaQuality-- }
    $(this).parents('tr').data('quality', ideaQuality);

    $.ajax({
      type: 'PATCH',
      contentType: 'application/json', 
      //this tells Rails how to parse the data we are sending  
      //i.e as JSON
      url: '/ideas/' + id,
      data: JSON.stringify({ idea: { quality: ideaQuality} })

    }).done(function(updatedIdea){
      downButton.parents('tr').find('.quality-text').html(updatedIdea.quality);
    })
  })
}
