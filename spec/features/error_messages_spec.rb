require 'rails_helper'

RSpec.describe "error messages", js: true, type: :feature do


  it "displayed when title is empty" do 
    visit '/'
    fill_in "idea[title]", with: nil
    fill_in"idea[body]", with: "great idea"
    choose "genius"
    click_on "Save Idea"

    expect(page).to have_content("Title can't be blank")
  end
end