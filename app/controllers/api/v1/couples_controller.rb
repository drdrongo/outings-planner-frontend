class Api::V1::CouplesController < ApplicationController
  def create
    friend_email = params[:friend_email]
    friend_email && @friend = User.find_by(email: friend_email)
    puts '--- this is the friend email::: '
    p friend_email

    puts '--- this is the friend email2::: '
    unless @friend
      render json: { errors: @friend.errors.full_messages }, status: 422
    end

    @me = User.find(couple_params[:user1_id])

    response1 = Couple.create!(user1: @me, user2: @friend)
    response2 = Couple.create!(user1: @friend, user2: @me)
    render json: { response1: response1, response2: response2 }
  end

  def get_partner
    params[:user1_id] && @couple = Couple.find_by(user1_id: params[:user1_id])

    if @couple
      partner = User.find(@couple.user2_id)
      render json: { couple: @couple, partner: partner }, status: 200
    else
      render json: { errors: @couple.errors.full_messages }, status: 422
    end
  end

  def index
    @couples = Couple.where('user1_id = ? OR user2_id = ?', params[:user_id], params[:user_id])
    render json: @couples
  end

  private

  def couple_params
    params.require(:couple).permit(
      :user1_id,
      :user2_id,
      :total_outings,
      {
        friend_email: ''
      }
    )
  end
end
