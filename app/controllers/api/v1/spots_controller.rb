class Api::V1::SpotsController < ApplicationController
  def get
    
  end

  def post
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
