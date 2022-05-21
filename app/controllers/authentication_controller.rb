class AuthenticationController < ApplicationController
  before_action :authorize_request, except: [:login, :verify_jwt, :signup]

  # POST /auth/login
  def login
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: {
        token: token,
        exp: time.strftime('%m-%d-%Y %H:%M'),
        user: @user
      }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  # POST /auth/signup
  def signup
    @user = User.new(signup_params)
    if @user.save
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { token: token, exp: time.strftime('%m-%d-%Y %H:%M'), user: @user }, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  def verify_jwt
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = JsonWebToken.decode(header)
      puts 'yo yo yo yo yo yo yoy oy oy oyoy oy o'
      p @decoded
      @current_user = User.find(@decoded[:user_id])
      render json: @current_user, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end

  private

  def login_params
    params.require(:user).permit(:email, :password)
  end

  def signup_params
    params.require(:user).permit(
      :f_name,
      :l_name,
      :email,
      :password,
      :password_confirmation,
    )
  end
end
