export default `#graphql
    type modifyOptionResult {
        ok : Boolean!
        option : Option
        error : String
}
    type Mutation  {
        modifyOption(optionId : Int!, title : String!) : modifyOptionResult
    }
`;