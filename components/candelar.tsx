import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th. 1',
    'Th. 2',
    'Th. 3',
    'Th. 4',
    'Th. 5',
    'Th. 6',
    'Th. 7',
    'Th. 8',
    'Th. 9',
    'Th. 10',
    'Th. 11',
    'Th. 12',
  ],
  dayNames: [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
};

LocaleConfig.defaultLocale = 'vi';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [weekDays, setWeekDays] = useState([]); // Danh sách 7 ngày trong tuần
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(new Date()); // Ngày đầu tiên của tuần
  const [currentMonthYear, setCurrentMonthYear] = useState(''); // Chuỗi tháng và năm hiện tại

  useEffect(() => {
    // Khi component được render, tự động tạo danh sách 7 ngày từ thứ Hai đến Chủ Nhật
    generateWeekDays(firstDayOfWeek);
    updateCurrentMonthYear(firstDayOfWeek);
  }, [firstDayOfWeek]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onDayPress = day => {
    setSelectedDate(day.dateString);
    generateWeekDays(new Date(day.dateString)); // Tạo danh sách 7 ngày từ ngày đã chọn
    updateCurrentMonthYear(new Date(day.dateString));
  };

  const generateWeekDays = selectedDate => {
    const startOfWeek = getStartOfWeek(selectedDate); // Lấy ngày bắt đầu của tuần
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date.getDate()); // Lấy phần ngày của ngày trong tuần
    }
    setWeekDays(days);
  };

  const getStartOfWeek = date => {
    const dayOfWeek = date.getDay(); // Lấy thứ của ngày
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Tính ngày bắt đầu của tuần
    const startOfWeek = new Date(date.setDate(diff));
    return startOfWeek;
  };

  const renderHeader = date => {
    const monthYearString = `${
      LocaleConfig.locales['vi'].monthNames[date.getMonth()]
    } năm ${date.getFullYear()}`;
    return <Text style={styles.headerText}>{monthYearString}</Text>;
  };

  const closeModal = () => {
    setSelectedDate(''); // Đặt lại selectedDate để không có ngày nào được chọn
    setWeekDays([]); // Đặt lại danh sách 7 ngày
    toggleModal(); // Đóng modal
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(firstDayOfWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setFirstDayOfWeek(nextWeek);
  };

  const handlePreviousWeek = () => {
    const previousWeek = new Date(firstDayOfWeek);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setFirstDayOfWeek(previousWeek);
    generateWeekDays(previousWeek);
  };

  const updateCurrentMonthYear = date => {
    const monthYearString = `${
      LocaleConfig.locales['vi'].monthNames[date.getMonth()]
    } năm ${date.getFullYear()}`;
    setCurrentMonthYear(monthYearString);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.weekDayItem}>
            <Text>{day}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={handlePreviousWeek} />
        <Text>{currentMonthYear}</Text>
        <Button title="Next" onPress={handleNextWeek} />
      </View>
      <Button title="Mở Lịch" onPress={toggleModal} />

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.7}
        onBackdropPress={toggleModal} // Bấm ra ngoài để đóng modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: {selected: true, selectedColor: 'blue'},
            }}
            theme={{
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#ff8c00', // Màu cam cho tiêu đề
              selectedDayBackgroundColor: '#ff8c00', // Màu nền khi chọn ngày
              selectedDayTextColor: '#ffffff', // Màu ch
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'black',
              monthTextColor: 'blue',
              textMonthFontWeight: 'bold',
            }}
            renderHeader={renderHeader} // Sử dụng renderHeader để hiển thị phần tiêu đề tùy chỉnh
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    width: '83%', // 5/6 của màn hình
    height: '55%', // Chiều cao tùy chọn
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 20,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20,
    flexWrap: 'wrap', // Cho phép các ô vuông ngày tự xuống dòng khi không đủ chỗ
  },
  weekDayItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: 40,
    height: 40,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
});

export default MyCalendar;
