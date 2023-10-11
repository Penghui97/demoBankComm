import axios from 'axios'

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
        let request
        // let request = "/api/oldSign/info/10000:2023-08"
        if (Number(month) > 8) {
            request = "/api/oldSign/info/10000:2023-" + (Number(month)+1)
        } else {
            request = "/api/oldSign/info/10000:2023-0" + (Number(month)+1)
        }
        console.log("request get", request)
        let ans = []
        return new Promise((resolve, reject) => {
            axios.get(request)
                .then(res => {
                    console.log(res.data, '!!!!!!!!!!get request data')
                    ans = res.data
                    // let ans = this.getSignList(res.data)
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
    },

    oldSignIn(date, month) {
        let data = '10000:2023-' + month + '-' + date
        console.log("request body",data)
        axios.post('/api/oldSign/sign', data, {
            headers: {
                'Content-Type': 'application/text;charset=UTF-8'
            }
        })
            .then(res => {
                console.log(res, '!!!!!!!!!!old sign in return data')
            })
            .catch(error => {
                console.log(error, '获取签到列表接口返回报错')
            })

    },

    oldSupplementary(date, month) {
        let data
        if(month>9){
            if(date>9){
                data = '10000:2023-' + month + '-' + date
            }else{
                data = '10000:2023-' + month + '-0' + date
            }
        }else{
            if(date>9){
                data = '10000:2023-' + month + '-' + date
            }else{
                data = '10000:2023-' + month + '-0' + date
            }
        }
        console.log("request body of put",data)
        axios.put('/api/oldSign/supplementary', data, {
            headers: {
                'Content-Type': 'application/text;charset=UTF-8'
            }
        })
            .then(res => {
                console.log(res, '!!!!!!!!!!old sign in return data')
            })
            .catch(error => {
                console.log(error, '获取签到列表接口返回报错')
            })
    },

    strToDigitArray(value) {
        const arr = [];
        for (let i = 0; i < value.singed.length; i++) {
            arr.push(Number(value.singed[i]));
        }
        return arr;
    },
    getNewSignList(value) {
        const res = this.strToDigitArray(value);
        console.log(res)
        let j = 0
        const  newRes = []
        // console.log("value",value)
        for (let i = 0; i < res.length; i++) {
            if (res[i] === 0) {
                newRes[j] = i
                j++
            }
        }
        // console.log("res",res)
        console.log(newRes,newRes)
        return newRes
    },
    async requestNewList(month) {
        let request
        // let request = "/api/oldSign/info/10000:2023-08"
        if (Number(month) > 8) {
            request = "/api/newSign/info/10000:2023-" + (Number(month)+1)
        } else {
            request = "/api/newSign/info/10000:2023-0" + (Number(month)+1)
        }
        console.log("requestNewList1", request)
        let ans = []
        return new Promise((resolve, reject) => {
            axios.get(request)
                .then(res => {
                    console.log(res.data, 'get new request data')
                    ans = res.data
                    // let ans = this.getSignList(res.data)
                    // console.log("ans",ans)
                    // resolve(ans)
                })
                .catch(error => {
                    console.log(error, '获取签到列表接口返回报错')
                    // resolve(ans)
                })
        })

        // console.log("!!!!unSign",unSign)
        // return ans
    },
    newSignIn(date, month) {
        const requestData = {
            "id": `1000: 2023-${month}`,
            "key": `1000:2023:${month}`,
            "day": `${data}`,
            "singed": ""
        }

        let data = '10000:2023-' + month + '-' + date
        console.log("request body",data)
        axios.post('/api/newSign/sign', data, {
            headers: {
                'Content-Type': 'application/text;charset=UTF-8'
            }
        })
            .then(res => {
                console.log(res, '!!!!!!!!!!old sign in return data')
            })
            .catch(error => {
                console.log(error, '获取签到列表接口返回报错')
            })

    },
    newSupplementary(){

    }
}