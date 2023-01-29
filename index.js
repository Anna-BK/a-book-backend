import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';


dotenv.config();

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
   
  type CreateBookResult {
      ok : Boolean!
      book : Book
      error : String
  }

  type Book {
    id : Int!
    title : String!
    archieved : Boolean!
    createdAt : String!
    updatedAt :  String!
    #historys History[]
    #user User # 이런 것들을 제공하고 싶다면 resolver에 해당 타입 : { 필드명 : ... } 으로 함수를 만들면 된다.
    userId : Int!
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  # Query나 Mutation이나 표면적 구분일 뿐, 기능상에 차이는 없다.
  type Query {
     hi : String
  }

  type Mutation {
      createBook(title : String!) : CreateBookResult
      login (username : String!, password : String!) : LoginResult
  }
`;


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
// 구현체 

const client = new PrismaClient();



const protectedResolver = function(resolver){
    return (function(root, args, context, info){
        const { loggedInUser } = context;
        if (!loggedInUser) {
            return {
                ok: false,
                error: "Please log in."
            }
        }
        //Promise를 반환 
        return resolver(root,args,context,info);
    })
}


const resolvers = {
    //실제로는 DB SQL 실행
    Query: {
        hi : () => "hi"
    },
    Mutation: {
        createBook: protectedResolver(async function (_, { title }, { loggedInUser }) {
            try {
                const book = await client.book.create({
                    data: {
                        title,
                        userId: loggedInUser.id
                    }
                });

                //console.log(book);

                return {
                    ok: true,
                    book : book
                }
            } catch (error) {
                return {
                    ok: false,
                    error: "Failed to execute the CreateBook."
                }
            }
        }),
        // createBook: async function (_, { title }, { loggedInUser }) {
        //     try {
        //         if (!loggedInUser) {
        //             return {
        //                 ok: false,
        //                 error: "Please log in."
        //             }
        //         }

        //         const book = await client.book.create({
        //             data: {
        //                 title,
        //                 userId: loggedInUser.id
        //             }
        //         });

        //         return {
        //             ok: true
        //             //book : book
        //         }
        //     } catch (error) {
        //         return {
        //             ok: false,
        //             error: "Failed to execute the CreateBook."
        //         }
        //     }


        // },

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


const getUser = async function (token) {

    try {
        //토큰이 없거나
        if (!token) {
            return null;
        }
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);

        const user = await client.user.findUnique({
            where: {
                id
            }
        });

        //유저가 없거나
        if (!user) {
            return null;
        }

        return user;

        //verify에 실패한 경우 
    } catch (error) {
        return null;
    }
}


// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => ({
        loggedInUser: await getUser(req.headers.token)
    })
});

console.log(`🚀  Server ready at: ${url}`);