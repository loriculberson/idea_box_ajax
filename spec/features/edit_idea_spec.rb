require 'rails_helper'

RSpec.describe "user edits idea", type: :feature do

  it "shows up on the home page" do
    idea = Idea.create( title: "Really amazing idea", 
                        body: "Shop for shoes in Italy",
                        quality: "swill" 
                      )
    visit edit_idea_path(idea)

    fill_in "idea[title]", with: "Super duper idea"
    fill_in "idea[body]", with: "Move to an interesting city"
    click_on "Update"

    within 'table' do
      expect(page).to have_content("Super duper idea")
    end

  end
end
