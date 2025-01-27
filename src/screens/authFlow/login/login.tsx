import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SizeBox from '../../../constants/sizebox';
import Button from '../../../components/button/custom_btn';
import Colors from '../../../constants/colors';
import styles from './login_style';
import TextBox from '../../../components/textInput/custom_textinput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../state/slices/authSlice';

interface Loginscreenprops {
    navigation: {
        navigate: any;
        replace: any
    };
}

const Login: React.FC<Loginscreenprops> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

    // Sample user object
    let user = {
        id: 1,
        profilePic: '',
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        city: "Gwenborough",
        phone: "1234567890",
    };

    // Form validations
    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    return (
        <View style={styles.container}>
            {/* Set status bar color and style */}
            <StatusBar
                backgroundColor={Colors.pastelPink}
                barStyle={'dark-content'}
            />
            <View style={{ height: insets.top }} />
            <SizeBox height={40} />
            {/* Show welcome text */}
            <Text style={styles.welcomeText}>Welcome back !</Text>
            <SizeBox height={20} />

            {/* Formik for form handling */}
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('Form Values:', values);

                    // Update user object with typed username
                    const updatedUser = { ...user, username: values.username };

                    // Dispatch action to set user in Redux store
                    dispatch(setUser(updatedUser));

                    // Call your login API or navigate to another screen
                    navigation.replace('BottomNavigation');
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                }) => (
                    <>
                        {/* Input field for username */}
                        <TextBox
                            label="Username"
                            placeholder="Enter Your Username"
                            keyboardType="email-address"
                            value={values.username}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            isError={touched.username && !!errors.username}
                            errorText={touched.username ? errors.username : ''}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <SizeBox height={20} />
                        {/* Input field for password */}
                        <TextBox
                            label="Password"
                            placeholder="Enter Your Password"
                            secureTextEntry
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            isError={touched.password && !!errors.password}
                            errorText={touched.password ? errors.password : ''}
                        />
                        <SizeBox height={60} />
                        {/* Button to trigger login */}
                        <Button
                            text="Login"
                            backgroundColor={Colors.primaryColor}
                            onPress={handleSubmit}
                            loading={isSubmitting}
                            color={Colors.whiteColor}
                        />
                        <SizeBox height={10} />
                    </>
                )}
            </Formik>
        </View>
    );
};

export default Login;
