# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "destroying all users ..."
User.destroy_all
puts "destroying all notes ..."
Note.destroy_all

puts "resetting all users ..."
User.reset_pk_sequence
puts "resetting all notes ..."
Note.reset_pk_sequence

users = ['Bradley', 'Veronica']
# notesTitle = [{type: 'paragraph', children: [{text: 'I"m Bradley'}]}, {type: 'paragraph', children: [{text: 'I"m Veronica'}]}]
# notesContent = [{type: 'paragraph', children: [{text: 'Monday'}]}, {type: 'paragraph', children: [{text: 'Tuesday'}]}]

users.each do |name|
    User.create(name: name)
end

# (0..1).each do |i|
#     puts notesTitle[i]
#     puts notesContent[i]
#     Note.create(user_id: User.all.sample.id, title: notesTitle[i], content: notesContent[i])
# end



# real time data
notesTitle = [{type: 'paragraph', children: [{text: 'Flatiron links'}]},{type: 'paragraph', children: [{text: 'Asdf'}]},{type: 'paragraph', children: [{text: 'Draw Boundaries'}]},{type: 'paragraph', children: [{text: 'Task list'}]},{type: 'paragraph', children: [{text: 'Places I want to work'}]},{type: 'paragraph', children: [{text: 'Wonton noodle soup'}]},{type: 'paragraph', children: [{text: 'Packing list'}]}, {type: 'paragraph', children: [{text: 'Notes'}]}, {type: 'paragraph', children: [{text: 'Didi college tips'}]}]
notesContent = [[{type: 'paragraph', children: [{text: 'Homeroom'}]}],[{type: 'paragraph', children: [{text: 'view'}]}],[{type: 'paragraph', children: [{text: 'visuals are important to employers'}]}],[{type: 'paragraph', children: [{text: 'Urgent/ASAP'}]}],[{type: 'paragraph', children: [{text: 'Notion'}]}, {type: 'paragraph', children: [{text: 'Anima'}]}],[{type: 'paragraph', children: [{text: 'stir fry veggies, cut garlic, add crumbled seA salt and magic'}]}],[{type: 'paragraph', children: [{text: 'Toothbrush'}]}], [{type: 'paragraph', children: [{text: "4.6 mi, 14 min"}]}], [{type: 'paragraph', children: [{text: "messing up is learning, even if it’s embarrassing, you’ll learn from it"}]}]]


# notesTitle.each do |n|
#     puts n
# end



(0..8).each do |i|
    puts notesTitle[i]
    puts notesContent[i]
    Note.create(user_id: User.all.sample.id, title: notesTitle[i], content: notesContent[i][0])
end