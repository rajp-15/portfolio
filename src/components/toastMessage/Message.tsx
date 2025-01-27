import React from 'react';
import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import Colors from '../../constants/colors';

interface MessageProps {
  isSuccess?: boolean,
  isWarning?: boolean,
  visible?: any;
  onDismissSnackBar?: any;
  message?: string;
}

function Message({ isSuccess, isWarning, visible, onDismissSnackBar, message }: MessageProps) {
  let backgroundColor = Colors.error;

  if (isSuccess) backgroundColor = Colors.success;
  else if (isWarning) backgroundColor = Colors.warning;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignSelf: 'center',
      }}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        style={{ backgroundColor: isSuccess ? Colors.success : Colors.error }}
        theme={{ colors: { inversePrimary: 'white', surface: 'white' } }}>
        {message}
      </Snackbar>
    </View>
  );
}

export default Message;
