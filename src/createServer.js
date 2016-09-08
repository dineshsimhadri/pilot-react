import express from 'express'

const PORT = 3000;

export default function createServer({middleware, routes, render}) {
  const server = express();

  // Bootstrap middleware
  if(middleware.length > 1) {
    for(let i=0; i<middleware.length;i++) {
      server.use(middleware[i])
    }
  }

  // Never use listen, use start instead
  server._listen = server.listen
  server.listen = () => {
    throw new Error('Do not call `server.listen()`, use `server.start()`')
  }

  // Define the start method on server
  server.start = () => {
    // Match routes here
    server.get('/', (req, res) => {
      res.send('Hello World')
    })
    // Start ilstening on PORT
    server._listen(PORT, () => {
      console.log(`Express server listening on ${PORT}`)
    })
  }

  return server
}
