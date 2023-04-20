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

- Install Make
```sh
# Within wsl2
# Ubuntu or Debian
sudo apt update && sudo apt upgrade
sudo apt install make
```

- [Vscode integration](https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers#develop-in-remote-containers-using-vs-code)


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

<p align='right'>(<a href="#readme-top">back to top</a>)</p>

## Contact

<p align='right'>(<a href="#readme-top">back to top</a>)</p>

