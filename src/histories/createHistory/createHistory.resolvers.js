import client from '../../client.js';
import { protectedResolver} from '../../users/users.utils.js';



// [
//     {value : "통신비",  columnId : 3 },
//     {value : "2022-05-25",  columnId : 2 },
//     {value : "72600",  columnId : 4 }
// ]
export default {
    Mutation: {
        createHistory: protectedResolver(async function (_, { bookId, columnDatas }, { loggedInUser }) {
            try {

                const history = await client.history.create({
                    data : {
                        bookId,
                        columnDatas : {
                            createMany : {
                                //방금 생성한 history의 id를 가져올 수 있는지..?
                                //=> 참조 걸려있으면 자동으로 되는듯 하다.
                                data : columnDatas
                            }
                        }
                    },
                    include : {
                        columnDatas : true //columnDatas 필드도 반환하도록 설정
                    }
                });

                return {
                    ok : true,
                    history
                }

            } catch (error) {
                return {
                    ok: false,
                    error: "Failed to execute the CreateHistory."
                }
            }
        }),
    }
}