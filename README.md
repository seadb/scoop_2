# scoop
ride-sharing app

# First-time set up
### Download/install dependencies

1. Install  [vagrant](https://docs.vagrantup.com/v2/installation/) and [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest)
2. Install [VirtualBox](https://www.virtualbox.org/)

### Set up vagrant VM

1. Clone this repo ```git clone git@github.com:seadb/scoop.git```
2. Create the virtual machine ```vagrant up``` 
3. Connect to the virtual machine ```vagrant ssh``` 
4. Install dependencies with ```./install-dependencies.sh```
5. (Optional) Configure the dev-environment ```./configure-dev-env.sh```
Follow the instructions which will help you set up ssh-keys and configure 
development tools like vim, tmux, and git with custom settings.
