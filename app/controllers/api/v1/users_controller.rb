class Api::V1::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + [:password] # Used because password was getting stripped by strong params

  # before_action :authorize_request, except: :create

  # before_action :find_user, except: %i[create index]


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

  def create
    @user = User.new(
      user_params
    )
    if @user.save
      render json: @user, status: 200
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  def put
  end

  def destroy
    params[:id] && @user = User.find(params[:id])

    if @user
      @user.destroy
      render json: @user, status: 200
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  private

  # def find_user
  #   @user = User.find_by_username!(params[:_username])
  #   rescue ActiveRecord::RecordNotFound
  #     render json: { errors: 'User not found' }, status: :not_found
  # end

  def user_params
    params.require(:user).permit(
      :f_name,
      :l_name,
      :email,
      :password,
      :password_confirmation,
      :birthday,
      :image
    )
  end
end
