export default `#graphql
   type CreateOptionResult {
      ok : Boolean!
      option : Option
      error : String
  }
  type Mutation {
    createOption(columnId : Int!, title : String!) : CreateOptionResult
  }
`;
