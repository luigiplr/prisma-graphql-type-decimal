var generatorBuild = require('@prisma/client/generator-build');
var graphql = require('graphql');

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
    return new generatorBuild.Prisma.Decimal(value);
  },
  parseLiteral(ast) {
    if (ast.kind === graphql.Kind.INT || ast.kind === graphql.Kind.FLOAT || ast.kind === graphql.Kind.STRING) {
      return new generatorBuild.Prisma.Decimal(ast.value);
    }
    // eslint-disable-next-line unicorn/no-null
    return null;
  }
};
const GraphQLDecimal = new graphql.GraphQLScalarType(config);
function createDecimalFromObject(object) {
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return Object.create(generatorBuild.Prisma.Decimal.prototype, {
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

exports.GraphQLDecimal = GraphQLDecimal;
exports.createDecimalFromObject = createDecimalFromObject;
exports.transformToDecimal = transformToDecimal;
