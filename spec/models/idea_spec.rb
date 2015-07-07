require 'rails_helper'

RSpec.describe Idea, type: :model do

  it "is valid with all its attributes" do
    idea = Idea.create(title: "Circus training", 
                        body: "Learn to juggle on a unicycle",
                        quality: 0)

    expect(idea).to be_valid
  end

  it "is not valid without a title" do
    idea = Idea.create(title: nil, body: "Learn to juggle on a unicycle", quality: 1)
    expect(idea).not_to be_valid
  end

  it "is not valid without a title" do
    idea = Idea.create(title: "Random title", body: nil, quality: 2)
    expect(idea).not_to be_valid
  end

  it "is not valid without a quality" do
    idea = Idea.create(title: "Random title", body: "something cool", quality: nil)
    expect(idea).not_to be_valid
  end

  # it "is not valid without a quality that is not 0,1,2" do
  #   idea = Idea.new(title: "Random title", body: "something cool", quality: 3)
  #   expect(idea).not_to be_valid
    #  expect { idea }
    # .to raise_error(ArgumentError)
    # .with_message(/is not a valid quality/)
  # end
end

