export default `#graphql
    type ModifyOptionResult {
        ok : Boolean!
        option : Option
        error : String
}
    type Mutation  {
        modifyOption(optionId : Int!, title : String!) : ModifyOptionResult
    }
`;