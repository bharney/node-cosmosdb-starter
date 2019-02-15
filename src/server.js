import { ApolloServer } from 'apollo-server'
import { loadTypeSchema } from './utils/schema'
import { authenticate } from './utils/auth'
import { merge } from 'lodash'
import mongoose from 'mongoose'
import product from './types/product/product.resolvers'
import coupon from './types/coupon/coupon.resolvers'
import user from './types/user/user.resolvers'
import config from './config'
const types = ['product', 'coupon', 'user']

export const start = async (connectionString) => {
  const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
  `
  const schemaTypes = await Promise.all(types.map(loadTypeSchema))

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, product, coupon, user),
    async context({ req }) {
      const user = await authenticate(req)
      return { user }
    }
  })

  await mongoose.connect(connectionString)
  const { url } = await server.listen({ port: config.port })

  console.log(`GQL server ready at ${url}`)
}
