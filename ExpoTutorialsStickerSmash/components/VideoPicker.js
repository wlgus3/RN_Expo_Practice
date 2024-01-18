// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Text, Button, Image, Pressable } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// export default function VideoPicker() {
//     const [selectedVideo, setSelectedVideo] = useState(null);

//     useEffect(() => {
//         (async () => {
//             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//             if (status !== "granted") {
//                 console.error("Permission to access media library was denied");
//             }
//         })();
//     }, []);

//     const pickVideo = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//             allowsEditing: true,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             console.log(result);
//             setSelectedVideo(result.uri);
//         }
//     };

//     return (
//         <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//             <Pressable title="Pick a video from media library" style={[styles.button, { backgroundColor: "#fff" }]} onPress={pickVideo} />
//             {selectedVideo && (
//                 <View>
//                     <Text>Selected Video:</Text>
//                     <Image source={{ uri: selectedVideo }} style={{ width: 200, height: 200 }} />
//                 </View>
//             )}
//         </View>
//     );
// }
// const styles = StyleSheet.create({
//     button: {
//         borderRadius: 10,
//         width: "100%",
//         height: "100%",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "row",
//     },
// });

// import React, { useState, useEffect } from "react";
// import { View, Text, Button, Image } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Video } from "expo-av";
// import * as FileSystem from "expo-file-system";

// export default function VideoPickerExample() {
//     const [selectedVideo, setSelectedVideo] = useState(null);

//     useEffect(() => {
//         (async () => {
//             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//             if (status !== "granted") {
//                 console.error("Permission to access media library was denied");
//             }
//         })();
//     }, []);

//     const pickVideo = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//             allowsEditing: true,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             const videoUri = await saveVideoToFile(result.base64);
//             setSelectedVideo(videoUri);
//             // console.log(result.uri);
//             // setSelectedVideo(result.uri);
//         }
//     };

//     // 추가된 부분: Base64 데이터를 파일로 저장하고 파일의 URI를 반환
//     const saveVideoToFile = async (base64Data) => {
//         const fileUri = `${FileSystem.documentDirectory}video.mp4`;
//         await FileSystem.writeAsStringAsync(fileUri, base64Data, {
//             encoding: FileSystem.EncodingType.Base64,
//         });
//         return fileUri;
//     };

//     return (
//         <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//             <Button title="Pick a video from media library" onPress={pickVideo} />
//             {selectedVideo && (
//                 <View>
//                     <Text>Selected Video:</Text>
//                     {/* <Video source={{ uri: selectedVideo }} style={{ width: 200, height: 200 }} useNativeControls resizeMode="contain" />{" "} */}
//                     <Video source={{ uri: selectedVideo }} style={{ width: 200, height: 200 }} useNativeControls resizeMode="contain" />
//                 </View>
//             )}
//         </View>
//     );
// }

import { Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function VideoPickerExample() {
    const [selectedVideo, setSelectedVideo] = useState(null);
    // const defaultVideo = "https://www.youtube.com/shorts/1Mn3C_FjtTg";
    // const defaultVideo = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    const defaultVideo = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                console.error("Permission to access media library was denied");
            }
        })();
    }, []);

    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.ed) {
            const videoUri = await saveVideoToFile(result.base64);
            setSelectedVideo(videoUri);
        }
    };

    const saveVideoToFile = async (base64Data) => {
        // 파일 저장은 Expo SDK에서만 가능하므로 웹에서는 다른 방식 사용
        if (FileSystem.documentDirectory) {
            // Expo SDK 환경 (앱)
            const fileUri = `${FileSystem.documentDirectory}video.mp4`;
            await FileSystem.writeAsStringAsync(fileUri, base64Data, {
                encoding: FileSystem.EncodingType.Base64,
            });
            return fileUri;
        } else {
            // 웹 환경
            // const blob = base64toBlob(base64Data, "video/mp4");
            const blob = base64toBlob(cleanupBase64Data(base64Data), "video/mp4");
            const url = URL.createObjectURL(blob);
            return url;
        }
    };
    // Base64 데이터 정리 함수
    const cleanupBase64Data = (base64Data) => {
        // base64Data가 존재하는지 확인 후 진행
        if (base64Data) {
            // 부가적인 정보 제거 (예: data:image/jpeg;base64,)
            const index = base64Data.indexOf(",");
            return index !== -1 ? base64Data.slice(index + 1) : base64Data;
        } else {
            // base64Data가 없을 경우 처리 (예: 기본값 반환 또는 오류 처리)
            console.error("base64Data is undefined or null");
            return ""; // 또는 다른 처리 방법을 선택
        }
    };

    // Base64 to Blob 변환 함수 (웹에서 사용)
    const base64toBlob = (base64Data, contentType) => {
        const sliceSize = 512;
        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };

    // return (
    //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //         <Button title="Pick a video from the media library" onPress={pickVideo} />
    //         {selectedVideo ? (
    //             <View>
    //                 <Text>Selected Video:</Text>
    //                 <Video source={{ uri: selectedVideo }} style={{ width: "100%", aspectRatio: 16 / 9 }} useNativeControls resizeMode="cover" />
    //             </View>
    //         ) : (
    //             <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%" }}>
    //                 <Text>Default Video</Text>
    //                 <Video source={{ uri: defaultVideo }} style={{ width: "100%", aspectRatio: 16 / 9 }} useNativeControls resizeMode="cover" isLooping />
    //             </View>
    //         )}
    //     </View>
    // );

    // return (
    //     // OS여부를 체크해서 다르게 렌더링 되도록 ->스타일 요소를 더 쉽게 제어하기 위해 html5의 video태그를 사용
    //     // RN의 Video 컴포넌트는 웹 적용시 오작동 경우가 있음
    //     <View style={{ alignItems: "center", justifyContent: "center" }}>
    //         <Button title="Pick a video from the media library" onPress={pickVideo} />
    //         {selectedVideo ? (
    //             <View style={{ width: "100%", height: "auto", aspectRatio: 16 / 9 }}>
    //                 <Text>선택 Video:</Text>
    //                 {Platform.OS === "web" ? (
    //                     <video src={selectedVideo} style={{ width: "100%", height: "100%" }} controls />
    //                 ) : (
    //                     <Video source={{ uri: selectedVideo }} style={{ width: "100%", height: "100%" }} useNativeControls resizeMode="cover" />
    //                 )}
    //             </View>
    //         ) : (
    //             <View style={{ width: "90%", height: "auto", aspectRatio: 16 / 9 }}>
    //                 <Text>기본 Video:</Text>
    //                 {Platform.OS === "web" ? (
    //                     <video src={defaultVideo} style={{ width: "100%", height: "100%" }} controls />
    //                 ) : (
    //                     <Video source={{ uri: defaultVideo }} style={{ width: "100%", height: "100%" }} useNativeControls resizeMode="cover" isLooping />
    //                 )}
    //             </View>
    //         )}
    //     </View>
    // );

    return (
        // OS여부를 체크해서 다르게 렌더링 되도록 ->스타일 요소를 더 쉽게 제어하기 위해 html5의 video태그를 사용
        // RN의 Video 컴포넌트는 웹 적용시 오작동 경우가 있음
        //HTML5의 video 태그에는 'autoPlay'와 'loop' 속성을 추가하고, expo의 Video 컴포넌트에는 'shouldPlay'와 'isLooping' 속성을 추가
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Button title="Pick a video from the media library" onPress={pickVideo} />
            {selectedVideo ? (
                <View style={{ width: "100%", height: "auto", aspectRatio: 16 / 9 }}>
                    <Text>Selected Video:</Text>
                    {Platform.OS === "web" ? (
                        <video src={selectedVideo} style={{ width: "100%", height: "100%" }} controls autoPlay loop />
                    ) : (
                        <Video
                            source={{ uri: selectedVideo }}
                            style={{ width: "100%", height: "100%" }}
                            useNativeControls
                            resizeMode="cover"
                            shouldPlay
                            isLooping
                        />
                    )}
                </View>
            ) : (
                <View style={{ width: "100%", height: "auto", aspectRatio: 16 / 9 }}>
                    <Text>Default Video</Text>
                    {Platform.OS === "web" ? (
                        <video src={defaultVideo} style={{ width: "100%", height: "100%" }} controls autoPlay loop />
                    ) : (
                        <Video
                            source={{ uri: defaultVideo }}
                            style={{ width: "100%", height: "100%" }}
                            useNativeControls
                            resizeMode="cover"
                            shouldPlay
                            isLooping
                        />
                    )}
                </View>
            )}
        </View>
    );
}
