import client from '../../client.js';
import { protectedResolver } from '../../users/users.utils.js';

export default {
    Mutation: {
        modifyOption: protectedResolver(async function (_, { optionId, title }) {
            try {
                const option = await client.option.update({
                    where : {
                        id : optionId
                    },
                    data : {
                        title
                    }
                });
                return {
                    ok: true,
                    option,
                }
            } catch (error) {
                console.error(error);
                return {
                    ok: false,
                    error: "Failed to execute the modifyOption."
                }
            }
        })
    }
}