import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Loading () {
    return (
        <View style={styles.loading}>
            <Text style={styles.text}>Загрузка...</Text>
            <Image style={styles.image} source={require('../../assets/loading.gif')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
      backgroundColor: '#2b2b2b',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    text: {
        textAlign: 'center',
        color: '#eee',
        fontSize: 20
    },
    image: {
        marginTop: 10
    }
  });