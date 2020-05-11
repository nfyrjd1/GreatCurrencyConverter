import React from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';

const Valute = React.forwardRef(({ imageSource, value, placeholder, onEdit, valute }, ref) => (
    <View style={styles.container}>

        <View style={styles.countryContainer}>
            <Image style={styles.image} source={imageSource} />
            <Text style={styles.text}>{valute}</Text>
        </View>

        <TextInput
            ref={ref}
            style={styles.input}
            onChangeText={onEdit}
            placeholder={placeholder}
            value={value}
            keyboardType="numeric"
        />
    </View>
));

const styles = StyleSheet.create({
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

export default Valute;