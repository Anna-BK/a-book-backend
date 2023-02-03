import client from '../../client.js';
import { protectedResolver } from '../../users/users.utils.js';

export default {
    Mutation: {
        deleteHistory: protectedResolver(async function (_, { historyId }) {
            try {
                await client.history.delete({
                    where : {
                        id : historyId
                    }
                });

                return {
                    ok: true
                }
            } catch (error) {
                console.error(error);
                return {
                    ok: false,
                    error: "Failed to execute the deleteHistory."
                }
            }
        }),
    }
}