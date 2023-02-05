export default `#graphql
type Option {
  id : Int!
  title : String!
  createdAt : String!
  updatedAt : String!
  #column Column @relation(fields: [columnId], references : [id], onDelete: Cascade)
  columnId : Int!
}
`;
