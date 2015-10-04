require 'rails_helper'

RSpec.describe "user deletes idea", js: true, type: :feature do 

  def create_idea
    visit '/'
    fill_in "idea[title]", with: "Amazing idea"
    fill_in "idea[body]", with: "Shop for shoes in Italy"
    choose "swill"
    click_on "Save"
  end

  it "is gone from the page upon deletion" do 
    create_idea

    click_on "Delete"

    expect(page).not_to have_content("Amazing idea")
    expect(page).not_to have_content("Shop for shoes in Italy")
  end

  it "counts the correct number of ideas upon delete" do 
    create_idea
    click_on "Delete"

    expect(Idea.count).to eq(0)
  end
end

