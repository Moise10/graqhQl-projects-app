const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const app = express()
require('dotenv').config()
const schema = require('./schema/schema')
const connectDB = require('./config/db')
const colors = require('colors')



app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		// rootValue: root,
		graphiql: process.env.NODE_ENV === 'development',
	})
); 


const port = process.env.PORT || 5000;

const start =  async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server runing on port ${port}`));
  } catch (error) {
    console.log(error.message)
  }
}

start()