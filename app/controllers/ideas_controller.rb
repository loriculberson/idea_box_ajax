class IdeasController < ApplicationController
  respond_to :json, :html

  def new
    @idea = Idea.new 
  end

  def edit
    @idea = Idea.find(params[:id])
  end

  def index
    @ideas = Idea.desc_sorted
  end

  def show
    @idea = Idea.find(params[:id])
  end

  def update
    @idea = Idea.find(params[:id])
    @idea.update(ideas_params)
    if @idea.save

      respond_with do |format|
        format.html { redirect_to ideas_path, noticce: "Successfully updated." }
        format.json { render json: @idea }
      end
    end
  end

  def create
    @idea = Idea.new(ideas_params)
    if @idea.save
      respond_with do |format|
        format.html { redirect_to ideas_path, notice: "Your idea was created." }
        format.json { render json: @idea }  
        #json: @idea is the same as newIdea (in js file) returning as a .json object
      end
    else
      format.json { render json:  { errors: @item.errors.messages }, status: 400 }
    end
  end

  def destroy
    idea = Idea.find(params[:id])
    idea.destroy

    respond_with do |format|
      format.html { redirect_to ideas_path, noticce: "Successfully deleted." }
      format.json { head :no_content }
      flash[:notice] = "Successfully deleted."
    end
  end

  private
  def ideas_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end
