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

    //获取最大天数
    async requestMax(month,type) {
        let request
        if(type == 1){
            request = "/api/oldSign/info/max_continue_days/10000:2023-" + Number(month)
        }
        if(type == 2){
            request = "/api/newSign/info/max_continue_days/10000:2023-" + Number(month)
        }
        console.log("request get", request)
        let ans = []
        return new Promise((resolve, reject) => {
            axios.get(request)
                .then(res => {
                    console.log(res.data, '@@@@get max_continue_days data')

                    ans = res.data
                    // let ans = this.getSignList(res.data)
                    // console.log("ans",ans)
                    resolve(ans)
                })
                .catch(error => {
                    console.log(error, '获取最大连签接口返回报错')
                    resolve(ans)
                })
        })
    },

    async requestCount(month,type) {
        let request
        if(type == 1){
            request = "/api/oldSign/info/count/10000:2023-" + Number(month)
        }
        if(type == 2){
            request = "/api/newSign/info/count/10000:2023-" + Number(month)
        }
        console.log("request get", request)
        let ans = []
        return new Promise((resolve, reject) => {
            axios.get(request)
                .then(res => {
                    console.log(res.data, '@@@@get monthCount data')

                    ans = res.data
                    // let ans = this.getSignList(res.data)
                    // console.log("ans",ans)
                    resolve(ans)
                })
                .catch(error => {
                    console.log(error, '获取月签到接口返回报错')
                    resolve(ans)
                })
        })
    },

    async requestGetList() {
        let request ="/api/costCompare/getSignList/20"
        console.log("request get 获取签到列表对比", request)
        let ans = []
        return new Promise((resolve, reject) => {
            axios.get(request)
                .then(res => {
                    console.log(res.data, '@@@@获取签到列表对比 data')

                    ans = res.data
                    // let ans = this.getSignList(res.data)
                    // console.log("ans",ans)
                    resolve(ans)
                })
                .catch(error => {
                    console.log(error, '获取签到耗时对比返回报错')
                    resolve(ans)
                })
        })
    },

    async requestGetCount() {
        let request ="/api/costCompare/getSignedCount/20"
        console.log("request get 获取月签到次数对比", request)
        let ans = []
        return new Promise((resolve, reject) => {
            axios.get(request)
                .then(res => {
                    console.log(res.data, '@@@@获取月签到次数对比 data')

                    ans = res.data
                    // let ans = this.getSignList(res.data)
                    // console.log("ans",ans)
                    resolve(ans)
                })
                .catch(error => {
                    console.log(error, '获取月签到次数对比返回报错')
                    resolve(ans)
                })
        })
    },

    async requestGetMax() {
        let request ="/api/costCompare/maxContinue/20"
        console.log("request get 获取最大连续签到对比", request)
        let ans = []
        return new Promise((resolve, reject) => {
            axios.get(request)
                .then(res => {
                    console.log(res.data, '@@@@获取最大连续签到对比 data')

                    ans = res.data
                    // let ans = this.getSignList(res.data)
                    // console.log("ans",ans)
                    resolve(ans)
                })
                .catch(error => {
                    console.log(error, '获取最大连续签到对比返回报错')
                    resolve(ans)
                })
        })
    },

    async requestGetSign() {
        let request ="/api/costCompare/sign/20"
        console.log("request get 实现签到对比", request)
        let ans = []
        return new Promise((resolve, reject) => {
            axios.get(request)
                .then(res => {
                    console.log(res.data, '@@@@实现签到对比 data')

                    ans = res.data
                    // let ans = this.getSignList(res.data)
                    // console.log("ans",ans)
                    resolve(ans)
                })
                .catch(error => {
                    console.log(error, '实现签到对比返回报错')
                    resolve(ans)
                })
        })
    },

    async requestGetSupplementary() {
        let request ="/api/costCompare/supplementary/20"
        console.log("request get 实现补签对比", request)
        let ans = []
        return new Promise((resolve, reject) => {
            axios.get(request)
                .then(res => {
                    console.log(res.data, '@@@@实现补签对比 data')

                    ans = res.data
                    // let ans = this.getSignList(res.data)
                    // console.log("ans",ans)
                    resolve(ans)
                })
                .catch(error => {
                    console.log(error, '实现补签对比返回报错')
                    resolve(ans)
                })
        })
    },
}