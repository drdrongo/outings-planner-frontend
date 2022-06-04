class Api::V1::OutingsController < ApplicationController
  def show
    outing = Outing.find(params[:id])
    if outing
      render json: outing, status: 200
    else
      render json: { errors: outing.errors.full_messages }, status: 422
    end
  end

  def index
    where = '1=1'
    puts 'farts'
    p params
    search = params[:search]

    if search
      search.each do |key, val|
        if %i[genre mood price is_complete is_favorite].include? key # %i for array of symbols
          where += " AND #{key} = '#{val}'"
        elsif %i[title].include? key
          where += " AND #{key} LIKE '%#{val}%'"
        end
      end
    end

    @outings = Outing.where(where)

    puts 'foobar'
    p @outings
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

  def toggle_favorite
    outing = Outing.find(params[:id])
    if outing
      outing.update(is_favorite: !outing.is_favorite)
      render json: outing, status: 200
    else
      render json: { errors: outing.errors.full_messages }, status: 422
    end
  end

  private

  def outing_params
    params.require(:outing).permit(
      :couple_id, :spot_id, :rating, :date_time, :images, :is_complete,
      :is_favorite, :title, :description, :price, :mood, :genre
    )
  end
end
