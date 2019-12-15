### SUMMARY

This blueprint gives you a SSR react app using Next. It is connected to an Atlas mongo Database using Next's Api routes.

For style we are using styled components. The global styles are set in a Layout Component, other styles we find in the styles folder.

We use firebase authentication to log in. A demo of a HOC is used for the admin page. This uses the helpers/withAuth HOC.

The CI/CD pipeline uses Google Cloud Platform. In google Cloud Build we set a trigger for every push to the develop branch in github. This will set 

### SETUP

#### Google Cloud Platform
[Google's instructions](https://cloud.google.com/cloud-build/docs/deploying-builds/deploy-cloud-run)
-   create Google Cloud Project 
-   Enable the Cloud Run API
-   Enable the Cloud Build API
-   Enable the Container Registry API
-   Enable the Resource Manager API

-   Cloud Build => Settings => Enabel Cloud Run Admin
-   IAM => Service Accounts Menu => 


(fill in in cloudbuild.json file)
-   create Firebase app (credentials for client)
-   create Mongo Atlas Database (read-write user)
-   have a google validated site (demo.bothrs.com)
-   fill in ENV file locally + Google Run

### 📚 Reads 📚

-   https://medium.com/@khwsc1/a-simple-react-next-js-app-development-on-docker-6f0bd3f78c2c
-   https://cloud.google.com/cloud-build/docs/deploying-builds/deploy-cloud-run
-   https://dev.to/metamas/testing-next-js-api-routes-55g3

### TODO

[Send message to Slack when Cloud build is done.](https://cloud.google.com/cloud-build/docs/configure-third-party-notifications)