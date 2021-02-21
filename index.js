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
    type Mutation {
        updateCourseTopic(id:Int, topic:String):Course
    }
    type Course{
        id:Int
        title:String
        author:String
        topic:String
        url:String
    }
`);
/*
 * Mutation: Permite alterar los datos
 * Query: Consultas par obtener datos
 * Esquema de un objeto que puede devolver 
*/


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
let updateCourseTopic = ({id,topic})=>{
    courses.map(course=>{
        if(course.id == id){
            course.topic = topic
            return course;
        }
    });
    return courses.filter(course => course.id === id)[0];
}

// Sirve para establecer a que puede consultar desde nuestros datos
const root = {
    message:()=>'hello world',
    course:getCourse,
    courses:getCourses,
    updateCourseTopic:updateCourseTopic
}

// Creacion de una ruta unica para obtener los datos
app.use('/graphql', graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true // Interfaz grafica que permite visualizar los datos
}));

app.listen(5000,()=>console.log('Servidor en el puerto 5000'))