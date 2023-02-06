export default `#graphql
    type Book {
    id : Int!
    title : String!
    archieved : Boolean!
    createdAt : String!
    updatedAt :  String!
    historys : [History]
    #user User # 이런 것들을 제공하고 싶다면 resolver에 해당 타입 : { 필드명 : ... } 으로 함수를 만들면 된다.
    userId : Int!
  }
`;
