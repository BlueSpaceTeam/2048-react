/*
 * @Author: fantiga
 * @Date: 2022-06-30 17:45:43
 * @LastEditTime: 2022-06-30 17:45:44
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/react/types/json.d.ts
 */

// This will allow you to load `.json` files from disk
declare module "*.json" {
    const value: any;
    export default value;
}

// This will allow you to load JSON from remote URL responses
declare module "json!*" {
    const value: any;
    export default value;
}