import jwt from 'jsonwebtoken';
import client from '../client.js';

export const getUser = async function (token) {

    try {
        //토큰이 없거나
        if (!token) {
            return null;
        }
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);

        const user = await client.user.findUnique({
            where: {
                id
            }
        });

        //유저가 없거나
        if (!user) {
            return null;
        }

        return user;

        //verify에 실패한 경우 
    } catch (error) {
        return null;
    }
};

export const protectedResolver = function(resolver){
    return (function(root, args, context, info){
        const { loggedInUser } = context;
        if (!loggedInUser) {
            return {
                ok: false,
                error: "Please log in."
            }
        }
        //Promise를 반환 
        return resolver(root,args,context,info);
    })
}