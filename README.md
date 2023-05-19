<a name='readme-top'></a>

<br />
<div align="center">
<h3 align="center">Agent Factory</h3>
<h4 align="center">A web application</h4>
</div>
<br/>

<details>
 <summary>Table of Contents</summary>
 <ol>
 <li><a href="#built-with">Built with</a></li>
   <li><a href="#about-the-project">About The Project</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
</ol>
</details>

### Built with

![java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
 ![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
 ![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
 ![vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)


## About

Agent Factory implements the **monorepo** pattern. It hosts nested git
repositories. A nested git repository is referred to as a **module** in the
context of the monorepo. The agent_factory repository is itself referred to as
the **superproject** The superporject is responsible for coordinating and
managing the interoperability of the modules. As such each available task listed
in the [Makefile](./Makefile) usually operates across all modules.


More info at:

- [software requirements](/docs/software_requirements.org)

- [product requirements](/docs/product_requirements.org)


For information on the development and usage of a specific module go to:

- [backend](https://github.com/IsThisRealLife/agent_factory_services#readme)

- [afadmin_client](https://github.com/pnoulis/afadmin_client#readme)

- [react_utils](https://github.com/pnoulis/react_utils#readme)

- [js_utils](https://github.com/pnoulis/js_utils#readme)

- [afmachine](https://github.com/pnoulis/afmachine#readme)

- [mqtt_proxy](https://github.com/pnoulis/mqtt_proxy#readme)


## Getting Started

### Prerequisites

- [Install Terminal](https://learn.microsoft.com/en-us/windows/terminal/install)

- [Install Wsl2](https://learn.microsoft.com/en-us/windows/wsl/install)

- [Install Docker Desktop](https://docs.docker.com/desktop/)

- [Microsoft Guide on Wsl2 and Docker](https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers)

- [Vscode integration](https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers#develop-in-remote-containers-using-vs-code)


- Install Make
```sh
# Within wsl2
# Ubuntu or Debian
sudo apt update && sudo apt upgrade
sudo apt install make
```

- Install Node
```sh
# Downloads and installs NVM (node version manager) 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Installs nodejs latest version
nvm install node

# Check version
node --version

# Check available versions
nvm ls-remote
```

<p align='right'>(<a href="#readme-top">back to top</a>)</p>

### Installation

```sh
# Get a copy of the repo
git clone git@github.com:pnoulis/agent_factory.git

# Move into repo
cd agent_factory

# Configures git
# Downloads modules
# Downloads npm packages
make setup
```
<p align='right'>(<a href="#readme-top">back to top</a>)</p>

## Usage
``` sh
# Builds all modules in dev mode
# Builds docker images and runs containers
make build && make docker
localhost:<port>...

# Builds all modules in production mode
make build-prod && make docker

# Remove all builds
make clean

# Remove all docker images and containers
make dockerclean

# Remove all builds and npm packages
make distclean

# Remove all
make allclean
```
<p align='right'>(<a href="#readme-top">back to top</a>)</p>

## Contributing

### Submodule development within the superproject
Due to the implementation details of git submodules, one must make sure to
switch to the master/main branch of the submodule before making any changes.

```sh
# The git development workflow for a submodule remains exactly the
# same as if the submodule was a normal git repository with one
# exception.

# Meaning that:

# Make some changes to the repository
echo "some change" >> someChange.txt

# Track those changes
git add .

# Commit the changes
git commit -m 'Make a change to someChange.txt'

# However due to the implementation details of git submodules, BEFORE you
# make any changes to the repo perform the following procedure:
git branch
# If the git branch is on master/main do nothing, else do:
git switch master

# Then in order to incorporate those changes to the superproject follow the
# directions in keeping the superproject up to date.
```
<p align='right'>(<a href="#readme-top">back to top</a>)</p>

### Keeping the superproject up to date
```sh
# Fetches and Merges all upstream changes owned by the superproject.
# It Fetches but does not Merge submodule upstream changes.
git pull

# In case git pull introduced a new git submodule one must run
git submodule update --init --recursive

# Move into the submodule directory that has pending upstream changes
# and merge the changes
cd $submodule
git pull

# Then one must bring up to date the superproject submodule references.
cd $superproject
git add .
git commit -m "[submodule.$submodule] Merge upstream"
```
<p align='right'>(<a href="#readme-top">back to top</a>)</p>

## Contact

- grigoris kolasis 
  grigoris@iegroup.gr 
  https://github.com/gregorykolasis
  
- pavlos kapoutsis
  pavloskapoutsis@gmail.com 
  https://github.com/IsThisRealLife

- pavlos noulis
  pnoulis@iegroup.gr 
  https://github.com/pnoulis

<p align='right'>(<a href="#readme-top">back to top</a>)</p>

