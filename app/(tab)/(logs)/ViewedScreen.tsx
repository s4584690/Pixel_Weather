import React, { useCallback } from 'react';
import GradientTheme from '@/components/GradientTheme';
import PostList from '@/components/PostList';
import { usePosts } from '@/hooks/usePosts';
import ErrorMessage from '@/components/ErrorMessage';
import { ActivityIndicator } from 'react-native';
import * as ColorScheme from '@/constants/ColorScheme';
import { useRouter } from 'expo-router';
import * as RN from 'react-native';

export default function ViewedScreen() {
    const { data, likedPosts, reportedPosts, selfPosts, refreshing, loading, error,
        handleToggleLike, handleDeletePost, handleReportPost, fetchPosts, fetchSelfPosts,
        fetchLikedPosts, fetchReportedPosts } = usePosts('/view', true); // includeSelfPosts is true
    const router = useRouter();

    const onRefresh = useCallback(() => {
        fetchPosts();
        fetchSelfPosts();
        fetchLikedPosts();
        fetchReportedPosts();
    }, []);

    if (loading) {
        return <GradientTheme>
            <ActivityIndicator
                size="large"
                color={ColorScheme.BTN_BACKGROUND}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
            </GradientTheme>;
    }

    if (error) {
        return <ErrorMessage error={error} onRetry={onRefresh} />;
    }

    return (
        <GradientTheme>
            <PostList
                data={data}
                refreshing={refreshing}
                onRefresh={onRefresh}
                likedPosts={likedPosts}
                reportedPosts={reportedPosts}
                selfPosts={selfPosts}  // Pass selfPosts
                handleToggleLike={handleToggleLike}
                handleReportPost={handleReportPost}
                handleDeletePost={handleDeletePost}
                router={router}
                section='view'
            />
            {/*<RN.Text style={{color: 'grey'}} onPress={() => RN.Linking.openURL('https://wallpapers.com/png/open-hand-gesture-emoji-x6a7if3pzucpm0v8.html')}>*/}
            {/*    Wallpaper by se224340 on Wallpapers.com*/}
            {/*</RN.Text>*/}
        </GradientTheme>
    );
}
