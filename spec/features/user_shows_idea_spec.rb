require 'rails_helper'

RSpec.describe "user can show one idea", type: :feature do 

  def create_idea
    visit '/'
    fill_in "idea[title]", with: "Amazing idea"
    fill_in "idea[body]", with: "Shop for shoes in Italy"
    choose "swill"
    click_on "Save!"
  end

  it "shows an idea when clicked on" do 
    idea = Idea.create( title: "Amazing idea", 
                        body: "Shop for shoes in Italy",
                        quality: "swill" 
                      )
    visit '/'

    click_on "Amazing idea"

   expect(page).to have_content("Amazing idea")
   expect(current_path).to eq(idea_path(idea))
  end
end