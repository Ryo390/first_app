class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
    @posts = Post.all
    @posts_all = {}
    Housework.where.not(name: '---').each do |housework|
      @posts_all[housework] = housework.posts
    end
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to root_path
    else
      render :new
    end
  end

  def post_params
    params.require(:post).permit(:wife_percentage, :husband_percentage, :housework_id)
  end
end
