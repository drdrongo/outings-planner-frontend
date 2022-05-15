class Api::V1::CouplesController < ApplicationController
  def create
    friend_email = params[:friend_email]
    friend_email && @friend = User.find_by(email: friend_email)
    puts '--- this is the friend email::: '
    p friend_email

    puts '--- this is the friend email2::: '
    p @friend
    unless @friend
      render json: { errors: @friend.errors.full_messages }, status: 422
    end

    puts "---This is user 1 id---"
    p couple_params[:user_1_id]

    puts "---This is user 2 id---"
    p @friend.id

    response = Couple.create!(user_1_id: couple_params[:user_1_id], user_2_id: @friend.id)
    render json: response
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
      :total_outings,
      {
        friend_email: ""
      }
    )
  end
end
