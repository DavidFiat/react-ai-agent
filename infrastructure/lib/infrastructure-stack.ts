import { Stack, StackProps, aws_elasticbeanstalk as eb, aws_iam as iam, aws_s3_assets as s3assets } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const appName = 'agent-beanstalk-app';
    const envName = 'agent-env';

    const app = new eb.CfnApplication(this, 'Application', {
      applicationName: appName,
    });

    const role = new iam.Role(this, 'EBInstanceRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'),
      ],
    });

    const instanceProfile = new iam.CfnInstanceProfile(this, 'InstanceProfile', {
      roles: [role.roleName],
    });

    const appZip = new s3assets.Asset(this, 'AppZip', {
      path: path.join(__dirname, '../../agent'),
    });

    const appVersion = new eb.CfnApplicationVersion(this, 'AppVersion', {
      applicationName: appName,
      sourceBundle: {
        s3Bucket: appZip.s3BucketName,
        s3Key: appZip.s3ObjectKey,
      },
    });

    appVersion.addDependsOn(app);


    new eb.CfnEnvironment(this, 'Environment', {
      environmentName: envName,
      applicationName: appName,
      solutionStackName: '64bit Amazon Linux 2023 v6.6.1 running Node.js 18',
      versionLabel: appVersion.ref,
      optionSettings: [
        {
          namespace: 'aws:autoscaling:launchconfiguration',
          optionName: 'IamInstanceProfile',
          value: instanceProfile.ref,
        },
        {
          namespace: 'aws:elasticbeanstalk:environment',
          optionName: 'EnvironmentType',
          value: 'LoadBalanced',
        },
        {
          namespace: 'aws:elasticbeanstalk:application:environment',
          optionName: 'GH_TOKEN',
          value: process.env.GH_TOKEN || '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',
        },
        {
          namespace: 'aws:elasticbeanstalk:application:environment',
          optionName: 'GH_USER',
          value: process.env.GH_USER || 'DavidFiat',
        },
        {
          namespace: 'aws:elasticbeanstalk:application:environment',
          optionName: 'GH_REPO',
          value: process.env.GH_REPO || 'react-ai-agent',
        },
        {
          namespace: 'aws:elasticbeanstalk:application:environment',
          optionName: 'LINEAR_API_KEY',
          value: process.env.LINEAR_API_KEY || 'lin_api_vFx9SyCBfFmimsmDvULM4T5BPVnSA7VW4aRzafBf',
        },
          {
          namespace: 'aws:elbv2:listener:443',
          optionName: 'ListenerEnabled',
          value: 'true',
        },
        {
          namespace: 'aws:elbv2:listener:443',
          optionName: 'Protocol',
          value: 'HTTPS',
        },
        {
          namespace: 'aws:elbv2:listener:443',
          optionName: 'SSLCertificateArns',
          value: 'arn:aws:acm:us-east-1:327023252123:certificate/032e9c45-3f60-473f-ac5b-18b3e141634f',
        },
      ],
    });
  }
}
