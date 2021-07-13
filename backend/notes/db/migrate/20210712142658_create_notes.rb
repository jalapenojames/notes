class CreateNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|
      t.integer :user_id
      t.json :title
      t.json :content

      t.timestamps
    end
  end
end
