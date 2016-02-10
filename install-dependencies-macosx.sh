ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install rbenv ruby-build

# Add rbenv to bash so that it loads every time you open a terminal
echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
source ~/.bash_profile

# Install Ruby
rbenv install 2.2.3
rbenv global 2.2.3
echo 'verify ruby is installed:'
ruby -v

# Install Rails
gem install rails -v 4.2.4

# Reload rbenv to find the rails executable
rbenv rehash

echo 'verify rails is installed:'
rails -v

# Install and configure postgres
brew install postgresql 

# To have launchd start postgresql at login:
ln -sfv /usr/local/opt/postgresql/*plist ~/Library/LaunchAgents

# Then to load postgresql now:
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
