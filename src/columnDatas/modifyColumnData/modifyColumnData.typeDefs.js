export default `#graphql
    type modifyColumnDataResult {
      ok : Boolean!
      columnData : ColumnData
      error : String
}
    type Mutation  {
        modifyColumnData(id : Int!, value : String!) : modifyColumnDataResult
    }
`;