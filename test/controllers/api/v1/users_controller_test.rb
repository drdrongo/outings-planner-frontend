require "test_helper"

class Api::V1::UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get get" do
    get api_v1_users_get_url
    assert_response :success
  end

  test "should get post" do
    get api_v1_users_post_url
    assert_response :success
  end

  test "should get put" do
    get api_v1_users_put_url
    assert_response :success
  end

  test "should get delete" do
    get api_v1_users_delete_url
    assert_response :success
  end
end
