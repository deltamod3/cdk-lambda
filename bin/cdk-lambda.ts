#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkLambdaStack } from "../lib/cdk-lambda-stack";

const app = new cdk.App();
new CdkLambdaStack(app, "CdkLambdaStack", {
  multiAz: true,
  appName: "distroplaypen",
  hasuraUrl: "https://gql.playpen01.distro.energy",
  hasuraHostname: "gql.playpen01.distro.energy",
  hasuraAdminSecret: "C4nY0uGu3ssM3",
  region: "eu-west-1",
  hostedZoneId: "Z0491312352QGOMK32CC5",
  hostedZoneName: "playpen01.distro.energy",
  lambdasHostname: "actions.playpen01.distro.energy",
  gql_remote_schema: "https://actions.playpen01.distro.energy/gql",
});
