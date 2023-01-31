export default `#graphql
   type DeleteBookResult {
      ok : Boolean!
      error : String
  }
  type Mutation {
   deleteBook(bookId : Int!) : DeleteBookResult     
  }
`;
