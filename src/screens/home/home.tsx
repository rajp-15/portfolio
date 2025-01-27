import { FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './home_style'
import UserAppBar from './components/header';
import SizeBox from '../../constants/sizebox';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '../../components/card/card';
import { useGetPost } from '../../apis/apis';
import Loader from '../../components/loader/loader';
import { useSelector } from 'react-redux';
import Colors from '../../constants/colors';

const Home = () => {
    const insets = useSafeAreaInsets();
    const { getPosts, loading: fetchPostLoading } = useGetPost(); // call get post's api hook

    // Get user data from Redux store
    const user = useSelector((state: any) => state.auth.user);

    const [posts, setPosts] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);

    // API call for get user profile
    const fetchPostData = () => {
        getPosts()
            .then(response => {
                setPosts(response);
                setIsRefresh(false);
            })
            .catch(error => {
                console.error('Error fetching post data:', error);
            });
    };

    useEffect(() => {
        fetchPostData();
    }, []);

    // handle refresh
    function onRefresh() {
        setIsRefresh(true);
        fetchPostData();
    }

    // render cards to show posts data
    function renderItem({ item }: any) {
        return (
            <>
                <Card title={item.title} desc={item.body} />
                <SizeBox height={10} />
            </>
        )
    }

    return (
        <View style={styles.container}>
            {/* loading while data is fetching */}
            <Loader loading={fetchPostLoading} />
            <SizeBox height={insets.top} />

            {/* Header */}
            <UserAppBar username={user.username} userLocation={user.city} userProfileImg={user.profileImg} />
            <SizeBox height={10} />

            {/* Render posts */}
            <FlatList
                data={posts}
                keyExtractor={(item: any, index: any) => item?.id.toString()}
                renderItem={renderItem}
                style={styles.ListContainer}
                showsVerticalScrollIndicator={false}
                refreshing={isRefresh}
                onRefresh={onRefresh}
                ListFooterComponent={<SizeBox height={10} />}
            />
        </View>
    )
}

export default Home