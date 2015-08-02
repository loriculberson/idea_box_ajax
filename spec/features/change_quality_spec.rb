require 'rails_helper'

RSpec.describe "user can change the quality of idea", js: true, type: :feature do 

  describe "#clicking plus sign" do

    it "changes quality rating from swill to plausible" do 
      idea = Idea.create( title: "Beach house getaway", 
                          body: "Swim in the ocean and have fun",
                          quality: "swill")

      visit '/'
      click_on '+'
      
      within 'table' do
        expect(page).to have_content("plausible")
      end

      idea.reload
      expect(idea.quality).to eq("plausible")
    end

    it "changes quality rating from plausible to genius" do 
      idea = Idea.create( title: "Beach house getaway", 
                          body: "Swim in the ocean and have fun",
                          quality: "plausible")

      visit '/'
      click_on '+'
      
      within 'table' do
        expect(page).to have_content("genius")
      end

      idea.reload
      expect(idea.quality).to eq("genius")
    end

    it "will not change quality rating when already genius" do 
      idea = Idea.create( title: "Beach house getaway", 
                          body: "Swim in the ocean and have fun",
                          quality: "genius")

      visit '/'
      click_on '+'
      
      within 'table' do
        expect(page).to have_content("genius")
      end

      idea.reload
      expect(idea.quality).to eq("genius")
    end
  end
end

