import {Calendar, Button, Space, Badge, Modal,} from 'antd';
import {Component} from 'react';
import moment from 'moment'
import Controller from './controller'

const fakeList = [1, 3, 5, 8, 11, 12, 13]


class App extends Component {

    state = {
        unsignList: [],
        currentList: [],
        currentMonth: new Date().getMonth() + 1,
        date: 0
    }


    onPanelChange = async (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
        let time = value.format('YYYY-MM-DD')
        let monthChange = time.split('-')[1]
        console.log("monthChange", monthChange)
        let newList = await Controller.requestList(monthChange)
        console.log("updated data", newList)
        this.setState({
            currentMonth: monthChange,
            unsignList: newList
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
            if (Number(date) === Number(list[i]) && Number(currentMonth) === Number(this.state.currentMonth)) {
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
        // if(list.length === 0&&(Number(currentMonth)===Number(new Date().getMonth())+1)){
        //     console.log("warning!!!!!!!!")
        //     if(Number(date)<=Number(new Date().getDate())){
        //         return (
        //             <ul>
        //                 <li key='This is error  event.'>
        //                     <Badge status='error' text='未签到！'/>
        //                 </li>
        //             </ul>
        //         );
        //     }
        // }
    }

    onSelect = (date, info) => {
        console.log("onselect", date, info)
        this.setState({
            date: date.$D
        })
    }

    infoMaxCount = (value) => {
        let maxCount = Controller.requestMax(value)
        Modal.info({
            title: '',
            content: (
                <div>
                    <p>最大连续签到天数为：$(maxCount)</p>
                </div>
            ),
            onOk() {},
        });
    };

    infoCount = (value) => {
        let Count = Controller.requestCount(value)
        Modal.info({
            title: '',
            content: (
                <div>
                    <p>月签到天数为：$(Count)</p>
                </div>
            ),
            onOk() {},
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
        let list = await Controller.requestList(month)
        let unSign = Controller.getSignList(list)
        console.log("unsign data", unSign)
        this.setState({
            unsignList: unSign,
            currentList: list
        })

    }



    render() {
        return (

            <div className="App">
                <div className="calendar">
                    <Space wrap>
                        <Button type="primary"
                                onClick={() => Controller.oldSignIn(this.state.date, this.state.currentMonth)}>签到</Button>
                        <Button type="primary">补签</Button>
                        <Button onClick={() => this.infoMaxCount(this.state.currentMonth)}>最大连续签到天数</Button>
                        <Button onClick={() => this.infoCount(this.state.currentMonth)}>月签到天数</Button>
                        {/*<Button type="primary"*/}
                        {/*        onClick={() => Controller.requestMax(this.state.currentMonth)}>最大连续签到天数</Button>*/}
                        {/*<Button type="primary"*/}
                        {/*        onClick={() => Controller.requestCount(this.state.currentMonth)}>月签到天数</Button>*/}
                    </Space>
                    <Calendar
                        onPanelChange={this.onPanelChange}
                        cellRender={this.cellRender}
                        onSelect={this.onSelect}
                    />
                </div>

                <Button onClick={() => this.infoMaxCount(this.state.currentMonth)}>获取签到耗时</Button>
                <Button onClick={() => this.infoCount(this.state.currentMonth)}>月签到次数耗时</Button>
                <Button onClick={() => this.infoMaxCount(this.state.currentMonth)}>最大连续签到耗时</Button>
                <Button onClick={() => this.infoCount(this.state.currentMonth)}>月签到天数</Button>
                <Button onClick={() => this.infoMaxCount(this.state.currentMonth)}>最大连续签到天数</Button>


            </div>

        );
    }

}

export default App;
