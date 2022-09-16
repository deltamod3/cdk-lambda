# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk ls`          create cdk resources
* `cdk synth`       emits the synthesized CloudFormation template
* `cdk synth --no-staging > template.yaml`  generate SAM template.yaml file
* `sam local start-api`                     run cdk on local

## Cognito Local
Run cognito-local

`npm run cognito-local`

Run SAM lambda functions on local

`sam local start-lambda`

Then lambda functions will run on http://127.0.0.1:3001.
```
Update cognito config.json.
{
  "LambdaClient": {
    "endpoint": "http://127.0.0.1:3001"
  },
  "TokenConfig": {
    "IssuerDomain": "http://localhost:9229"
  },
  "TriggerFunctions": {
    "PostConfirmation": "CognitofnSignupHandler7C3EDD45",
    "PreTokenGeneration": "CognitofnSigninHandlerEC3F28CA"
  },
  "UserPoolDefaults": {
    "UsernameAttributes": [
      "email"
    ]
  },
  "KMSConfig": {
    "credentials": {
      "accessKeyId": "local",
      "secretAccessKey": "local"
    },
    "region": "local"
  }
}
```
You can find the correct function name from template.yaml file.

Create new UserPool (in another terminal)

`aws --endpoint http://localhost:9229 cognito-idp create-user-pool --region local --pool-name MyUserPool`

Create new user

`aws --endpoint http://localhost:9229 cognito-idp admin-create-user --region local --user-pool-id ${user_pool_id} --username justinedela75@gmail.com --desired-delivery-mediums EMAIL`

Confirm user

`aws --endpoint http://localhost:9229 cognito-idp admin-confirm-sign-up --region local --user-pool-id local_7il9e90L --username b61da2e1-0ad1-4e5e-a5cd-84c901e79fd0`

Create UserPool client

`aws --endpoint http://localhost:9229 cognito-idp create-user-pool-client --region local --user-pool-id local_1pwUwLFQ --client-name Frontend`


Admin Initiate Auth

`aws --endpoint http://localhost:9229 cognito-idp admin-initiate-auth --region local --user-pool-id local_1pwUwLFQ --client-id 7j2rbyuow4nznoeh2y3zz89d6 --auth-flow ADMIN_USER_PASSWORD_AUTH --auth-parameters USERNAME=justinedela75@gmail.com,PASSWORD=1DRH7o`

