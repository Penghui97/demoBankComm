import {Calendar, Button, Space, Badge, Modal} from 'antd';
import {Component} from 'react';
import moment from 'moment'
import Controller from './controller'

// import {logDOM} from "@testing-library/react";

class App extends Component {

    state = {
        unsignList: [],
        currentList: [],
        currentMonth: new Date().getMonth() + 1,
        date: 0,
        newUnSignList: [],
        getListFlag: 0//查询列表信息所使用的请求，0代表通过老系统费请求渲染页面，1代表新系统渲染页面，默认为0，点击新老系统获取列表时改变状态
    }


    onPanelChange = async (value, mode) => {
        let newList
        let list = []
        let unsignList
        console.log(value.format('YYYY-MM-DD'), mode);
        let time = value.format('YYYY-MM-DD')
        let monthChange = time.split('-')[1]
        console.log("monthChange", monthChange)
        if (this.state.getListFlag === 0) {
            console.log('!!!!!!!!!!!!!!!!old system!!!!!!!!!!!!!!!!')
            newList = await Controller.requestList(Number(monthChange) - 1)
            unsignList = Controller.getSignList(newList)
        } else {
            console.log('!!!!!!!!!!!!!!!!new system!!!!!!!!!!!!!!!!')
            newList = await Controller.requestNewList(Number(monthChange) - 1)
            list = newList
            if (Number(monthChange) === new Date().getMonth() + 1) {
                list = []
                for (let i = 0; i < new Date().getDate(); i++) {
                    list[i] = newList[i]
                }
            }
            unsignList = Controller.getSignListFromArray(list)
        }
        // let newUnSignList = await Controller.requestNewList(monthChange)
        // console.log('newUnSignList--------------------------------',newUnSignList);
        console.log("updated data", list)
        console.log("new unsigned", unsignList)
        this.setState({
            currentMonth: monthChange,
            unsignList: unsignList,
            currentList: newList
            // newUnSignList: newUnSignList
        })

    };

    cellRender = (current, info) => {
        if (info.type === 'date') return this.dateCellRender(current);
        // if (info.type === 'month') return this.monthCellRender(current);
        return info.originNode;
    };

    dateCellRender = (value) => {
        console.log('------hahahahaha1111------')
        let list = this.state.unsignList
        let date = String(value.$d)
        date = date.split(' ')[2]
        let currentMonth = value.$M + 1
        // console.log("currentmonth???",currentMonth,new Date().getDate())//显示面板当月和现实操作日期
        for (let i = 0; i < list.length; i++) {
            if (Number(date) - 1 === Number(list[i]) && Number(currentMonth) === Number(this.state.currentMonth)) {
                return (
                    <ul>
                        <li key='This is error  event.'>
                            <Badge status='error' text='未签到！'/>
                        </li>
                    </ul>
                );
            }
        }
        if (Number(date) === new Date().getDate() && new Date().getDate() > this.state.currentList.length) {
            if (currentMonth === new Date().getMonth() + 1) {
                return (
                    <ul>
                        <li key='This is warning  event.'>
                            <Badge status='warning' text='点击签到'/>
                        </li>
                    </ul>
                );
            }
        }
    }

    onSelect = (date, info) => {
        console.log("onselect", date, info)
        this.setState({
            date: date.$D
        })
    }

    infoMaxCount = async (value, type) => {
        let maxCount = await Controller.requestMax(value, type)
        console.log("maxCount", maxCount)
        Modal.info({
            title: '',
            content: (
                <div>
                    <p>最大连续签到天数为：{maxCount}</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    infoCount = async (value, type) => {
        let Count = await Controller.requestCount(value, type)
        Modal.info({
            title: '',
            content: (
                <div>
                    <p>月签到天数为：{Count}</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    infoGetList = async () => {
        let data = await Controller.requestGetList()
        Modal.info({
            title: '',
            content: (
                <div>
                    <p>老签到系统实现获取签到列表的总耗时为{data.old_sign_total}ms</p>
                    <p>新签到系统实现获取签到列表的总耗时为{data.new_sign_total}ms</p>
                    <p>新老系统实现的耗时差为{data.difference_total}ms</p>
                    <p>耗时优化率为{data.optimized_rate}</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    infoGetCount = async () => {
        let data = await Controller.requestGetCount()
        Modal.info({
            title: '',
            content: (
                <div>
                    <p>老签到系统获取月签到次数的总耗时为{data.old_sign_total}ms</p>
                    <p>新签到系统获取月签到次数的总耗时为{data.new_sign_total}ms</p>
                    <p>新老系统实现的耗时差为{data.difference_total}ms</p>
                    <p>耗时优化率为{data.optimized_rate}</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    infoGetMax = async () => {
        let data = await Controller.requestGetMax()
        Modal.info({
            title: '',
            content: (
                <div>
                    <p>老签到系统获取当月最大连续签到的总耗时为{data.old_sign_total}ms</p>
                    <p>新签到系统获取当月最大连续签到的总耗时为{data.new_sign_total}ms</p>
                    <p>新老系统实现的耗时差为{data.difference_total}ms</p>
                    <p>耗时优化率为{data.optimized_rate}</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    infoGetSign = async () => {
        let data = await Controller.requestGetSign()
        Modal.info({
            title: '',
            content: (
                <div>
                    <p>老签到系统实现签到的总耗时为{data.old_sign_total}ms</p>
                    <p>新签到系统实现签到的总耗时为{data.new_sign_total}ms</p>
                    <p>新老系统实现的耗时差为{data.difference_total}ms</p>
                    <p>耗时优化率为{data.optimized_rate}</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    infoGetSupplementary = async () => {
        let data = await Controller.requestGetSupplementary()
        Modal.info({
            title: '',
            content: (
                <div>
                    <p>老签到系统实现补签的总耗时为{data.old_sign_total}ms</p>
                    <p>新签到系统实现补签的总耗时为{data.new_sign_total}ms</p>
                    <p>新老系统实现的耗时差为{data.difference_total}ms</p>
                    <p>耗时优化率为{data.optimized_rate}</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    async componentDidMount() {
        console.log('-----------------22222222222-')
        let list
        let month = moment().month()
        this.setState({
            month: moment().month(),
            date: moment().date()
        })
        list = await Controller.requestList(month)
        let unSign = Controller.getSignList(list)
        // let tmp = Controller.getNewSignList(newUnSignList)
        // console.log('tmp----------------------------------------------',tmp);
        console.log("unsign data", unSign)
        this.setState({
            unsignList: unSign,
            currentList: list
            // newUnSignList: newUnSignList
        })
    }

    render() {
        return (

            <div className="App">
                <div className="calendar">
                    <div style={{margin: '15px'}}>
                        <Space wrap>
                            <Button onClick={() => this.infoGetList()}>获取签到耗时</Button>
                            <Button onClick={() => this.infoGetCount()}>月签到次数耗时</Button>
                            <Button onClick={() => this.infoGetMax()}>最大连续签到耗时</Button>
                            <Button onClick={() => this.infoGetSign()}>签到耗时</Button>
                            <Button onClick={() => this.infoGetSupplementary()}>补签耗时</Button>
                        </Space>
                    </div>
                    <div style={{margin: '15px'}}>
                        <Space wrap>
                            <Button type="primary"
                                    onClick={() => {
                                        this.setState({
                                            getListFlag: 0
                                        })
                                    }}>老系统获取签到列表</Button>
                            <Button type="primary"
                                    onClick={() => Controller.oldSignIn(new Date().getDate(), this.state.currentMonth)}>老系统签到</Button>
                            <Button type="primary"
                                    onClick={() => Controller.oldSupplementary(this.state.date, this.state.currentMonth)}>老系统补签</Button>
                            <Button
                                onClick={() => this.infoMaxCount(this.state.currentMonth, 1)}>最大连续签到天数</Button>
                            <Button onClick={() => this.infoCount(this.state.currentMonth, 1)}>月签到天数</Button>
                        </Space>
                    </div>
                    <div style={{margin: '15px'}}>
                        <Space wrap>
                            <Button type="primary"
                                    onClick={() => {
                                        this.setState({
                                            getListFlag: 1
                                        })
                                    }}>新系统获取签到列表</Button>
                            <Button type="primary"
                                    onClick={() => Controller.newSignIn(new Date().getDate(), new Date().getMonth() + 1, this.state.currentList)}>新系统签到</Button>
                            <Button type="primary"
                                    onClick={() => Controller.newSupplementary(this.state.date, this.state.currentMonth, this.state.currentList)}>新系统补签</Button>
                            <Button
                                onClick={() => this.infoMaxCount(this.state.currentMonth, 2)}>最大连续签到天数</Button>
                            <Button onClick={() => this.infoCount(this.state.currentMonth, 2)}>月签到天数</Button>
                        </Space>
                    </div>
                    <Calendar
                        onPanelChange={this.onPanelChange}
                        cellRender={this.cellRender}
                        onSelect={this.onSelect}
                    />
                </div>

            </div>

        );
    }

}

export default App;
