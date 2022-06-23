import { Construct } from "constructs";
import { NodejsFunction,  } from 'aws-cdk-lib/aws-lambda-nodejs';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';


interface ApiGatewayProps {
    narutoClassification: IFunction,
  }

export class ApiGateway extends Construct {  
  
    public readonly narutoFuntion: NodejsFunction;
  
    constructor(scope: Construct , id:string,props: ApiGatewayProps ){
      super(scope, id);
  
       // Product api gateway
       this.createNarutoApi(props.narutoClassification);

  
    }


private createNarutoApi(narutoClassification: IFunction) {
    // Product microservices api gateway
    // root name = product

    // GET /product
    // POST /product

    // Single product with id parameter
    // GET /product/{id}
    // PUT /product/{id}
    // DELETE /product/{id}

    const apigw = new LambdaRestApi(this, 'narutoApi', {
      restApiName: 'Naruto Classification',
      handler: narutoClassification,
      proxy: false
    });

    const clan = apigw.root.addResource('shinobi');
    clan.addMethod('GET'); // GET /clan
    clan.addMethod('POST');  // POST /clan
    
    const singleShinobi = clan.addResource('{id}'); // Shinobi/{id}
    singleShinobi.addMethod('GET'); // GET /Shinobi/{id}
    singleShinobi.addMethod('PUT'); // PUT /Shinobi/{id}
    singleShinobi.addMethod('DELETE'); // DELETE /Shinobi/{id}
  }

   }

