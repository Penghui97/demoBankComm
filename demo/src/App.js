import {Calendar, Button, Space, Badge,Modal} from 'antd';
import {Component} from 'react';
import moment from 'moment'
import Controller from './controller'
import {logDOM} from "@testing-library/react";

const fakeList = [1, 3, 5, 8, 11, 12, 13]


class App extends Component {

    state = {
        unsignList: [],
        currentList: [],
        currentMonth: new Date().getMonth() + 1,
        date: 0,
        newUnSignList: []
    }


    onPanelChange = async (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
        let time = value.format('YYYY-MM-DD')
        let monthChange = time.split('-')[1]
        console.log("monthChange", monthChange)
        let newList = await Controller.requestList(monthChange)
        // let newUnSignList = await Controller.requestNewList(monthChange)
        // console.log('newUnSignList--------------------------------',newUnSignList);
        console.log("updated data", newList)
        this.setState({
            currentMonth: monthChange,
            unsignList: newList
            // newUnSignList: newUnSignList
        })

    };

    cellRender = (current, info) => {
        if (info.type === 'date') return this.dateCellRender(current);
        // if (info.type === 'month') return this.monthCellRender(current);
        return info.originNode;
    };

    dateCellRender = (value) => {

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

        let month = moment().month()
        this.setState({
            month: moment().month(),
            date: moment().date()
        }, () => {
            month = this.state.month
        })
        // let list = await Controller.requestList(month)
        let newUnSignList = await Controller.requestNewList(month)
        console.log('----in APP newUnSignList-----',newUnSignList)
        // let unSign = Controller.getSignList(list)
        let tmp = Controller.getNewSignList(newUnSignList,this.state.date)
        console.log('tmp----------------------------------------------',tmp);
        // console.log("unsign data", unSign)
        this.setState({
            unsignList: tmp,
            currentList: newUnSignList
            // newUnSignList: newUnSignList
        })
        console.log(this.state.unsignList);
        console.log(this.state.currentList);
    }

    render() {
        return (

            <div className="App">
                <div className="calendar">
                    <div style={{margin:'15px'}}>
                        <Space wrap>
                            <Button onClick={() => this.infoGetList()}>获取签到耗时</Button>
                            <Button onClick={() => this.infoGetCount()}>月签到次数耗时</Button>
                            <Button onClick={() => this.infoGetMax()}>最大连续签到耗时</Button>
                            <Button onClick={() => this.infoGetSign()}>签到耗时</Button>
                            <Button onClick={() => this.infoGetSupplementary()}>补签耗时</Button>
                        </Space>
                    </div>
                    <div style={{margin:'15px'}}>
                        <Space wrap>
                            <Button type="primary"
                                    onClick={() => Controller.oldSignIn(new Date().getDate(), this.state.currentMonth)}>老系统签到</Button>
                            <Button type="primary" onClick={()=>Controller.oldSupplementary(this.state.date,this.state.currentMonth)}>老系统补签</Button>
                            <Button onClick={() => this.infoMaxCount(this.state.currentMonth,1)}>最大连续签到天数</Button>
                            <Button onClick={() => this.infoCount(this.state.currentMonth,1)}>月签到天数</Button>
                        </Space>
                    </div>
                    <div style={{margin:'15px'}}>
                        <Space wrap>
                            <Button type="primary"
                                    onClick={() => Controller.newSignIn(new Date().getDate(), this.state.currentMonth,this.state.currentList)}>新系统签到</Button>
                            <Button type="primary" onClick={()=>Controller.newSupplementary(this.state.date,this.state.currentMonth,this.state.currentList)}>新系统补签</Button>
                            <Button onClick={() => this.infoMaxCount(this.state.currentMonth,2)}>最大连续签到天数</Button>
                            <Button onClick={() => this.infoCount(this.state.currentMonth,2)}>月签到天数</Button>
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
