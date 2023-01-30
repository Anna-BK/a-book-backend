export default `#graphql
   type ModifyBookResult {
      ok : Boolean!
      book : Book
      error : String
  }
  type Mutation {
     modifyBook(bookId : Int!, title : String, archieved : Boolean) : ModifyBookResult     
  }
`;
