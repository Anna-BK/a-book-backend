export default `#graphql
   type CreateHistoryResult {
      ok : Boolean!
      history : History
      error : String
  }
  #input용으로 type을 정의할때는 키워드 input을 써야한다.
  input ColumnDataInput {
    columnId : Int!
    value : String!
  }

  type Mutation {
    createHistory(bookId : Int!, columnDatas : [ColumnDataInput] ) : CreateHistoryResult     
  }
`;
