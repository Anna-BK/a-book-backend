export default `#graphql
   type CreateBookResult {
      ok : Boolean!
      book : Book
      error : String
  }
  type Mutation {
      createBook(title : String!) : CreateBookResult     
  }
`;
