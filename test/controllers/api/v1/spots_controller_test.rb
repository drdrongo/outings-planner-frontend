require "test_helper"

class Api::V1::SpotsControllerTest < ActionDispatch::IntegrationTest
  test "should get get" do
    get api_v1_spots_get_url
    assert_response :success
  end

  test "should get post" do
    get api_v1_spots_post_url
    assert_response :success
  end

  test "should get put" do
    get api_v1_spots_put_url
    assert_response :success
  end

  test "should get delete" do
    get api_v1_spots_delete_url
    assert_response :success
  end
end
