import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Button, Text } from 'react-native';

const CustomScrollPicker = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    return (
          <DateTimePicker
            value={date}
            mode={"time"}
            onChange={onChange}
            display='spinner'
        />
    );
}

export default CustomScrollPicker