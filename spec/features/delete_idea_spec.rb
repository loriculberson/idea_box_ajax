require 'rails_helper'

RSpec.describe "user deletes idea", js: true, type: :feature do 

  it "is gone from the page upon deletion" do 
    visit '/'
    fill_in "idea[title]", with: "Fabulous idea"
    fill_in "idea[body]", with: "Shop for hats in France"
    choose "plausible"
    click_on "Save!"
    click_on "Delete"
    click_on "Ok"

    expect(page).not_to have_content("Fabulous idea")
    expect(page).not_to have_content("Shop for hats in France")
  end
end

