import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Animated,
    Keyboard,
} from "react-native";

import { styles } from "./styles";
import logoapp from "../../assets/User.png";

export function TelaLogin() {

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 100 }));
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState(new Animated.ValueXY({ x: 155, y: 155 }));

    useEffect(() => {
        KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 1,
                speed: 4,
                bounciness: 20,
                useNativeDriver: false
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false
            })
        ]).start();
    }, []);

    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 70,
                duration: 100,
                useNativeDriver: false
            }),

            Animated.timing(logo.y, {
                toValue: 70,
                duration: 100,
                useNativeDriver: false
            }),
        ]).start();
    }

    function keyboardDidHide() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 155,
                duration: 100,
                useNativeDriver: false
            }),

            Animated.timing(logo.y, {
                toValue: 155,
                duration: 100,
                useNativeDriver: false
            }),
        ]).start();
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">

            <View style={styles.containerLogo}>
                <Animated.Image
                    style={{
                        borderRadius: 100,
                        width: logo.x,
                        height: logo.y
                    }}
                    source={logoapp} />
            </View>

            <Animated.View
                style={[styles.container2, {
                    opacity: opacity,
                    transform: [
                        { translateY: offset.y }
                    ]
                }
                ]}
            >

                <TextInput style={styles.input}
                    placeholder="Email:"
                    autoCorrect={false}
                    anChangeText={() => { }}
                />

                <TextInput style={styles.input}
                    placeholder="Senha:"
                    autoCorrect={false}
                    anChangeText={() => { }}
                />

                <TouchableOpacity style={styles.botao1}>
                    <Text style={styles.textLink}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botao3}>
                    <Text style={styles.textoBotao}>Enter</Text>
                </TouchableOpacity>

            </Animated.View>

        </KeyboardAvoidingView>
    );
}