const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Data
const { courses }=require('./data.json');

// Establecemos el tipo de consulta que se puede realizar
const schema = buildSchema(`
    type Query{
        course(id:Int!):Course
        courses(topic:String):[Course]
    }
    type Course{
        id:Int
        title:String
        author:String
        topic:String
        url:String
    }
`);

let getCourse =(args)=>{
    let id = args.id;
    return courses.filter(course=>{
        return course.id==id;
    })[0]
}

let getCourses =(args)=>{
    if(args.topic){
        let topic = args.topic;
        return courses.filter(course=>{
            return course.topic===topic;
        })
    }else{
        return courses;
    }

}

// Sirve para establecer a que puede consultar desde nuestros datos
const root = {
    message:()=>'hello world',
    course:getCourse,
    courses:getCourses
}

// Creacion de una ruta unica para obtener los datos
app.use('/graphql', graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true // Interfaz grafica que permite visualizar los datos
}));

app.listen(5000,()=>console.log('Servidor en el puerto 5000'))