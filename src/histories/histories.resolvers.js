import client from '../client.js';


export default {
    History : {
        columnDatas : async function(root){
            // 에러가 나면?
            const { id } = root; //historyId
            const columnDatas =  await client.columnData.findMany({
                where : {
                    historyId : id
                }
            });
            return columnDatas
        }
    }
}