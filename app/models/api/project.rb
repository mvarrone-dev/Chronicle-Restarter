# == Schema Information
#
# Table name: api_projects
#
#  id               :integer          not null, primary key
#  title            :string           not null
#  content          :text
#  author_id        :integer          not null
#  category_id      :integer
#  goal             :integer
#  project_img_urls :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  blurb            :text
#  duration         :integer
#  location         :string
#

class Api::Project < ActiveRecord::Base

  validates :title, :author_id, presence: true

  belongs_to :author, class_name: 'User', foreign_key: 'author_id'

end
