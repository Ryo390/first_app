class Housework < ActiveHash::Base
  self.data = [
    { id: 1, name: '---', classname: '---' },
    { id: 2, name: '掃除', classname: 'clean' },
    { id: 3, name: '料理', classname: 'cook' }
  ]
  include ActiveHash::Associations
  has_many :posts
end
