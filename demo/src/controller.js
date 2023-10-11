import axios from 'axios'


const fakeList = [1, 4, 5, 10, 11, 12, 13, 17, 19, 22, 23, 28]

export default {

    getSignList(value) {
        const res = [];
        let j = 0
        // console.log("value",value)
        for (let i = 0; i < value.length; i++) {
            if (value[i].signed === 0) {
                res[j] = i
                j++
            }
        }
        // console.log("res",res)
        return res
    },

    async requestList(month) {
        // let request
        let request = "/api/oldSign/info/10000:2023-08"
        // if(month > 8){
        //     request= "/api/oldSign/info/10000:2023-" + (month + 1)
        // }else{
        //     request = "/api/oldSign/info/10000:2023-" + (month + 1)
        // }
        console.log("request get",request)
        let ans = []
        return new Promise((resolve,reject)=>{
            axios.get(request)
                .then(res => {
                    console.log(res.data, '!!!!!!!!!!get request data')
                    let ans = this.getSignList(res.data)
                    // console.log("ans",ans)
                    resolve(ans)
                })
                .catch(error => {
                    console.log(error, '获取签到列表接口返回报错')
                    resolve(ans)
                })
        })

        // console.log("!!!!unSign",unSign)
        // return ans
    }

}