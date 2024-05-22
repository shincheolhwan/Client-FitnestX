import React from 'react';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import moment from "moment"; // 커스텀 스타일을 위한 CSS 파일

interface CalendarProps {
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar: React.FC<CalendarProps> = ({ selectedDate, setSelectedDate }) => {
    const handleDateChange = (date: Value) => {
        if (date instanceof Date) {
            setSelectedDate(date);
        } else if (Array.isArray(date) && date[0] instanceof Date) {
            setSelectedDate(date[0]);
        } else {
            setSelectedDate(null);
        }
    };

    return (
        <div className="calendar-container">
            <CalendarComponent
                formatDay={(locale, date) => moment(date).format("DD")}
                showNeighboringMonth={false}
                onChange={handleDateChange}
                value={selectedDate}
                selectRange={false} // 날짜를 하루씩만 선택할 수 있도록 설정
                next2Label={null}
                prev2Label={null}
            />
        </div>
    );
};

export default Calendar;
