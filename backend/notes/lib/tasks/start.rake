namespace :start do
    task :development do
      exec 'cd ../.. && heroku local -f Procfile.dev'
    end
  end
  
  desc 'Start development server'
  task :start => 'start:development'