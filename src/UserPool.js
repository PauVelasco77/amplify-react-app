import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: " us-east-1_ldt8fRJKg",
  ClientId: "2u516jsdqaki2tubrsp6c9gi7s",
};

export default new CognitoUserPool(poolData);
