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

    // Create an Output for the API URL
    new cdk.CfnOutput(this, "ApiGateway URL", { value: api.url });

    // Create Javascript lambda function
    const jsRemoteSchemaFunction = new lambda.Function(
      this,
      "JSRemoteSchemaFunction",
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: "remote_schema/index.main",
        code: lambda.Code.fromAsset("src/javascript"),
        timeout: Duration.seconds(30),
      }
    );

    // Add API route, and add event to the lambda function
    const jsRoute = api.root.addResource("javascript").addResource("gql");
    jsRoute.addMethod(
      "Any",
      new apigateway.LambdaIntegration(jsRemoteSchemaFunction)
    );

    // Create Python lambda function
    const pythonRemoteSchemaFunction = new lambda.Function(
      this,
      "PythonRemoteSchemaFunction",
      {
        runtime: lambda.Runtime.PYTHON_3_8,
        handler: "app/main.handler",
        code: lambda.Code.fromAsset("src/python"),
        timeout: Duration.seconds(30),
      }
    );

    // Add API route, and add event to the lambda function
    const pythonRoute = api.root.addResource("python").addResource("gql");
    pythonRoute.addMethod(
      "Any",
      new apigateway.LambdaIntegration(pythonRemoteSchemaFunction)
    );
    pythonRoute.addProxy({
      defaultIntegration: new apigateway.LambdaIntegration(
        pythonRemoteSchemaFunction
      ),
      anyMethod: true,
    });
  }
}
