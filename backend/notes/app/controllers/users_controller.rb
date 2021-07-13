class UsersController < ApplicationController
    def index
        @users = User.all

        render json: @users
    end

    def show
        @user = User.find(params[:id])

        render json: @user
    end

    def new
        @user = User.new
    end

    def create
        @user = User.create(user_params)

        if @user.valid?
            render json: @user
        else
            render json: {error: "Unable to create this user."}
        end
    end

    def update
        @user = User.find(params[:id])
        @user.update(name: params[:name])

        render json: @user
    end

    private

    def user_params
        params.permit(:name)
    end
end
