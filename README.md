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

Agent Factory administration panel client

## Developing

```sh

git clone https://github.com/pnoulis/agent_factory.git
cd agent_factory

# Initializes backend submodule
# sets MODE, NODE_ENV variables to development
./configure.dev

# Initializes docker containers for backend
# Starts development server for client
make start

# Stops development server and backend docker containers
make stop

```

## Make targets

```sh

##################################################
# Software development
##################################################

# Read dotenvfile and run $file or tmp/scratch.js
run 

# Build app
make build

# Start app
make start

# Stop App
make stop

##################################################
# Software distribution
##################################################

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

