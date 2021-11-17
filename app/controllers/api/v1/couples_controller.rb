class Api::V1::CouplesController < ApplicationController
  def index
    @couples = Couple.all
    render json: @couples
  end
end
