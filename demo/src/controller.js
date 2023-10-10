import axios from 'axios'


const fakeList = [1, 4, 5, 10, 11, 12, 13, 17, 19, 22, 23, 28]

export default {

    getSignList(value) {
        const res = [];
        let j = 0
        for (let i = 0; i < value.length; i++) {
            if (value[i].signed === 0) {
                res[j] = i
                j++
            }
        }
        return res
    },

    requestList(month) {
        // let request = "/api/oldSign/info/10000:2023-0" + month
        let unSign = fakeList
        // axios.get(request)
        //     .then(res => {
        //         console.log(res.data, '!!!!!!!!!!')
        //         unSign = this.getSignList(res.data) ? this.getSignList(res.data) : fakeList
        //     })
        //     .catch(error => {
        //         console.log(error, '获取签到列表接口返回报错')
        //         unSign = fakeList
        //     })
        return unSign
    }

}