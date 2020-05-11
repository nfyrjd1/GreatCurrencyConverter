import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Valute from './Valute';

const splitBits = (number) => {
    return number.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
}

export default function Converter({ currency }) {
    const [rubles, setRubles] = useState("");
    const [dollars, setDollars] = useState("");
    let rubInput = React.createRef();
    useEffect(() => {
        rubInput.current.focus();
    }, []);

    const vallidateText = (text) => {
        text = text.replace(/ /g, "");

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

        setDollars(`${splitBits((rubles / currency).toFixed(2))}`)
        setRubles(splitBits(rubles));
    }

    const onEditUsd = (dollars) => {
        let vallidated = vallidateText(dollars);
        if (vallidated === undefined) return;
        dollars = vallidated;

        setRubles(`${splitBits((dollars * currency).toFixed(2))}`);
        setDollars(splitBits(dollars));
    }

    return (
        <View style={styles.converter}>
            <Valute
                imageSource={require("../../assets/r.png")}
                onEdit={onEditRub}
                value={dollars == "" ? "" : rubles}
                placeholder="Ваши рубли"
                valute="RUB"
                ref={rubInput}
            />
            <Valute
                imageSource={require("../../assets/u.png")}
                onEdit={onEditUsd}
                value={rubles == "" ? "" : dollars}
                placeholder="Ваши доллары"
                valute="USD"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    converter: {
        flex: 3,
        backgroundColor: '#2b2b2b',
        alignItems: 'center',
    }
});