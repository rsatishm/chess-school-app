import { CalendarOutlined } from '@ant-design/icons'

export const Calendar = ()=>{
    return (
      <div className="calendar inner">
        <div className="container">
          <div className="coming-soon">
            <CalendarOutlined type="calendar"/>
            <h3>Coming Soon</h3>
          </div>
        </div>
      </div>
    )
  }