import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header({ currency, date }) {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>{`Курс доллара: ${currency} руб`}</Text>
            <Text style={styles.text}>{`(по курсу ЦБ РФ на ${date})`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 2,
        backgroundColor: '#2b2b2b',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    text: {
        textAlign: 'center',
        color: '#eee',
        fontSize: 20
    }
});