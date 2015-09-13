require 'rails_helper'

RSpec.describe Idea, type: :model do

  it "is valid with all its attributes" do
    idea = Idea.create(title: "Circus training", 
                        body: "Learn to juggle on a unicycle",
                        quality: "swill")

    expect(idea).to be_valid
  end

  it "is not valid without a title" do
    idea = Idea.new(title: nil, body: "Learn to juggle on a unicycle", quality: "plausible")
    expect(idea).not_to be_valid
  end

  it "is not valid without a body" do
    idea = Idea.new(title: "Random title", body: nil, quality: 2)
    expect(idea).not_to be_valid
  end

  it "is not valid without a quality" do
    idea = Idea.new(title: "Random title", body: "something cool", quality: nil)
    expect(idea).not_to be_valid
  end

  # it "is not valid without a quality that is not 0,1,2" do
  #   idea = Idea.new(title: "Random title", body: "something cool", quality: "yuck")
  #   expect(idea).not_to be_valid
  #    expect { idea }
  #   .to raise_error(ArgumentError)
  #   .with_message(/'3' is not a valid quality/)
  # end
end