import client from '../../client.js';
import { protectedResolver } from '../../users/users.utils.js';

export default {
    Mutation: {
        createOption: protectedResolver(async function (_, { columnId, title }) {
            try {
                const option = client.option.create({
                    data: {
                        columnId,
                        title
                    }
                });

                return {
                    ok: true,
                    option
                }

            } catch (error) {
                return {
                    ok: false,
                    error: "Failed to execute the createOption."
                }
            }
        }),
    }
}