require("dotenv").config();
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// 명세서 
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type LoginResult {
      ok : Boolean!
      token : String
      error : String
  }
   
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  # Query나 Mutation이나 표면적 구분일 뿐, 기능상에 차이는 없다.
  type Query {
   
  }

  type Mutation {
      login (username : String!, password : String!) : LoginResult
  }
`;


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
// 구현체 

const client = new PrismaClient();

const resolvers = {
    //실제로는 DB SQL 실행
    Query: {

    },
    Mutation: {
        login: async function (_, { username, password }) {
            const user = await client.user.findUnique({
                where: {
                    username
                }
            });

            if (!user) {
                return {
                    ok: false,
                    error: "User not found."
                }
            }

            const passwordOk = (user.password === password);

            if (!passwordOk) {
                return {
                    ok: false,
                    error: "Incorrect password."
                }
            }

            
            //sign (payload, secretOrPrivateKey)
            //payload에는 비밀을 넣는 것이 아님. (jwt 사이트가서 token 까보면 payload 정보 다 나옴)
            //(추후 api 요청시) 우리한테 온 이 토큰은 우리가 서명한 것이 맞고 다른사람이 변경하지 않았다는 것을 확인하는 용도
            // 나중에 확인할때는 (verify) 어떻게 하는거지?
            const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            };



        }
    },
};


const server = new ApolloServer({
    typeDefs,
    resolvers
});



// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);