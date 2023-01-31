export default `#graphql
type History {
  id : Int!
  createdAt : String!
  updatedAt :  String!
  columnDatas : [ColumnData]
  #book Book @relation(fields: [bookId], references : [id])
  bookId : Int!
}
`;
