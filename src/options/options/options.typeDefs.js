export default `#graphql
    type OptionsResult {
      ok : Boolean!
      options : [Option]
      error : String
}
    type Query {
     options(columnId : Int!) : OptionsResult
  }
`;
