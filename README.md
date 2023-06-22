# EISODOS

### What is Eisodos? 

Eisodos is an open source product that simplifies Kubernetes metric visualization, offering a user-friendly interface. It empowers users to effortlessly monitor and analyze their environments, while providing powerful visualization capabilities for clear insights.

## Tech Stacks
<div align="center" width="100%">
            
[![Typescript](https://img.shields.io/badge/Typescript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/) [![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white)](https://redux.js.org/) [![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-7854AA?logo=redux&logoColor=white)](https://redux-toolkit.js.org/) [![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?logo=prometheus&logoColor=white)](https://prometheus.io/) [![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)](https://jestjs.io/) [![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)](https://git-scm.com/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/) [![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?logo=javascript&logoColor=white)](http://www.passportjs.org/) [![Express.js](https://img.shields.io/badge/Express.js-000000?logo=javascript&logoColor=white)](https://expressjs.com/) [![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white)](https://kubernetes.io/) [![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?logo=webpack&logoColor=black)](https://webpack.js.org/) [![Nivo](https://img.shields.io/badge/Nivo-00C4CC?logo=nivo&logoColor=white)](https://nivo.rocks/) [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/) [![HTML](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)


</div>

### Prerequisites:
- Install Docker Desktop on your machine: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
- Enable Kubernetes in Docker Desktop settings

Application Instructions:

This application requires you to run your kubernetes cluster locally. We suggest you use the tool [kind](https://kind.sigs.k8s.io/) to do this. 

1. Install Kind:
   - For Mac: `brew install kind`

2. Verify the installation of `kubectl`:
   - Run `kubectl --help` to check if you have access to it.
   - If not, follow the instructions [here](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/) to install `kubectl`.

3. Delete any existing kind cluster:
   - List the clusters to delete: `kind get clusters`
   - Delete a cluster: `kind delete cluster --name <cluster-name>`

4. Ensure Docker is running.

5. Create your cluster
   - Create a cluster with default settings `kind create cluster`
   - if you wish to create a custom cluster please visist the quick start kind [guide](https://kind.sigs.k8s.io/docs/user/ quick-start/#creating-a-cluster). This guide will also serve to help you with configuring your cluster in Kind. 


Now that we have our default cluster running you can set up prometheus. This guide will set up the version of prometheus that it works best with but you are free to try others as well. If you follow our guide note that you are working with [release .10](https://github.com/prometheus-operator/kube-prometheus/tree/release-0.10) of the kube prometheus repository for version 1.23 of kubernetes. 


6. Run your docker container
    
    `docker run -it -v ${PWD}:/work -w /work alpine sh`
    
7. Adding git to opened container
    
    `apk add git`
    
8. Shallow cloning file into container
    
    ```
    # clone
    git clone --depth 1 https://github.com/prometheus-operator/kube-prometheus.git -b release-0.10 /tmp/
    
    # view the files
    ls /tmp/ -l
    
    # we are interested in the "manifests" folder
    ls /tmp/manifests -l
    
    # let's grab it by copying it out the container
    cp -R /tmp/manifests .
    ```
    
9. Exiting
    
    `exit`

10. Apply Manifests
   - `kubectl create -f ./manifests/setup/`
   - `kubectl create -f ./manifests`

   Please wait for all pods to be in a ready state before continuing (to check this run `kubectl -n monitoring get pods`)

11. With your CRDs created from the manifests you gathered you can configure Prometheus with a yaml file. We have provided a template for doing so with the correct versions but you can make changes if you would like.
   - if using our YAML file run `kubectl apply -n monitoring -f prometheus.yaml`

12. Now that prometheus is set up, you can deploy your application to this cluster using kubectl to do so. Don't forget to add service monitors so that prometheus can scrape metrics for you! 

13. One last thing! Once your app is running in the cluster and configured to your liking you will need to expose port 9090 to enable metric scraping. 
   - `kubectl -n monitoring port-forward svc/prometheus-operated 9090`
   


### Eisodos Setup Guide 
- `npm install` to install dependencies
- Set project name, description, and authors in `package.json`
- Add your MongoDB connection string to `mongoURI` in `server.js`



## The Eisodos Team

- Aalayah Olaes: [Github](https://github.com/AalayahOlaes) | [LinkedIn](https://www.linkedin.com/in/aalayaholaes/)
- James Adler: [Github](https://github.com/jadler999) | [LinkedIn](https://www.linkedin.com/in/james-adler-/)
- Mahir Mohtasin: [Github](https://github.com/viiewss) | [LinkedIn](https://www.linkedin.com/in/mmohtasin/)
- Ron Liu: [Github](https://github.com/ronliu) | [LinkedIn](https://www.linkedin.com/in/ron-liu/)
- Pearl Chang: [Github](https://github.com/pearlhchang) | [LinkedIn](https://www.linkedin.com/in/pearlhchang/)
