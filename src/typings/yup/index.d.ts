import { StringSchema, DateSchemaConstructor } from "yup";
import * as Yup from 'yup';

declare module "yup" {
    interface StringSchema {
        nationalCode(message: string): StringSchema ;
        mobileNumber(message:string) : StringSchema ;
    }
}






