echo -e "Configuring dev environment"
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github 
eval `ssh-agent`
ssh-add ~/.ssh/github
echo -e "Copy and paste the following into your github keys:\n"
cat ~/.ssh/github.pub
echo -e "\nThen press any key"
read input
echo -e "Testing github authentication"
ssh -T git@github.com
git clone git@github.com:seadb/.config.git ~/.config
(cd ~/.config; ./install.sh)
