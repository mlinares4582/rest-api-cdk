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
    

    const apigw = new LambdaRestApi(this, 'narutoApi', {
      restApiName: 'Naruto Classification',
      handler: narutoClassification,
      proxy: false
    });
    apigw.root.addMethod('GET');

    const naruto = apigw.root.addResource('naruto');
    naruto.addMethod('GET'); // GET /clan
    naruto.addMethod('POST');  // POST /clan
    
    const singleShinobi = naruto.addResource('{id}'); // Shinobi/{id}
    singleShinobi.addMethod('GET'); // GET /Shinobi/{id}
    singleShinobi.addMethod('PUT'); // PUT /Shinobi/{id}
    singleShinobi.addMethod('DELETE'); // DELETE /Shinobi/{id}
  }

   }

