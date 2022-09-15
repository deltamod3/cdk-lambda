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

Create new UserPool (in another terminal)

`aws --endpoint http://localhost:9229 cognito-idp create-user-pool --region local --pool-name MyUserPool`

Create new user

`aws --endpoint http://localhost:9229 cognito-idp admin-create-user --region local --user-pool-id ${user_pool_id} --username justinedela75@gmail.com --desired-delivery-mediums EMAIL`

Confirm user

`aws --endpoint http://localhost:9229 cognito-idp admin-confirm-sign-up --region local --user-pool-id ${user_pool_id} --username b61da2e1-0ad1-4e5e-a5cd-84c901e79fd0`

