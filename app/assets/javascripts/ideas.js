$(document).ready(function(){
//ajax request to post all
//create post
  createIdea();
  deleteIdea();
  upQuality();
  downQuality();
});

function createIdea(){
  $("#create-idea").on('click', function(event){
    event.preventDefault();
    var ideaParams = { idea: {  title: $("#idea_title").val(),
                                body: $("#idea_body").val(),
                                quality: $("input[name='idea[quality]']:checked").val()} }

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

var addIdeaToTable = function(idea) {
  var tr = 
    '<tr class="idea-number-' + idea.id + '" data-id="' + idea.id + '" data-quality="' + idea.quality_number + '">' +
      '<td><a href="/ideas/' + idea.id + '">' + idea.title + '</a></td>' +
      '<td>' + idea.body + '</td>' +
      '<td class="quality-text">' + idea.quality + '</td>' +
      '<td><a class="btn btn-success btn-xs up-quality" href="#">+</a></td>' +
      '<td><a class="btn btn-danger btn-xs down-quality" href="#">-</a></td>' +
      '<td><a class="btn btn-info btn-xs" data-remote="true" href="/ideas/' + idea.id + '/edit">Edit</a></td>' +
      '<td><a class="btn btn-warning btn-xs" rel="nofollow" data-method="delete" href="/ideas/' + idea.id + '">Delete</a></td>' +
    '</tr>';

  $('#newest-ideas').prepend(tr);
}

var clearIdeaForm = function() {
  $("#idea-form")[0].reset();
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
  //when user clicks on plus sign, if quality === swill, changes to plausible
  //when user clicks on plus sign, if quality === plausible, changes to genius
  //when user clicks on plus sign, if quality === genius, stays to genius
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
      data: JSON.stringify({ idea: { quality: ideaQuality} })

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
      url: '/ideas/' + id,
      data: JSON.stringify({ idea: { quality: ideaQuality} })

    }).done(function(updatedIdea){

      downButton.parents('tr').find('.quality-text').html(updatedIdea.quality);
    })
  })
}
