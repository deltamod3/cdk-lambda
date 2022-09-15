import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Duration, StackProps } from "aws-cdk-lib";
import { CognitoConstruct } from "./cognito";

interface ApplicationStackProps extends StackProps {
  multiAz: boolean;
  appName: string;
  hasuraUrl: string;
  hasuraHostname: string;
  hasuraAdminSecret: string;
  region: string;
  hostedZoneId: string;
  hostedZoneName: string;
  lambdasHostname: string;
  gql_remote_schema : string;
}

export class CdkLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ApplicationStackProps) {
    super(scope, id, props);
    const {
      appName,
      hasuraUrl,
      hasuraHostname,
      hasuraAdminSecret,
      region,
      hostedZoneId,
      hostedZoneName,
      lambdasHostname,
      gql_remote_schema,
    } = props;

    // Cognito
    new CognitoConstruct(this, "Cognito", {
      region,
      appName,
      hasuraUrl,
      hasuraAdminSecret
    })

    // API Gateway
    const api = new apigateway.RestApi(this, "RemoteSchemaApi", {
      description: "Remote Schema ApiGateway",
      defaultCorsPreflightOptions: {
        allowHeaders: ["*"],
        allowMethods: ["*"],
        allowOrigins: ["*"],
      },
    });

    // Create an Output for the API URL
    new cdk.CfnOutput(this, "ApiGateway URL", { value: api.url });

    // Create lambda function
    const remoteSchemaFunction = new lambda.Function(
      this,
      "RemoteSchemaFunction2",
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: "handlers/remote_schema/index.main",
        code: lambda.Code.fromAsset("src"),
        timeout: Duration.seconds(30),
      }
    );

    // Add API route, and add event to the lambda function
    const gql = api.root.addResource("gql");
    gql.addMethod(
      "Any",
      new apigateway.LambdaIntegration(remoteSchemaFunction)
    );
  }
}
