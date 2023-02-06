import client from '../../client.js';

export default {
    Query: {
        books: async function (_, { offset, limit }, loggedInUser) {
            try {
                const books = await client.book.findMany({
                    where: {
                        userId: loggedInUser.id
                    },
                    skip: offset * limit,
                    take: limit
                });
                return {
                    ok: true,
                    books
                }
            } catch (error) {
                console.error(error);
                return {
                    ok: false,
                    error : "Failed to execute the books."
                }
            }
        }
    }
}