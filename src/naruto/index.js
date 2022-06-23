import {
    DeleteItemCommand,
    GetItemCommand,
    PutItemCommand,
    ScanCommand,
    UpdateItemCommand
  } from "@aws-sdk/client-dynamodb";
  import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
  import { ddbClient } from "./ddbClient";
  import { v4 as uuidv4 } from "uuid";



  exports.handler = async function (event) {
    console.log("request", JSON.stringify(event, undefined, 2));
  

    try {
      switch (event.httpMethod) {
        case "GET":
            body = await getShinobi(event.pathParameters.id);
        //   if(event.queryStringParameters != null) {
        //     body = await getShinobiByTeam(event); // GET product/1?team= Team7
        //   }
        //  if (event.pathParameters != null) {
        //     body = await getShinobi(event.pathParameters.id); // GET shinobi/{id}
        //   }
        //  else {
        //     body = await getAllShinobis(); // GET shinobis
        //   }
          break;
        // case "POST":
        //   body = await createShinobi(event); // POST /product
        //   break;
        // case "DELETE":
        //   body = await deleteShinobi(event.pathParameters.id); // DELETE /shinobi/{id}
        //   break;
        // case "PUT":
        //     body = await updateShinobi(event); // PUT /shinobi/{id}
        //   break;
        default:
          throw new Error(`Unsupported route: "${event.httpMethod}"`);
      }
  
      console.log(body);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `Successfully finished operation: "${event.httpMethod}"`,
          body: body
        })
      };
  
    } catch (e) {
      console.error(e);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Failed to perform operation.",
          errorMsg: e.message,
          errorStack: e.stack,
        })
      };
    }
  };
  
    const getShinobi = async (shinobiId) => {
      console.log("getShinobi");
  
      try {
        const params = {
          TableName: process.env.TABLE_NAME,
          Key: marshall({ id: shinobiId }),
        };
  
        const { Item } = await ddbClient.send(new GetItemCommand(params));
        console.log(Item);
        return Item ? unmarshall(Item) : {};
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    // const getAllShinobis = async () => {
    //   console.log("getAllShinobis");
  
    //   try {
    //     const params = {
    //       TableName: process.env.TABLE_NAME,
    //     };
  
    //     const { Items } = await ddbClient.send(new ScanCommand(params));
    //     console.log(Items);
    //     return Items ? Items.map((item) => unmarshall(item)) : {};
    //   } catch (error) {
    //     console.error(error);
    //     throw error;
    //   }
    // };
    // const createShinobi = async (event) => {
    //   console.log(`create Shinobi funcion :${event}`);
  
    //   const productRequest = JSON.parse(event.body);
    //   //set shinobiId
  
    //   const shinobiId = uuidv4();
    //   productRequest.id = shinobiId;
  
    //   try {
    //     const params = {
    //       TableName: process.env.TABLE_NAME,
    //       Item: marshall(productRequest || {}),
    //     };
  
    //     const createResult = await ddbClient.send(new PutItemCommand(params));
    //     console.log(createResult);
    //     return createResult;
    //   } catch (error) {
    //     console.error(error);
    //     throw error;
    //   }
    // };
    // const deleteShinobi = async (shinobiId) => {
    //   console.log(`deleteShinobi function shinobiId: ${shinobiId}`);
  
    //   try {
    //     const params = {
    //       TableName: process.env.TABLE_NAME,
    //       Key: marshall({ id: shinobiId }),
    //     };
  
    //     const deleteResult = await ddbClient.send(new DeleteItemCommand(params));
    //     console.log(deleteResult);
    //     return deleteResult;
    //   } catch (error) {
    //     console.error(error);
    //     throw error;
    //   }
    // };
    // const updateShinobi = async (event) => {
    //   console.log(`updateShinobi function. event : "${event}"`);
    //   try {
    //     const requestBody = JSON.parse(event.body);
    //     const objKeys = Object.keys(requestBody);
    //     console.log(`updateShinobi function. requestBody : "${requestBody}", objKeys: "${objKeys}"`);    
    
    //     const params = {
    //       TableName: process.env.TABLE_NAME,
    //       Key: marshall({ id: event.pathParameters.id }),
    //       UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
    //       ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
    //           ...acc,
    //           [`#key${index}`]: key,
    //       }), {}),
    //       ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) => ({
    //           ...acc,
    //           [`:value${index}`]: requestBody[key],
    //       }), {})),
    //     };
    
    //     const updateResult = await ddbClient.send(new UpdateItemCommand(params));
    
    //     console.log(updateResult);
    //     return updateResult;
    //   } catch(e) {
    //     console.error(e);
    //     throw e;
    //   }
    
    // }
    // const getShinobiByTeam = async (event) => {
    //   console.log("getShinobiByTeam");
    //   try {
    //     // GET product/1?team=
    //     const shinobiId = event.pathParameters.id;
    //     const team = event.queryStringParameters.team;
    
    //     const params = {
    //       KeyConditionExpression: "id = :shinobiId",
    //       FilterExpression: "contains (team, :team)",
    //       ExpressionAttributeValues: {
    //         ":shinobiId": { S: shinobiId },
    //         ":team": { S: team }
    //       },      
    //       TableName: process.env.TABLE_NAME
    //     };
    
    //     const { Items } = await ddbClient.send(new QueryCommand(params));
    
    //     console.log(Items);
    //     return Items.map((item) => unmarshall(item));
    //   } catch(e) {
    //     console.error(e);
    //     throw e;
    //   }
    // }