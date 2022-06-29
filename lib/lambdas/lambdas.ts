import {  ITable,  } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from "constructs";
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
// import { join } from 'path';
// import path = require('path');

interface LambdasProps {
    
    narutoTable: ITable;
}

export class Lambdas extends Construct{
    public readonly narutoFunction: NodejsFunction;
   

    constructor(scope: Construct , id:string,props: LambdasProps ){
        super(scope, id);
    
         this.narutoFunction = this.createNarutoFunction(props.narutoTable);
    
      }


private createNarutoFunction(narutoTable: ITable): NodejsFunction{
    
    const narutoLambda = new NodejsFunction(this,'NarutoLambdaNodeFunction',{
        // entry: join(__dirname, '/../../src/naruto/index.js'),
        entry: 'index.js',
        functionName: "narutoLambda",
        bundling:{
        externalModules:[
            'aws-sdk'
        ]
        },
        environment:{
        PRIMARY_KEY : 'shinobiId',
        TABLE_NAME: narutoTable.tableName
        }
      });

    narutoTable.grantReadWriteData(narutoLambda)


    return narutoLambda;
    }
}




