# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template



PS C:\Users\david\Desktop\react-ai-agent\infrastructure> cdk deploy
[WARNING] aws-cdk-lib.CfnResource#addDependsOn is deprecated.
  use addDependency
  This API will be removed in the next major release.

✨  Synthesis time: 6.28s

InfraStack: start: Building InfraStack Template
InfraStack: success: Built InfraStack Template
InfraStack: start: Publishing InfraStack Template (327023252123-us-east-1-6dea70ab)
InfraStack: success: Published InfraStack Template (327023252123-us-east-1-6dea70ab)
InfraStack: deploying... [1/1]
InfraStack: creating CloudFormation changeset...
InfraStack | 0/7 | 9:33:20 AM | REVIEW_IN_PROGRESS   | AWS::CloudFormation::Stack                | InfraStack User Initiated
InfraStack | 0/7 | 9:33:26 AM | CREATE_IN_PROGRESS   | AWS::CloudFormation::Stack                | InfraStack User Initiated
InfraStack | 0/7 | 9:33:28 AM | CREATE_IN_PROGRESS   | AWS::CDK::Metadata                        | CDKMetadata/Default (CDKMetadata) 
InfraStack | 0/7 | 9:33:29 AM | CREATE_IN_PROGRESS   | AWS::ElasticBeanstalk::Application        | Application 
InfraStack | 0/7 | 9:33:29 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role                            | EBInstanceRole (EBInstanceRole39A5DE3A)     
InfraStack | 0/7 | 9:33:29 AM | CREATE_IN_PROGRESS   | AWS::CDK::Metadata                        | CDKMetadata/Default (CDKMetadata) Resource creation Initiated
InfraStack | 0/7 | 9:33:29 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role                            | EBInstanceRole (EBInstanceRole39A5DE3A) Resource creation Initiated
InfraStack | 1/7 | 9:33:29 AM | CREATE_COMPLETE      | AWS::CDK::Metadata                        | CDKMetadata/Default (CDKMetadata)
InfraStack | 1/7 | 9:33:30 AM | CREATE_IN_PROGRESS   | AWS::ElasticBeanstalk::Application        | Application Resource creation Initiated     
InfraStack | 1/7 | 9:33:31 AM | CREATE_IN_PROGRESS   | AWS::ElasticBeanstalk::Application        | Application Eventual consistency check initiated
InfraStack | 2/7 | 9:33:36 AM | CREATE_COMPLETE      | AWS::ElasticBeanstalk::Application        | Application 
InfraStack | 2/7 | 9:33:36 AM | CREATE_IN_PROGRESS   | AWS::ElasticBeanstalk::ApplicationVersion | AppVersion 
InfraStack | 2/7 | 9:33:37 AM | CREATE_IN_PROGRESS   | AWS::ElasticBeanstalk::ApplicationVersion | AppVersion Resource creation Initiated      
InfraStack | 2/7 | 9:33:38 AM | CREATE_IN_PROGRESS   | AWS::ElasticBeanstalk::ApplicationVersion | AppVersion Eventual consistency check initiated
InfraStack | 3/7 | 9:33:43 AM | CREATE_COMPLETE      | AWS::ElasticBeanstalk::ApplicationVersion | AppVersion 
InfraStack | 4/7 | 9:33:46 AM | CREATE_COMPLETE      | AWS::IAM::Role                            | EBInstanceRole (EBInstanceRole39A5DE3A) 
InfraStack | 4/7 | 9:33:46 AM | CREATE_IN_PROGRESS   | AWS::IAM::InstanceProfile                 | InstanceProfile 
InfraStack | 4/7 | 9:33:47 AM | CREATE_IN_PROGRESS   | AWS::IAM::InstanceProfile                 | InstanceProfile Resource creation Initiated 
InfraStack | 4/7 | 9:33:48 AM | CREATE_IN_PROGRESS   | AWS::IAM::InstanceProfile                 | InstanceProfile Eventual consistency check initiated
InfraStack | 4/7 | 9:33:48 AM | CREATE_IN_PROGRESS   | AWS::ElasticBeanstalk::Environment        | Environment 
InfraStack | 4/7 | 9:33:51 AM | CREATE_IN_PROGRESS   | AWS::ElasticBeanstalk::Environment        | Environment Resource creation Initiated
InfraStack | 5/7 | 9:35:58 AM | CREATE_COMPLETE      | AWS::IAM::InstanceProfile                 | InstanceProfile 
InfraStack | 6/7 | 9:37:54 AM | CREATE_COMPLETE      | AWS::ElasticBeanstalk::Environment        | Environment 
InfraStack | 7/7 | 9:37:54 AM | CREATE_COMPLETE      | AWS::CloudFormation::Stack                | InfraStack 

 ✅  InfraStack

✨  Deployment time: 283.52s

Stack ARN:
arn:aws:cloudformation:us-east-1:327023252123:stack/InfraStack/4def5bf0-6e1b-11f0-b15d-0affe11aba53

✨  Total time: 289.8s