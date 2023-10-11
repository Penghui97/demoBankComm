import { Calendar, Button, Space, Badge ,Modal ,DatePicker} from 'antd';
import {Component, useState} from 'react';
import moment from 'moment'
import Controller from './controller'
import {logDOM} from "@testing-library/react";
const fakeList = [1, 3, 5, 8, 11, 12, 13]



class App extends Component {

  state = {
    unsignList: [],
    currentMonth: new Date().getMonth() + 1,
    a: "",
    isModalOpen: false,
    selectedDate: null
  }


  onPanelChange = async (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    let time = value.format('YYYY-MM-DD')
    let monthChange = time.split('-')[1]
    console.log("monthChange",monthChange)
    let newList = await Controller.requestList(monthChange)
    console.log("updated data",newList)
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

  async componentDidMount() {
    let month = moment().month()
    this.setState({
      month: moment().month()
    }, () => {
      month = this.state.month
    })
    let unSign = await Controller.requestList(month)
    console.log("unsign data", unSign)
    this.setState({
      unsignList: unSign
    })

  }

  showModal = () => {
    this.setState({ isModalOpen: true });
  }
  handleDateSelect = (date) => {
    this.setState({
      selectedDate: date.format('DD')
    });
  }
  handleOk = () => {
    //获取日期选择的值
    console.log('okok')
    console.log(this.state.selectedDate);
    const selectedDate = this.state.selectedDate;
    console.log(selectedDate);
    Controller.supplementary(selectedDate);
    this.setState({ isModalOpen: false });
  }

  handleCancel = () => {
    this.setState({ isModalOpen: false });
  }
  handleDateChange = (date) => {
    this.setState({
      selectedDate: date
    })
  }
  render() {
    return (

      <div className="App">
        <div className="calendar">
          <Space wrap>
            <Button type="primary" onClick={() => {
              this.setState({
                unsignList: [...this.state.unsignList, 28]
              }, () => {
                console.log(this.state.a, "a")
              })
            }}>签到</Button>
            <Button type="primary" onClick={this.showModal}>补签</Button>
            <Modal
                title="补签日期"
                open={this.state.isModalOpen}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
              {/*<DatePicker onChange={this.onChange} />*/}
              <DatePicker
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
              />
            </Modal>

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
