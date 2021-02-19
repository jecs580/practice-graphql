const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');


// Establecemos el tipo de consulta que se puede realizar
const schema = buildSchema(`
    type Query{
        message:String
    }
`);

// Sirve para establecer a que puede consultar desde nuestros datos
const root = {
    message:()=>'hello world',
}

// Creacion de una ruta unica para obtener los datos
app.use('/graphql', graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true // Interfaz grafica que permite visualizar los datos
}));

app.listen(5000,()=>console.log('Servidor en el puerto 5000'))