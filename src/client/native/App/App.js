import React, { useState, useEffect } from 'react';
import { View, StatusBar, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';
import { AdMobBanner } from 'expo-ads-admob';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Updates from 'expo-updates';

import styles from './styles';

const { showBannerAd, ad, webview: { uri, userAgent }, splashUri } = require('./config');

// eslint-disable-next-line no-undef
const env = __DEV__ ? "test" : "production"
const { bannerAdUnitId } = ad[env];

const App = () => {

  const [ backgroundColor, setBackgroundColor ] = useState('#000000');
  const [ pushToken, setPushToken ] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setBackgroundColor('#ffffff');
      // eslint-disable-next-line no-magic-numbers
    }, 4000);

    setToken();
    checkForUpdates();
  });

  const setToken = async () => {
    try {
      const token = await registerForPushNotificationsAsync();
      setPushToken(token);
    } catch (e) {
      // handle or log error
    }
  }

  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Updates.reloadFromCache();
      }
    } catch (e) {
      // handle or log error
    }
  }

  return <View style={styles.app}>
    <StatusBar barStyle="light-content" />
    <WebView
      userAgent={userAgent}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      scrollEnabled={true}
      renderLoading={Loader}
      injectedJavaScript={`window.pushToken='${pushToken}'`}
      bounce={false}
      useWebKit={true}
      source={{ uri }}
      style={{ ...styles.webView, backgroundColor }} />
    {showBannerAd && <BannerAd />}
  </View>
};

const BannerAd = () => AdMobBanner && <AdMobBanner
  style={styles.bannerAd}
  bannerSize="fullBanner"
  adUnitID={bannerAdUnitId}
  testDeviceID="EMULATOR"
  servePersonalizedAds
  onDidFailToReceiveAdWithError={() => console.log('error from ad')} />;

const Loader = () => <ImageBackground source={{ uri: splashUri }} style={styles.loader} />;

const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return null;

  let token = null;

  try {
    token = await Notifications.getExpoPushTokenAsync();
  } catch (e) {
    console.log(e);
  }

  return token;
};

export default App;
