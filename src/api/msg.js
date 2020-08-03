import { get, post} from '../utils/request.js'

export function addMsg(data){
    return post('/api/addMsg',data)
}