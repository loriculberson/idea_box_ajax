class Idea < ActiveRecord::Base
  validates :title, :body, :quality, presence: true
  enum quality: { swill: 0, plausible: 1, genius: 2 }


  def self.desc_sorted
    order(:created_at => :desc)
  end

#converts the string quality value to a number
#which is needed in the update Quality function
  def quality_number
    Idea.qualities[quality]
  end
end
