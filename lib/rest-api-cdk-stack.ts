import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DynamoDB } from './dynamo/dynamo';
import { Lambdas } from './lambdas/lambdas';
import { ApiGateway } from './apigateway/apigateway';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class RestApiCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const database = new DynamoDB(this, "DynamoDB");

    const narutoClassificationLambda =new Lambdas(this, "NarutoClassification", {
      narutoTable: database.narutoTable
  })

    const apigateway = new ApiGateway(this, "ApiGateway", {
      narutoClassification: narutoClassificationLambda.narutoFunction
  })
  }
}
