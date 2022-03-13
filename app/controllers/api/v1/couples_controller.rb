class Api::V1::CouplesController < ApplicationController
  def create
    Couple.create(couple_params)
  end

  def show
    params[:id] && @couple = Couple.find(params[:id])
    if @couple
      render json: @couple, status: 200
    else
      render json: { errors: @couple.errors.full_messages }, status: 422
    end
  end

  def index
    @couples = Couple.all
    render json: @couples
  end

  private

  def couple_params
    params.require(:couple).permit(
      :user_1_id,
      :user_2_id,
      :total_outings
    )
  end
end
