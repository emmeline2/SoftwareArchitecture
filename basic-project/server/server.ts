import  {MockData}  from "./db";
import fastify, {RequestGenericInterface} from "fastify";
import cors from '@fastify/cors';


const server = fastify()

//setup CORS - this will be necessary for API requests from a VUE or any SPA app 
server.register(cors, {
    origin: "*"
})

server.get('/repos', async (request, reply) => {
  return MockData;
})

//If you want to pass a parameter like /student/123 setup an interface
//for the parameter
interface requestId extends RequestGenericInterface {
    Params: {
      id: string
    }
}
//Now in the .get make sure you stereotype the request <requestId> and
//then you can get the parameter like in the second line with const
//thus /student/123 will pull 123 out of the constant
server.get<requestId>('/repos/:id', async (request, reply) => {
    const { id } = request.params;
    const repo = MockData.find(element => element.repoID == id);
    if (repo) {
        return repo;
    } else {
        let errObj = {error: `The repo with id = ${id} was not found`};
        reply.code(404).send(errObj);
        return
    }
  })


//If you want to pass a parameter like /student/123 setup an interface
//for the parameter
interface requestQry extends RequestGenericInterface {
    Querystring: {
      id: string,
      name: string
    }
}

//Now in the .get make sure you stereotype the request <requestId> and
//then you can get the parameter like in the second line with const
//thus /student/123 will pull 123 out of the constant
server.get<requestQry>('/search', async (request, reply) => {
    const { id,name } = request.query;
    
    if (id){
        const repo = MockData.find(element => element.repoID == id);
        if (repo) {
            return [repo];
        } else {
            let errObj = {error: `The student with student id = ${id} was not found`};
            reply.code(404).send(errObj);
            return
        }
    }else if (name){
        const repos = MockData.filter(element => element.name == name);
        if (repos.length > 0) {
            return repos;
        } else {
            let errObj = {error: `No repos were found with name = ${name}`};
            reply.code(404).send(errObj);
            return
        }
    }else {
        let errObj = {error: "The /search API requires an id or name parameter"};
        reply.code(400).send(errObj);
        return
    }
  })

server.listen({ port: 9500 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})