import client from '../../client.js';
import { protectedResolver } from '../../users/users.utils.js';

export default {
    Mutation: {
        deleteBook: protectedResolver(async function (_, { bookId }) {
            try {
                await client.book.delete({
                    where: {
                        id: bookId
                    }
                });

                return {
                    ok: true
                }
            } catch (error) {
                return {
                    ok: false,
                    error: "Failed to execute the DeleteBook."
                }
            }
        }),
    }
}