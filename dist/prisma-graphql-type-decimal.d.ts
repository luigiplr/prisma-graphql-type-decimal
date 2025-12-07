import { Prisma } from '@prisma/client/generator-build';
import { GraphQLScalarType } from 'graphql';
export declare const GraphQLDecimal: GraphQLScalarType<any, string>;
export declare function createDecimalFromObject(object: any): Prisma.Decimal;
interface TransformFunctionParams {
    value: any;
}
export declare function transformToDecimal({ value }: TransformFunctionParams): any;
export {};
