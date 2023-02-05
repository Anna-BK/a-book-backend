import client from '../../client.js';
import { protectedResolver } from '../../users/users.utils.js';

export default {
    Mutation: {
        deleteOption : protectedResolver(async function (_, { optionId }) {
            try {
                await client.option.delete({
                    where : {
                        id : optionId
                    }
                });
                return {
                    ok: true
                }
            } catch (error) {
                console.error(error);
                return {
                    ok: false,
                    error: "Failed to execute the deleteOption."
                }
            }
        }),
    }
}