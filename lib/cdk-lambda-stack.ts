import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Duration } from "aws-cdk-lib";

export class CdkLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // API Gateway
    const api = new apigateway.RestApi(this, "RemoteSchemaApi", {
      description: "Remote Schema ApiGateway",
      defaultCorsPreflightOptions: {
        allowHeaders: ["*"],
        allowMethods: ["*"],
        allowOrigins: ["*"],
      },
    });

    // � create an Output for the API URL
    new cdk.CfnOutput(this, "ApiGateway URL", { value: api.url });

    const remoteSchemaFunction = new lambda.Function(
      this,
      "RemoteSchemaFunction2",
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: "remote_schema/index.main",
        code: lambda.Code.fromAsset("./handlers"),
        timeout: Duration.seconds(30),
      }
    );

    const gql = api.root.addResource("gql");
    gql.addMethod(
      "Any",
      new apigateway.LambdaIntegration(remoteSchemaFunction)
    );
  }
}
