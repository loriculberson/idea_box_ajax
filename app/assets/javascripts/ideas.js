$(document).ready(function(){
//ajax request to post all
//create post
  createIdea();
  deleteIdea();
  upQuality();
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
    '<tr>' + 
      '<td><a href="/ideas/' + idea.id + '">' + idea.title + '</a></td>' +
      '<td>' + idea.body + '</td>' +
      '<td>' + idea.quality + '</td>' +
      '<td><a class="btn btn-success btn-xs up-quality" href="/ideas/' + idea.id + '">+</a></td>' +
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
  $('.up-quality').on('click', function(event) {
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
      // updateQualityInTable(updatedIdea.quality);
      //.data('quality' .....this accesses the data attribute in the html)
      //.data('...ideaQuality' .....this sets the new quality value)
    })
  })
}
