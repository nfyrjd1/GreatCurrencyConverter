import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from './src/components/Header';
import Converter from './src/components/Converter';
import Loading from './src/components/Loading';

const getNormalDate = (date) => {
  date = date.substr(0, 10);
  let separateDate = date.split('-');
  return `${separateDate[2]}.${separateDate[1]}.${separateDate[0]}`
}

export default function App() {
  const [currencyText, setCurrencyText] = useState("");
  const [currencyDate, setCurrencyDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getCurrency = () => {
    setIsLoading(true);
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((response) => response.json())
      .then((json) => {
        setCurrencyText(json.Valute.USD.Value);
        setCurrencyDate(getNormalDate(json.Date));
      })
      .catch((error) => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getCurrency(setIsLoading, setCurrencyText, setCurrencyDate);
  }, []);

  let content = (
    <>
      <Header currency={currencyText} date={currencyDate} />
      <Converter currency={currencyText} />
    </>
  );

  if (isLoading) content = (<Loading />)
  if (isError) content = (
    <Text style={styles.error}>
      Возникла ошибка
    </Text>
  )

  return (
    <>
      <View style={styles.contentContainer}>
        {content}
      </View>
      <Button style={styles.button} title="Обновить" onPress={getCurrency} />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
    backgroundColor: '#2b2b2b',
    height: '100%'
  },
  error: {
    fontSize: 24,
    color: '#eee',
    textAlign: "center"
  },
  button: {
    flex: 1,
  }
});
