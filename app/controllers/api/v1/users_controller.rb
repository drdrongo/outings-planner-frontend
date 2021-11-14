class Api::V1::UsersController < ApplicationController
  def show
    params[:id] && @user = User.find(params[:id])

    if @user
      render json: { success: true, user: @user }
    else
      render json: { success: false }
    end
  end

  def index
    @users = User.all
    if @users
      render json: { success: true, users: @users}
    else
      render json: { success: false }
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
