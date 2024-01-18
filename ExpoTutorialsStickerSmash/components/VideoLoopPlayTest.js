// import { Platform } from "react-native";
// import React, { useState, useEffect } from "react";
// import { View, Text, Button } from "react-native";
// import { Video } from "expo-av";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";

// export default function VideoPickerExample() {
//     const defaultVideo = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
//     const defaultVideo2 = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
//     const defaultVideo3 = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";

//     return (
//         <View style={{ alignItems: "center", justifyContent: "center" }}>
//             {/* <Button title="Pick a video from the media library" onPress={pickVideo} /> */}

//             <View style={{ width: "100%", height: "auto", aspectRatio: 16 / 9 }}>
//                 <Text> Video Loop Play Test</Text>
//                 {Platform.OS === "web" ? (
//                     <video src={defaultVideo} style={{ width: "100%", height: "100%" }} controls autoPlay loop />
//                 ) : (
//                     <Video source={{ uri: defaultVideo }} style={{ width: "100%", height: "100%" }} useNativeControls resizeMode="cover" shouldPlay isLooping />
//                 )}
//             </View>
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
    const videoList = [
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",

        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [currentVideo, setCurrentVideo] = useState(videoList[currentVideoIndex]);

    const handleVideoEnd = () => {
        if (currentVideoIndex < videoList.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
        } else {
            setCurrentVideoIndex(0);
        }
    };

    useEffect(() => {
        setCurrentVideo(videoList[currentVideoIndex]);
    }, [currentVideoIndex]);

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ width: "100%", height: "auto", aspectRatio: 16 / 9 }}>
                <Text> Video Loop Play Test333333333</Text>
                {Platform.OS === "web" ? (
                    <video src={currentVideo} style={{ width: "100%", height: "100%" }} controls autoPlay loop onEnded={handleVideoEnd} />
                ) : (
                    <Video
                        source={{ uri: currentVideo }}
                        style={{ width: "100%", height: "100%" }}
                        useNativeControls
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) handleVideoEnd();
                        }}
                    />
                )}
            </View>
        </View>
    );
}
