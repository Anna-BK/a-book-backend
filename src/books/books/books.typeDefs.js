export default `#graphql    
  type BooksResult {
    ok : Boolean!
    books : [Book]
    error : String
  }
  type Query {
    books(offset : Int!, limit : Int!) : BooksResult
  }
`;
