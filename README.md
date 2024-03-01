<a name='readme-top'></a>

<br />
<div align="center">
<h3 align="center">Agent Factory</h3>
<h4 align="center">Administration panel client</h4>
</div>
<br/>

### Built with

![java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)


## About

Agent Factory administration panel client


## Prerequisites

### Install Microsoft Windows Subsystem for Linux (wsl)

```sh

# How to install wsl2
https://learn.microsoft.com/en-us/windows/wsl/install

# Install wsl2
wsl --install

# Set distribution wsl version to 2
wsl --set-default-version 2

# List available distros
wsl -l -v

# Ensure the default installed wsl distro is at version 2
wsl --set-version <distro name> 2
# Example
wsl --set-version Ubuntu-20.04 2

# Restart pc

```


### Install Node

```sh

  # Within a terminal emulator running the Bash Shell
  # (+1 if you can understandard the jargon)
  # first install Node Version Manager (nvm)
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  
  # Run this command, dont ask why
  source ~/.bashrc
  
  # Install node version 21.0.0
  nvm install 21.0.0
  
  # CHeck node is installed
  node --version
  
```

### Install Make

```sh

  # On ubuntu
  sudo apt update
  sudo apt upgrade
  sudo apt install build-essential
  
  # Check make is installed
  make --version
  
```

### Install M4 preprocessor

```sh

  # On ubuntu
  # Considering that you have already run sudo apt update && upgrade
  sudo apt install m4
  
  # Check m4 is installed
  m4 --version

```

### Install JQ

```sh

  # On ubuntu
  sudo apt install jq
  
  # Check jq is installed
  jq --version
  
```



## Developing

```sh

  git clone https://github.com/pnoulis/agent_factory.git
  cd agent_factory

  # Downloads npm packages
  # Checks dependencies
  # Builds Makefile, backend-topics, vite.config.js ...
  ./configure.init
  
  # Rerun after ./configure.init
  ./configure.dev

  # Starts development server for client
  make start

  # Stops development server
  make stop
  
```

## Developing with the a Containerized (docker) Backend

```sh

# git submodule init initializes your local configuration 
# file to track the submodules your repository uses, 
# it just sets up the configuration so that you can use
# the git submodule update command to clone and update the submodules.
git submodule init

# git submodule update --init initializes your local configuration file
# and clones the submodules for you, using the commit specified
# in the main repository.
# NOTE
# command bellow will not pull the right branch -- even if
# it's in your .gitmodules file, for that you need remote. Likely
# because it looks at the origin (pointer to remote) in github for the available branches.
# NOTE
# bellow pulls the submodules if you didn't specify them when
# cloning parent project, ref: https://youtu.be/wTGIDDg0tK8?t=119
git submodule update --init

# The --remote option tells Git to update the submodule to the commit specified
# in the upstream repository, rather than the commit specified in the main repository.
#git submodule update --init --remote

# Finnally just do that
git submodule update --init --recursive --remote

# Start Backend container
make start-backend

# Start dev server
make start

# Stop backend container
make stop-backend

# Stop dev server
make stop

```

## Make targets

```sh

##################################################
# Software development
##################################################

# Read dotenvfile and run $file or tmp/scratch.js
run 

# Start app
make start

# Stop App
make stop

##################################################
# Software distribution
##################################################

# Build app
make build

# Create a new version
make release

# Distribute source tree
make dist

# Distribute build
make package

# Deploy the app to some remote machine, such as the clients server
make deploy

##################################################
# Utilities
##################################################

# Remove files created by ./make
make clean

# Remove files created by ./configure && make
make distclean

# Write environment into .env
make dotenv

```


## Contact

- pavlos noulis
  pnoulis@iegroup.gr
  https://github.com/pnoulis

<p align='right'>(<a href="#readme-top">back to top</a>)</p>

