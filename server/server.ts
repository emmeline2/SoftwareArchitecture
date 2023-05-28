import fastify, {RequestGenericInterface} from "fastify";
import fastifyHttpProxy from "@fastify/http-proxy";
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import {GetGHProxySecureOptions, GetGHProxyOptions } from "./proxy";

dotenv.config();
const server = fastify()

let proxyOptsSecure = GetGHProxySecureOptions(process.env.GH_ACCESS_TOKEN)
server.register(fastifyHttpProxy, proxyOptsSecure)

let proxyOpts = GetGHProxyOptions()
server.register(fastifyHttpProxy, proxyOpts)

//setup CORS - this will be necessary for API requests from a VUE or any SPA app 
server.register(cors, {
    origin: "*"
})


server.get('/repos', async (request, reply) => { 
  try {
    const response = await fetch(`https://api.github.com/users/emmeline2/repos`, {
      headers: {
        Authorization: `Bearer ${process.env.GH_ACCESS_TOKEN}`,
        'User-Agent': 'Your-User-Agent'
      }
    });

    if (response.status === 200) {
      const repo = await response.json();
      return repo;
    } else if (response.status === 404) {
      reply.code(404).send({ error: `repo was not found` });
    } else {
      reply.code(response.status).send({ error: 'An error occurred while fetching the repository data' });
    }
  } catch (error) {
    console.error('Error:', error);
    reply.code(500).send({ error: 'An error occurred while fetching the repository data' });
  }
});

interface requestId extends RequestGenericInterface {
  Params: {
    id: string
  }
}

server.get<requestId>('/search:id', async (request, reply) => {
  const { id } = request.params;
  
  if(id){
    try {
      const response = await fetch(`https://api.github.com/users/emmeline2/repos`, {
        headers: {
          Authorization: `Bearer ${process.env.GH_ACCESS_TOKEN}`,
          'User-Agent': 'Your-User-Agent'
        }
      });
  
      if (response.status === 200) {
        const repo = await response.json();
        return repo;
      } else if (response.status === 404) {
        reply.code(404).send({ error: `The repo with id = ${id} was not found` });
      } else {
        reply.code(response.status).send({ error: 'An error occurred while fetching the repository data' });
      }
    } catch (error) {
      console.error('Error:', error);
      reply.code(500).send({ error: 'An error occurred while fetching the repository data' });
    }
  }
  else{
      let errObj = {error: `The search API requires an id query parameter. id=${id}.`};
      reply.code(400).send(errObj);
      return
  }
  
});


server.get('/gists', async (request, reply) => {
  try {
    const response = await fetch(`https://api.github.com/users/emmeline2/gists`, {
      headers: {
        Authorization: `Bearer ${process.env.GH_ACCESS_TOKEN}`,
        'User-Agent': 'Your-User-Agent'
      }
    });

    if (response.status === 200) {
      const gists = await response.json();
      return gists;
    } else if (response.status === 404) {
      reply.code(404).send({ error: `Gists not found` });
    } else {
      reply.code(response.status).send({ error: 'An error occurred while fetching the Gist data' });
    }
  } catch (error) {
    console.error('Error:', error);
    reply.code(500).send({ error: 'An error occurred while fetching the Gist data' });
  }
});


server.listen({ port: 9500 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})