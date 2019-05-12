# Visitors Count App [Updating Docker Containers with Ouroboros]

## Setting Up

- Update `ourboros.env`
- Install Docker : [steps](https://docs.docker.com/install/)
- Install Docker-compose : [step](https://docs.docker.com/compose/install/) 


## Running

`# docker-compose up -d` 


## Updating 

- Update `app.js` 

- Login to docker [steps](https://docs.docker.com/engine/reference/commandline/login/) 
- Build image `# docker build -t mydockerusername/myappname .`


- Push app image to Docker registry 
    `# docker push myusername/myappname`

> Ouroboros will automatically update the app.

> App is visible on port `3080`.
> To increase visitor count , open with different browsers. 

> Commands prefixed with `#` might require `root` previledges, or `su docker`. Verify your user permissions.

## Profit

[Blog > ](https://www.otienoken.me/containers/updating-docker-containers-with-ouroboros/) 