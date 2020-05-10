import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';

export default function Converter({ currency }) {
    const [rubles, setRubles] = useState("");
    const [dollars, setDollars] = useState("");
    let rubInput = React.createRef();
    useEffect(() => {
        rubInput.current.focus();
      }, []);

    const vallidateText = (text) => {
        if (!text.match(/^([0-9]+)([.,]?)([0-9]*)$/) && text != "") return undefined;
        text = text.replace(/\,/g, ".");

        if (text.includes(".")) {
            let afterDote = text.split(".")[1];
            if (afterDote.length > 2) return undefined;
        }

        return text;
    }

    const onEditRub = (rubles) => {
        let vallidated = vallidateText(rubles);
        if (vallidated === undefined) return;
        rubles = vallidated;

        setRubles(rubles);
        setDollars(`${(rubles / currency).toFixed(2)}`)
    }

    const onEditUsd = (dollars) => {
        let vallidated = vallidateText(dollars);
        if (vallidated === undefined) return;
        dollars = vallidated;

        setDollars(dollars);
        setRubles(`${(dollars * currency).toFixed(2)}`);
    }

    return (
        <View style={styles.converter}>
            <View style={styles.container}>
                <View style={styles.countryContainer}>
                    <Image style={styles.image} source={require('../../assets/r.png')} />
                    <Text style={styles.text}>RUB</Text>
                </View>
                <TextInput
                    ref={rubInput}
                    style={styles.input}
                    onChangeText={onEditRub}
                    placeholder="Ваши рубли"
                    value={dollars == "" ? "" : rubles}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.container}>
                <View style={styles.countryContainer}>
                    <Image style={styles.image} source={require('../../assets/u.png')} />
                    <Text style={styles.text}>USD</Text>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={onEditUsd}
                    placeholder="Ваши доллары"
                    value={rubles == "" ? "" : dollars}
                    keyboardType="numeric"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    converter: {
        flex: 3,
        backgroundColor: '#2b2b2b',
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row'
    },
    text: {
        textAlign: 'center',
        color: '#eee',
        fontSize: 20,
    },
    input: {
        textAlign: 'center',
        color: '#eee',
        fontSize: 20,
        flex: 5,
        margin: 4,
    },
    image: {
        width: 25,
        height: 25,
        margin: 2
    },
    countryContainer: {
        flexDirection: 'row',
        flex: 3
    }
});