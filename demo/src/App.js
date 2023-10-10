import { Calendar, Button, Space, Badge } from 'antd';
import { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import Controller from './controller'

const fakeList = [1, 3, 5, 8, 11, 12, 13]



class App extends Component {

  state = {
    unsignList: [],
    currentMonth: new Date().getMonth() + 1,
    a: ""
    // currentMonth: 10
  }


  onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    let time = value.format('YYYY-MM-DD')
    let monthChange = time.split('-')[1]
    let newList = Controller.requestList(monthChange)
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
    let flag = 0
    let list = this.state.unsignList
    let date = String(value.$d)
    date = date.split(' ')[2]
    let currentMonth = value.$M + 1
    for (let i = 0; i < list.length; i++) {
      if (Number(date) === Number(list[i]) && Number(currentMonth) === Number(this.state.currentMonth)) {
        flag++
      }
    }
    if (flag) {
      console.log("赋值！！！！！")
      return (
          <ul>
            <li key='This is error  event.'>
              <Badge status='error' text='未签到！' />
            </li>
          </ul>
      );
    }
  }

  componentDidMount() {
    // let month = moment().month()
    // this.setState({
    //   month: moment().month()
    // }, () => {
    //   console.log(this.state.month)
    //   month = this.state.month
    // })

    // let request = "/api/oldSign/info/10000:2023-0" + (month + 1)

    let unSign = fakeList
    // axios.get(request)
    //   .then(res => {
    //     console.log(res.data, '!!!!!!!!!!')
    //     unSign = Controller.getSignList(res.data) ? Controller.getSignList(res.data) : fakeList
    //   })
    //   .catch(error => {
    //     console.log(error, '获取签到列表接口返回报错')
    //     unSign = fakeList
    //   })
    console.log("!!!!!!!假数据", unSign)
    this.setState({
      unsignList: unSign
    })

  }

  render() {
    return (

        <div className="App">
          <div className="calendar">
            <Space wrap>
              <Button type="primary" onClick={() => {
                this.setState({
                  // unsignList: [...this.state.unsignList, 28]
                  a: "1"
                }, () => {
                  console.log(this.state.a, "a")
                })
              }}>签到</Button>
              <Button type="primary">补签</Button>
              <Button type="primary">最大连续签到天数</Button>
            </Space>
            <Calendar
                onPanelChange={this.onPanelChange}
                cellRender={this.cellRender}
            />
          </div>

        </div>

    );
  }

}

export default App;
