# Steps to run the project

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`

# User data

The user data is stored in the `src/data/users.json` file.


 ⏳  Bootstrapping environment aws://327023252123/us-east-1...
Trusted accounts for deployment: (none)
Trusted accounts for lookup: (none)
Using default execution policy of 'arn:aws:iam::aws:policy/AdministratorAccess'. Pass '--cloudformation-execution-policies' to customize.
CDKToolkit: creating CloudFormation changeset...
CDKToolkit |  0/12 | 3:00:36 AM | REVIEW_IN_PROGRESS   | AWS::CloudFormation::Stack | CDKToolkit User Initiated
CDKToolkit |  0/12 | 3:00:42 AM | CREATE_IN_PROGRESS   | AWS::CloudFormation::Stack | CDKToolkit User Initiated
CDKToolkit |  0/12 | 3:00:45 AM | CREATE_IN_PROGRESS   | AWS::S3::Bucket            | StagingBucket 
CDKToolkit |  0/12 | 3:00:45 AM | CREATE_IN_PROGRESS   | AWS::ECR::Repository       | ContainerAssetsRepository 
CDKToolkit |  0/12 | 3:00:45 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role             | ImagePublishingRole 
CDKToolkit |  0/12 | 3:00:45 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role             | FilePublishingRole 
CDKToolkit |  0/12 | 3:00:45 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role             | CloudFormationExecutionRole 
CDKToolkit |  0/12 | 3:00:45 AM | CREATE_IN_PROGRESS   | AWS::SSM::Parameter        | CdkBootstrapVersion 
CDKToolkit |  0/12 | 3:00:45 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role             | LookupRole 
CDKToolkit |  0/12 | 3:00:45 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role             | ImagePublishingRole Resource creation Initiated
CDKToolkit |  0/12 | 3:00:45 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role             | FilePublishingRole Resource creation Initiated
CDKToolkit |  0/12 | 3:00:45 AM | CREATE_IN_PROGRESS   | AWS::SSM::Parameter        | CdkBootstrapVersion Resource creation Initiated
CDKToolkit |  0/12 | 3:00:45 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role             | CloudFormationExecutionRole Resource creation Initiated
CDKToolkit |  0/12 | 3:00:45 AM | CREATE_IN_PROGRESS   | AWS::ECR::Repository       | ContainerAssetsRepository Resource creation Initiated
CDKToolkit |  0/12 | 3:00:46 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role             | LookupRole Resource creation Initiated
CDKToolkit |  1/12 | 3:00:46 AM | CREATE_COMPLETE      | AWS::SSM::Parameter        | CdkBootstrapVersion 
CDKToolkit |  1/12 | 3:00:46 AM | CREATE_IN_PROGRESS   | AWS::S3::Bucket            | StagingBucket Resource creation Initiated
CDKToolkit |  2/12 | 3:00:46 AM | CREATE_COMPLETE      | AWS::ECR::Repository       | ContainerAssetsRepository 
CDKToolkit |  3/12 | 3:01:00 AM | CREATE_COMPLETE      | AWS::S3::Bucket            | StagingBucket 
CDKToolkit |  3/12 | 3:01:01 AM | CREATE_IN_PROGRESS   | AWS::S3::BucketPolicy      | StagingBucketPolicy 
CDKToolkit |  3/12 | 3:01:03 AM | CREATE_IN_PROGRESS   | AWS::S3::BucketPolicy      | StagingBucketPolicy Resource creation Initiated
CDKToolkit |  4/12 | 3:01:03 AM | CREATE_COMPLETE      | AWS::IAM::Role             | ImagePublishingRole 
CDKToolkit |  5/12 | 3:01:03 AM | CREATE_COMPLETE      | AWS::IAM::Role             | FilePublishingRole
CDKToolkit |  6/12 | 3:01:03 AM | CREATE_COMPLETE      | AWS::S3::BucketPolicy      | StagingBucketPolicy
CDKToolkit |  7/12 | 3:01:03 AM | CREATE_COMPLETE      | AWS::IAM::Role             | CloudFormationExecutionRole
CDKToolkit |  8/12 | 3:01:04 AM | CREATE_COMPLETE      | AWS::IAM::Role             | LookupRole
CDKToolkit |  8/12 | 3:01:04 AM | CREATE_IN_PROGRESS   | AWS::IAM::Policy           | FilePublishingRoleDefaultPolicy
CDKToolkit |  8/12 | 3:01:04 AM | CREATE_IN_PROGRESS   | AWS::IAM::Policy           | ImagePublishingRoleDefaultPolicy 
CDKToolkit |  8/12 | 3:01:04 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role             | DeploymentActionRole 
CDKToolkit |  8/12 | 3:01:04 AM | CREATE_IN_PROGRESS   | AWS::IAM::Policy           | FilePublishingRoleDefaultPolicy Resource creation Initiated
CDKToolkit |  8/12 | 3:01:05 AM | CREATE_IN_PROGRESS   | AWS::IAM::Policy           | ImagePublishingRoleDefaultPolicy Resource creation Initiated
CDKToolkit |  8/12 | 3:01:05 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role             | DeploymentActionRole Resource creation Initiated
CDKToolkit |  9/12 | 3:01:20 AM | CREATE_COMPLETE      | AWS::IAM::Policy           | FilePublishingRoleDefaultPolicy 
CDKToolkit | 10/12 | 3:01:20 AM | CREATE_COMPLETE      | AWS::IAM::Policy           | ImagePublishingRoleDefaultPolicy 
CDKToolkit | 11/12 | 3:01:22 AM | CREATE_COMPLETE      | AWS::IAM::Role             | DeploymentActionRole 
CDKToolkit | 12/12 | 3:01:24 AM | CREATE_COMPLETE      | AWS::CloudFormation::Stack | CDKToolkit 
 ✅  Environment aws://327023252123/us-east-1 bootstrapped.