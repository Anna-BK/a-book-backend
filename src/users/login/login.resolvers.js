import jwt from 'jsonwebtoken';
import client from '../../client.js';

export default {
    Mutation : {
        login: async function (_, { username, password }) {
            const user = await client.user.findUnique({
                where: {
                    username
                }
            });

            if (!user) {
                return {
                    ok: false,
                    error: "User not found."
                }
            }

            const passwordOk = (user.password === password);

            if (!passwordOk) {
                return {
                    ok: false,
                    error: "Incorrect password."
                }
            }

            const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            };
        }
    }
}