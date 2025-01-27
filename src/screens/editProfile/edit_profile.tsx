import { View, Text, TouchableOpacity, Image, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './edit_profile_style'
import SizeBox from '../../constants/sizebox'
import Colors from '../../constants/colors'
import { Images } from '../../constants/images'
import TextBox from '../../components/textInput/custom_textinput'
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '../../components/button/custom_btn'
import { useDispatch, useSelector } from 'react-redux'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { updateUserProfile } from '../../state/slices/authSlice'

const EditProfile = ({ navigation }: any) => {
    const dispatch = useDispatch(); // Initialize dispatch
    // Get user data from Redux store
    const user = useSelector((state: any) => state.auth.user);

    // Validation schema using Yup
    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
            .required('Phone number is required'),
        city: Yup.string().required('City is required'),
        profileImg: Yup.string().required('Profile Image is required')
    });

    // Check and request permissions
    const checkPermission = async (type: 'camera' | 'gallery') => {
        const permission =
            Platform.OS === 'android'
                ? type === 'camera'
                    ? PERMISSIONS.ANDROID.CAMERA
                    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
                : type === 'camera'
                    ? PERMISSIONS.IOS.CAMERA
                    : PERMISSIONS.IOS.PHOTO_LIBRARY;

        const result = await check(permission);

        if (result === RESULTS.GRANTED) {
            return true;
        }

        if (result === RESULTS.DENIED || result === RESULTS.LIMITED) {
            const requestResult = await request(permission);
            return requestResult === RESULTS.GRANTED;
        }

        console.log('Permission Denied', `Please enable ${type} access in settings.`);
        return false;
    };

    // Handle image selection
    const handleImagePicker = async (setFieldValue: (field: string, value: any) => void, type: 'camera' | 'gallery') => {
        const hasPermission = await checkPermission(type);

        if (!hasPermission) {
            return;
        }

        const options: any = {
            mediaType: 'photo',
            quality: 1,
        };

        const result = type === 'camera' ? await launchCamera(options) : await launchImageLibrary(options);

        if (result.didCancel) {
            console.log('Cancelled', 'Image selection was cancelled.');
        } else if (result.assets && result.assets.length > 0) {
            const selectedImageUri: any = result.assets[0].uri;
            setFieldValue('profileImg', selectedImageUri);
        } else {
            console.log('Error', 'An error occurred while selecting an image.');
        }
    };

    // Handle form submission
    const handleSubmit = (values: any) => {
        console.log('Form values:', values);
        // update the store
        dispatch(updateUserProfile(values));
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.appbarView}>
                <TouchableOpacity
                    style={styles.backPress}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={Images.back} style={{ height: 20, width: 20 }} tintColor={Colors.primaryColor} />
                </TouchableOpacity>
                <Text style={styles.headerTextStyle}>{'Edit Profile'}</Text>
                <SizeBox flex={1} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SizeBox height={20} />
                <Formik
                    initialValues={{
                        profileImg: user.profileImg || '',
                        username: user.username || '',
                        name: user.name || '',
                        email: user.email || '',
                        phone: user.phone || '',
                        city: user.city || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                    }) => (
                        <View style={{ marginHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <TouchableOpacity
                                    style={styles.imageBox}
                                    onPress={() => handleImagePicker(setFieldValue, 'camera')}
                                >
                                    <Text style={styles.subTitle}>Take Photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.imageBox}
                                    onPress={() => handleImagePicker(setFieldValue, 'gallery')}
                                >
                                    <Text style={styles.subTitle}>Upload Photo</Text>
                                </TouchableOpacity>
                            </View>
                            <SizeBox height={20} />

                            {values.profileImg && (
                                <Image
                                    source={{ uri: values.profileImg }}
                                    style={{ width: '100%', height: 200, borderRadius: 10 }}
                                />
                            )}
                            <SizeBox height={20} />
                            {/* Username */}
                            <TextBox
                                label="Username"
                                placeholder="Enter Your Username"
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                isError={touched.username && !!errors.username}
                                errorText={touched.username ? (errors.username as string) : undefined}
                            />
                            <SizeBox height={10} />

                            {/* Name */}
                            <TextBox
                                label="Name"
                                placeholder="Enter Your Name"
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                isError={touched.name && !!errors.name}
                                errorText={touched.name ? (errors.name as string) : undefined}
                            />
                            <SizeBox height={10} />

                            {/* Email */}
                            <TextBox
                                label="Email"
                                placeholder="Enter Your Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                isError={touched.email && !!errors.email}
                                errorText={touched.email ? (errors.email as string) : undefined}
                            />
                            <SizeBox height={10} />

                            {/* Phone */}
                            <TextBox
                                label="Phone"
                                placeholder="Enter Your Phone"
                                value={values.phone}
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                isError={touched.phone && !!errors.phone}
                                errorText={touched.phone ? (errors.phone as string) : undefined}
                            />
                            <SizeBox height={10} />

                            {/* City */}
                            <TextBox
                                label="City"
                                placeholder="Enter Your City"
                                value={values.city}
                                onChangeText={handleChange('city')}
                                onBlur={handleBlur('city')}
                                isError={touched.city && !!errors.city}
                                errorText={touched.city ? (errors.city as string) : undefined}
                            />
                            <SizeBox height={20} />

                            {/* Submit Button */}
                            <Button text={'Save'} color={Colors.whiteColor} onPress={handleSubmit} />
                            <SizeBox height={30} />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
}

export default EditProfile