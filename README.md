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
-   IAM => Service Accounts Menu => In the list of members, locate and selec [PROJECT_NUMBER]-compute@developer.gserviceaccount.com.
Click SHOW INFO PANEL in the top right corner.
In the Permissions panel, click the Add Member button.
Enter the Cloud Build service account ([PROJECT_NUMBER]@cloudbuild.gserviceaccount.com) in the New Member input field.
In the Role dropdown, select Service Accounts, and then Service Account User.


In cloudbuild.json, replace newproject-262123 with the google cloud project ID for each of the 4 steps.

-   In Cloud build, connect your Github repository and add a new Trigger.
    Choose the branch/tag that should trigger a new build
    In the build configuration: Select Cloud Build configuration file (yaml or json), and point it to cloudbuild.json (Later we will do the same for the production build/run)

-   After you push to github and Cloud Build runs for the first time, it will have created a service in cloudRun. We can add a custom domain to it here (from a verified site), and if you go to the details page, we will click 'deploy new version' and add the .env variables here.

#### Firebase

Go to https://console.firebase.google.com/ and create a new project.
Select your previously made project and follow the wizard to create the firebase project.

- Under auth => signin methods => Enable Google signin + save.
- While we are here, we can also add our new domain(s) to authorised domains list.

- Now we go to the settings => Project settings and add a webapplication to this project.
- This will show us a firebaseconfig object, that we will copy and save in src/firebase/index.ts as the config variable in this file.

- In the config file we have our client API key. To secure this we go to the GCP console, to API & Services => Credentials, and click on this client API key, and here we limit it to HTTP referrers, and add all the sites we will be working from (also localhost, http + https)


#### Mongo DB 
-  Go to https://www.mongodb.com/ sign in/up and follow the steps to add a new project and build a new cluster
-  Choose GCP and Belgium for the location, and select the free tier.
-  Create a user with Read/write permission, and get the connections string (go to connect => connect your application, using node and version 2.2.12 or later), and add this to the .env file and in Google Cloud Run.


#### Sentry

- Go to https://sentry.io/ create a new project (react) and get the DSN (should look something like this: "https://8418ff76751d4eb1b508c63c9810e286@sentry.io/1857705") and add it to the .env file + GCR



### 📚 Reads 📚

-   https://medium.com/@khwsc1/a-simple-react-next-js-app-development-on-docker-6f0bd3f78c2c
-   https://cloud.google.com/cloud-build/docs/deploying-builds/deploy-cloud-run
-   https://dev.to/metamas/testing-next-js-api-routes-55g3

### TODO

[Send message to Slack when Cloud build is done.](https://cloud.google.com/cloud-build/docs/configure-third-party-notifications)