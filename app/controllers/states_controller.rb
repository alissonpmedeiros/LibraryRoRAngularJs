class StatesController < ApplicationController
  def index
    @states = State.all

    respond_to do |format|
      format.html {}
      format.json {render json: @states}
    end
  end

  def show
    @state = State.find(params[:id])
    render json: @state.as_json(include: :books)
  end

  def create
    @state = State.new(state_params)
    if @state.save
      render json: @state.as_json, status: :ok
    else
      render json: {state: :@state.errors, status: :no_content}
    end
  end

  def update
    @state = State.find(params[:id])
    if @state.update_attributes(state_params)
      render json: @state.as_json, status: :ok
    else
      render json: {state: @state.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @state = State.find(params[:id])
    @state.destroy
    head :no_content
  end

  private
  def state_params
    params.require(:state).permit(:name, :code)
  end
end
