export default `#graphql
   type DeleteHistoryResult {
      ok : Boolean!
      error : String
  }
  type Mutation {
   deleteHistory(historyId : Int!) : DeleteHistoryResult     
  }
`;
