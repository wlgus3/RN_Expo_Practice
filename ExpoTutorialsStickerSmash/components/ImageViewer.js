import { StyleSheet, Image } from "react-native";

//! 사진 뷰어 -> 자식 컴포넌트에게 동일하게 placeholderImageSource와 같이 파일정보 전달 할 수 있음
export default function ImageViewer({ placeholderImageSource }) {
    if (typeof placeholderImageSource === "object") {
        placeholderImageSource = placeholderImageSource.assets;
    }
    return <Image source={placeholderImageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        // height: "90%",//! %도 가능
        height: 440,

        borderRadius: 18,
    },
});
