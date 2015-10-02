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
        addIdeaToTable(newIdea);
        clearIdeaForm();
      }
    })
  })
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
      // $('#save-edited-idea').append('<input type="hidden" id=' + id);
    })
  })
}

function populateEditForm(idea){
  // add the title and body back into the form DONE
  // add the quality to the radio button by matching what is in the database with 
  //the value already stored in the button
  //pass the idea id to the "edit" button
  var ideaTitle = idea.title;
  var ideaBody = idea.body;
  var ideaQuality = idea.quality;
  var ideaId = idea.id;

  $("#idea_title").val(ideaTitle);
  $("#idea_body").val(ideaBody);
  $('#idea_id').val(ideaId);
  $('input[name="idea[quality]"][value="' + ideaQuality + '"]').prop('checked', true);
// <input type="radio" value="swill" checked="checked" name="idea[quality]" id="idea_quality_swill">
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
    })
  })
}

var updateIdeaOnTable = function(updatedIdea) {
  var td = 
      '<td><a href="/ideas/' + updatedIdea.id + '">' + updatedIdea.title + '</a></td>' +
      '<td>' + updatedIdea.body + '</td>' +
      '<td class="quality-text">' + updatedIdea.quality + '</td>' +
      '<td><a class="btn btn-success btn-xs up-quality" href="#">+</a></td>' +
      '<td><a class="btn btn-danger btn-xs down-quality" href="#">-</a></td>' +
      '<td><a class="btn btn-info btn-xs edit-idea" href="/ideas/' + updatedIdea.id + '/edit">Edit</a></td>' +
      '<td><a class="btn btn-warning btn-xs" rel="nofollow" data-method="delete" href="/ideas/' + updatedIdea.id + '">Delete</a></td>';

  $('.idea-number-'+ updatedIdea.id).html(td);
}

var addIdeaToTable = function(idea) {
  var tr = 
    '<tr class="idea-number-' + idea.id + '" data-id="' + idea.id + '" data-quality="' + idea.quality_number + '">' +
      '<td><a href="/ideas/' + idea.id + '">' + idea.title + '</a></td>' +
      '<td>' + idea.body + '</td>' +
      '<td class="quality-text">' + idea.quality + '</td>' +
      '<td><a class="btn btn-success btn-xs up-quality" href="#">+</a></td>' +
      '<td><a class="btn btn-danger btn-xs down-quality" href="#">-</a></td>' +
      '<td><a class="btn btn-info btn-xs edit-idea" href="/ideas/' + idea.id + '/edit">Edit</a></td>' +
      '<td><a class="btn btn-warning btn-xs" rel="nofollow" data-method="delete" href="/ideas/' + idea.id + '">Delete</a></td>' +
    '</tr>';

  $('#newest-ideas').prepend(tr);
}

var clearIdeaForm = function() {
  $("#idea-form")[0].reset();
  // $("#idea_id").reset();
};

function deleteIdea() {
  $('.delete-idea').on('click', function(event){
    event.preventDefault();
    var id = $(this).parents('tr').data('id');

    $.ajax({
      type: 'DELETE',
      url: '/ideas/' + id,
      success: function(){
        removeIdeaFromTable(id);
      }
    })
  });
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
