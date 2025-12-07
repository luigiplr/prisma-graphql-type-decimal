import { Prisma } from '@prisma/client/generator-build';
import { GraphQLScalarType, Kind } from 'graphql';

const config = {
  name: 'Decimal',
  description: 'An arbitrary-precision Decimal type',
  /**
   * Value sent to the client
   */
  serialize(value) {
    // console.log('serialize value', value.constructor.name);
    return String(value);
  },
  /**
   * Value from the client
   */
  parseValue(value) {
    return new Prisma.Decimal(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT || ast.kind === Kind.STRING) {
      return new Prisma.Decimal(ast.value);
    }
    // eslint-disable-next-line unicorn/no-null
    return null;
  }
};
const GraphQLDecimal = new GraphQLScalarType(config);
function createDecimalFromObject(object) {
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return Object.create(Prisma.Decimal.prototype, {
    d: {
      value: object.d
    },
    e: {
      value: object.e
    },
    s: {
      value: object.s
    }
  });
}
function transformToDecimal({
  value
}) {
  if (value == null) return value;
  return Array.isArray(value) ? value.map(createDecimalFromObject) : createDecimalFromObject(value);
}

export { GraphQLDecimal, createDecimalFromObject, transformToDecimal };
