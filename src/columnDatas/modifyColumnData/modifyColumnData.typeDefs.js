export default `#graphql
    type modifyColumnDataResult {
      ok : Boolean!
      columnData : ColumnData
      error : String
}
    type Mutation  {
        modifyColumnData(columnDataId : Int!, value : String!) : modifyColumnDataResult
    }
`;