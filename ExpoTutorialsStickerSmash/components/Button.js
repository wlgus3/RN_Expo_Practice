// import { StyleSheet, View, Pressable, Text } from "react-native";

// export default function Button({ label }) {
//     //! RN의
//     return (
//         <View style={styles.buttonContainer}>
//             <Pressable style={styles.button} onPress={() => alert("You pressed a button.")}>
//                 <Text style={styles.buttonLabel}>{label}</Text>
//             </Pressable>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     buttonContainer: {
//         width: 320,
//         height: 48,
//         marginHorizontal: 20,
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 3,
//         backgroundColor: "grey",
//     },
//     button: {
//         borderRadius: 10,
//         width: "100%",
//         height: "100%",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "row",
//     },
//     buttonIcon: {
//         paddingRight: 8,
//     },
//     buttonLabel: {
//         color: "blue",
//         fontSize: 16,
//     },
// });

//!  @expo/vector-icons/FontAwesome 사용-> 이모티콘 사용할 수 있음
import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({ label, theme, onPress }) {
    if (theme === "primary") {
        //onPress={onPress} 형태로 onClick 구현
        return (
            <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
                <Pressable style={[styles.button, { backgroundColor: "#fff" }]} onPress={onPress}>
                    <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
                    <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 48,
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        backgroundColor: "yellow",
    },
    button: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    },
});
