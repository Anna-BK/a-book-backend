import client from '../../client.js';
import { protectedResolver} from '../../users/users.utils.js';

export default {
    Mutation: {
        createBook: protectedResolver(async function (_, { title }, { loggedInUser }) {
            try {
                const book = await client.book.create({
                    data: {
                        title,
                        userId: loggedInUser.id
                    }
                });

                return {
                    ok: true,
                    book: book
                }
            } catch (error) {
                return {
                    ok: false,
                    error: "Failed to execute the CreateBook."
                }
            }
        }),
    }
}