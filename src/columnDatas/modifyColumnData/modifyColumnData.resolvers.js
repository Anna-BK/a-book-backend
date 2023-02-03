import client from '../../client.js';
import { protectedResolver } from '../../users/users.utils.js';

export default {
    Mutation: {
        modifyColumnData: protectedResolver(async function (_, { columnDataId, value }) {
            try {
                const columnData = await client.columnData.update({
                    where: {
                        id : columnDataId
                    },
                    data: {
                        value
                    }
                });
                return {
                    ok: true,
                    columnData,
                }
            } catch (error) {
                return {
                    ok: false,
                    error,
                }
            }
        })
    }
}