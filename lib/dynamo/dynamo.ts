
import  {AttributeType, BillingMode, ITable, Table} from 'aws-cdk-lib/aws-dynamodb';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';


export class DynamoDB extends Construct {
    public readonly narutoTable: ITable;

    constructor(scope: Construct , id:string ){
        super(scope, id);
    
        this.narutoTable = this.createNarutoTable();
        
      }

private createNarutoTable(){
    const narutoTable = new Table(this, 'narutoTable', {
        partitionKey: { name: 'shinobiId', type: AttributeType.STRING },
        tableName: 'narutoTable',
        removalPolicy: RemovalPolicy.DESTROY,
        billingMode: BillingMode.PAY_PER_REQUEST,
    })
    return narutoTable;

    }

}
