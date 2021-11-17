class Api::V1::OutingsController < ApplicationController
  def show
    @outing = Outing.find_by(params[:id])
    if @outing
      render json: @outing, status: 200
    else
      render json: { errors: @outing.errors.full_messages }, status: 422
    end
  end

  def index
    @outings = Outing.all
    if @outings
      render json: @outings, status: 200
    else
      render json: { errors: @outings.errors.full_messages }, status: 422
    end
  end

  def create
    response = Outing.create!(
      outing_params
    )
    render json: response
  end

  def delete
  end

  private

  def outing_params
    params.require(:outing).permit(
      :couple_id, :spot_id, :rating, :date_time, :images, :is_complete,
      :is_favorite, :title, :description, :price, :mood, :genre
    )
  end
end
