import client from '../../client.js';
import { protectedResolver } from '../../users/users.utils.js';

export default {
    Query: {
        options: protectedResolver(async function (_, { columnId }) {
            try {
                const options = await client.option.findMany({
                    where: {
                        columnId
                    }
                });
                return {
                    ok: true,
                    options
                }
            } catch (error) {
                console.error(error);
                return {
                    ok: false,
                    error: "Failed to execute the options."
                }
            }
        })
    }
}