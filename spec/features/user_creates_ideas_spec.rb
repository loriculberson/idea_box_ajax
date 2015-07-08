require 'rails_helper'

RSpec.describe "user creates idea", js: true, type: :feature do

  it "shows up on the home page" do
    visit '/'
    fill_in "idea[title]", with: "Amazing idea"
    fill_in "idea[body]", with: "Shop for shoes in Italy"
    choose "swill"
    click_on "Save!"

    expect(page).to have_content("Amazing idea")
    expect(page).to have_content("Shop for shoes in Italy")
  end
end