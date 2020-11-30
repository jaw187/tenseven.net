const fastify = require('fastify')()
const { ApolloServer } = require('apollo-server-fastify')
const graph = require('./graph')


const apolloServer = new ApolloServer({
    ...graph,
    playground: true
})

fastify
  .register(apolloServer.createHandler())
  .register(require('fastify-nextjs'), { dev: true })
  .after(() => {
    fastify.next('/hello')
  })
  .listen(3000, err => {
    if (err) throw err
    console.log('Server listening on http://localhost:3000')
  })
