import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
// import { styled } from "styled-components/native";
import * as ImagePicker from "expo-image-picker";

//! 테스트 하려면 npx expo
//!컴포넌트
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import VideoPickerExample from "./components/VideoPicker";
import VideoLoopPlayTest from "./components/VideoLoopPlayTest";

const PlaceholderImage = require("./assets/images/background-image.png");
console.log(PlaceholderImage);
export default function App() {
    //! styled-component대체하기 위해 StyleSheet사용 , 이미지는 style 지정해줘야 보임

    //! 아래 result.assets[0].uri 부분 -> 원래는 result.uri 형식으로 직접 가져왔으나 Expo SDK 48 이후 지원X 예정
    //! 따라서 앞으로는 assets 배열에 접근해서 위와 같이 작성해야 함
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            setSelectedImage(result.assets[0].uri);
        } else {
            alert("You did not select any image.");
        }
    };

    const [selectedImage, setSelectedImage] = useState(PlaceholderImage); //! useState는 React와 동일
    // const [selectedVideo, setSelectedVideo] = useState(null); //! expo-video-picker 테스트

    return (
        <View style={styles.container}>
            {/* <Text style={{ color: "#FF6369", fontSize: 20 }}>Expo Practice 키즐링</Text>
            <ViewTest>sss</ViewTest>
            <View style={styles.test}>
                <Text>View 는 Div와 달라서 텍스트를 바로 쓰면 안되고</Text>
                <Text style={styles.bigBoldWhiteText}>반드시 Text 태그에 담아서 넣어야 함</Text>
            </View> */}
            {/* <VideoPickerExample></VideoPickerExample> */}
            <Text>테스트중1111</Text>
            <VideoLoopPlayTest></VideoLoopPlayTest>

            <ImageViewer placeholderImageSource={selectedImage}></ImageViewer>

            <View style={styles.footerContainer}>
                <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
                <Button label="Use this photo" />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    test: {
        color: "blue",
        backgroundColor: "#218131",
    },
    bigBoldWhiteText: {
        fontSize: 30, //! fontSize는 반드시 숫자 값으로 변경 px는 안됨
        fontWeight: "bold", //! fontSize,fontWeight 등의 Text 태그에 적용해야 적용됨 View에서는 무효화됨
        color: "#fff",
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: "center",
    },
});

//! nanoid? 관련 에러가 자꾸 발생해서 일단 styled-components는 일단 제거 및 StyleSheet 사용
