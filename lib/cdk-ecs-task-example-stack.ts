import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';

export class CdkEcsTaskExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', {
      isDefault: true,
    });

    // ECS
    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc,
      clusterName: 'cdk-example-cluster',
    });

    // TaskDefinition
    const fargateTaskDefinition = new ecs.FargateTaskDefinition(
      this,
      'FargateTaskDefinition',
      {
        family: 'cdk-example-task-definition',
      }
    );
    fargateTaskDefinition.addContainer('APP', {
      image: ecs.ContainerImage.fromRegistry('debian:bullseye-slim'),
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'ecs',
      }),
    });
  }
}
