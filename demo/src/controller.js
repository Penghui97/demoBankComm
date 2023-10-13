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

    getSignListFromArray(arr) {
        const res = []
        let j = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 0) {
                res[j] = i
                j++
            }
        }
        return res
    },

    async requestList(month) {
        let request
        // let request = "/api/oldSign/info/10000:2023-08"
        if (Number(month) > 8) {
            request = "/api/oldSign/info/10000:2023-" + (Number(month) + 1)
        } else {
            request = "/api/oldSign/info/10000:2023-0" + (Number(month) + 1)
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
        console.log("request body", data)
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
        if (month > 9) {
            if (date > 9) {
                data = '10000:2023-' + month + '-' + date
            } else {
                data = '10000:2023-' + month + '-0' + date
            }
        } else {
            if (date > 9) {
                data = '10000:2023-' + month + '-' + date
            } else {
                data = '10000:2023-' + month + '-0' + date
            }
        }
        console.log("request body of put", data)
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
        let arr = [];
        for (let i = 0; i < value.singed.length; i++) {
            arr.push(Number(value.singed[i]));
        }
        return arr;
    },
    getNewSignList(value) {
        const res = this.strToDigitArray(value);
        console.log(res)
        let j = 0
        const newRes = []
        // console.log("value",value)
        for (let i = 0; i < res.length; i++) {
            if (res[i] === 0) {
                newRes[j] = i
                j++
            }
        }
        // console.log("res",res)
        console.log(newRes, newRes)
        return newRes
    },
    async requestNewList(month) {
        let request
        // let request = "/api/oldSign/info/10000:2023-08"
        if (Number(month) > 8) {
            request = "/api/newSign/info/10000:2023-" + (Number(month) + 1)
        } else {
            request = "/api/newSign/info/10000:2023-0" + (Number(month) + 1)
        }
        console.log("requestNewList1", request)
        let ans = []
        return new Promise((resolve, reject) => {
            axios.get(request)
                .then(res => {
                    console.log(res.data, 'get new request data')
                    // console.log("!!!!!!!!sign list", typeof(res.data.signed))//字符串
                    const date = res.data.signed.split('')
                    // let test = this.getSignList(res.data)
                    // console.log("test????????",date)//字符串数组
                    for (let i = 0; i < date.length; i++) {
                        ans[i] = Number(date[i])
                    }
                    console.log("!!!!!!changed array", ans)
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
    newSignIn(date, month, value) {
        console.log(value);
        // const res = value.signed.split('');
        value[date - 1] = '1';
        const signed = value.join('');
        console.log('singed !!!!!!', signed)
        const requestData = {
            "id": `10000:2023-${month}`,
            "key": `10000:2023:${month}`,
            "day": `${date}`,
            "signed": signed
        }
        // let data = JSON.stringify(requestData);
        console.log("request body", requestData)
        // axios.post('/api/newSign/sign', JSON.stringify(requestData) )
        //     .then(res => {
        //         console.log(res, '!!!!!!!!!!new sign in return data')
        //     })
        //     .catch(error => {
        //         console.log(error, '获取签到列表接口返回报错')
        //     })
        // // {
        // //     headers: {
        // //         'Content-Type': 'application/json;charset=UTF-8'
        // //     }
        // // }

        fetch('/api/newSign/sign', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        }).then(res => res.json()).then(data => {
            console.log("请求的结果？？？？？？？？？", data) //请求的结果
        })

    },
    newSupplementary(date, month, value) {
        console.log("????????", date, month)
        if (month > 9) {
            month = '10000:2023-' + month
        } else {
            month = '10000:2023-0' + month
        }
        const res = value.signed.split('');
        res[date - 1] = '1';
        const singed = res.join('');
        console.log('singed !!!!!!', singed)
        const requestData = {
            "id": `${month}`,
            "key": `${month}`,
            "day": `${date}`,
            "signed": singed
        }
        // let data = JSON.stringify(requestData);
        axios.put('/api/newSign/supplementary', requestData, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
            .then(res => {
                console.log(res, '!!!!!!!!!!newSupplementary in return data')
            })
            .catch(error => {
                console.log(error, '获取签到列表接口返回报错')
            })
    },
    //获取最大天数
    async requestMax(month, type) {
        let request
        if (type === 1) {
            request = "/api/oldSign/info/max_continue_days/10000:2023-" + Number(month)
        }
        if (type === 2) {
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

    async requestCount(month, type) {
        let request
        if (type === 1) {
            request = "/api/oldSign/info/count/10000:2023-" + Number(month)
        }
        if (type === 2) {
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
        let request = "/api/costCompare/getSignList/20"
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
        let request = "/api/costCompare/getSignedCount/20"
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
        let request = "/api/costCompare/maxContinue/20"
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
        let request = "/api/costCompare/sign/20"
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
        let request = "/api/costCompare/supplementary/20"
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