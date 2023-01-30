import client from '../../client.js';
import { protectedResolver} from '../../users/users.utils.js';

export default {
    Mutation: {
        modifyBook: protectedResolver(async function (_, { bookId, title, archieved }, { loggedInUser }) {
            try {
                const book = await client.book.update({
                    where : {
                        id : bookId,
                    },
                    data : {
                        title,  //args에 없으면 undefined
                        archieved
                    }
                });

                return {
                    ok: true,
                    book: book
                }
            } catch (error) {
                return {
                    ok: false,
                    error: "Failed to execute the ModifyBook."
                }
            }
        }),
    }
}