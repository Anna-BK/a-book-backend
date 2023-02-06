import client from '../client.js';


export default {
    Book : {
        historys : async function(root){
            const { id } = root; //bookId
            const histories = await client.history.findMany({
                where : {
                    bookId : id
                }
            });
            return histories
        }
    }
}