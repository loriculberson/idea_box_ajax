$(document).ready(function(){
//ajax request to post all
//create post
  createIdea()
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
      '<td><a class="btn btn-info btn-xs" data-remote="true" href="/ideas/' + idea.id + '/edit">Edit</a></td>' +
      '<td><a class="btn btn-warning btn-xs" data-confirm="Are you sure?" data-remote="true" rel="nofollow" data-method="delete" href="/ideas/' + idea.id + '">Delete</a></td>' +
    '</tr>';

  $('#newest-ideas').prepend(tr);
}

var clearIdeaForm = function() {
  $("#idea-form")[0].reset();
};
