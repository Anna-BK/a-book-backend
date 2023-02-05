export default `#graphql
   type DeleteOptionResult {
      ok : Boolean!
      error : String
  }
  type Mutation {
   deleteOption(optionId : Int!) : DeleteOptionResult     
  }
`;
