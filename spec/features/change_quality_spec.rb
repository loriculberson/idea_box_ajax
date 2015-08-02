require 'rails_helper'

RSpec.describe "user can change the quality of idea", type: :feature do 

  it "change change quality rating from swill to plausibe" do 

    idea = Idea.create( title: "Beach house getaway", 
                        body: "Swim in the ocean and have fun",
                        quality: "swill")

    visit '/'
    click_on '+'
    
    expect(idea.quality).to eq("plausible")
  end
end


  # $('.complete').on("click", '.task-status', function( event ){
  #   var checkbox = $(event.target);
  #   var taskUpdateUrl = checkbox.data('url');
  #   $.ajax({
  #     url: taskUpdateUrl,
  #     type: 'PATCH',
  #     data: { task: { completed: 0 } }
  #   }).done(function(){
  #     var tr = checkbox.parents('tr');
  #     var incomplete = $('.incomplete tbody');
  #     incomplete.append(tr);
  #     checkbox.removeAttr('checked');
  #   })

  # })
