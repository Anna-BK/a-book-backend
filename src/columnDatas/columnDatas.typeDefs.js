export default `#graphql
    type ColumnData {
      id : Int!
      value :String!
      createdAt :String!
      updatedAt :String!
      #history History
      historyId: Int!
      #column Column
      columnId :Int!
    }
`;
