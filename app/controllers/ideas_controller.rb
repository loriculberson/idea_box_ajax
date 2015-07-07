class IdeasController < ApplicationController
  respond_to :json, :html

  def new
    @idea = Idea.new 
  end

  def index
    @ideas = Idea.all 

    respond_with @ideas
  end

  def create
    @idea = Idea.create(ideas_params)
    if @idea.save
      respond_with do |format|
        format.html { redirect_to ideas_path, notice: "Your idea was created." }
        format.json { render json: @idea }
      end
    else

      respond_with do |format|
        format.html do 
          flash.now[:notice] = "Your idea was not created."
          render :edit
        end

      format.json { render json:  { errors: @item.errors.messages }, status: 400 }
      end
    end
  end

  private
  def ideas_params
    params.require(:idea).permit(:title, :body, :quality)
  end

end
