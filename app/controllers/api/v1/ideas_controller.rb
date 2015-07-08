class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def create
    respond_with Idea.create(idea_params)
  end


end
