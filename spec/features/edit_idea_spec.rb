require 'rails_helper'

RSpec.describe "user edits idea", js: true, type: :feature do 

  def create_idea
    visit '/'
    fill_in "idea[title]", with: "Amazing idea"
    fill_in "idea[body]", with: "Shop for shoes in Italy"
    choose "swill"
    click_on "Save"
  end

  it "can be edited immediately after creation" do
    create_idea
        
    click_on "Edit"
    fill_in "idea[body]", with: "Shoe shopping in France!"
    click_on "Update"

    within 'table' do
      expect(page).not_to have_content("Shop for shoes in Italy")
      expect(page).to have_content("Shoe shopping in France!")
    end
  end
end
