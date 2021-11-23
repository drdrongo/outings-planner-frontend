class Api::V1::UsersController < ApplicationController
  def show
    params[:id] && @user = User.find(params[:id])

    if @user
      render json: @user, status: 200
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  def index
    @users = User.all
    if @users
      render json: @users, status: 200
    else
      render json: { errors: @users.errors.full_messages }, status: 422
    end
  end

  def post
    User.create(user_params)
  end

  def put
  end

  def delete
  end

  private

  def user_params
    params.require(:user).permit(
      :f_name,
      :l_name,
      :email,
      :password,
      :birthday,
      :image,
    )
  end
end
