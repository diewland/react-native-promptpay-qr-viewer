'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  TouchableOpacity,
  Linking,
  AlertIOS,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import PPText2Obj from './pptext2obj';

export default class App extends Component<{}> {
  onSuccess(e) {
    var obj = PPText2Obj.decode(e.data);
    if(obj){
      var s = [];
      if(obj['59']){
        s.push("Merchant Name : " + obj['59']);
      }
      s.push("QR Type : " + PPText2Obj.QR_TYPE[obj['01']]);
      s.push("Account Type : " + PPText2Obj.ACCOUNT_TYPE[obj['29_acc_type']]);
      s.push("Account No : " + obj['29_acc_no']);
      if(obj['54']){
        s.push("Amount : " + obj['54']);
      }
      else {
        s.push("Amount : N/A");
      }
      console.log(obj);
      AlertIOS.alert(s.join("\n"));
    }
    else {
      AlertIOS.alert(
        "Invalid format\n"
        + "\n"
        + content
      );
    }
  }

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: QRCodeScanner,
          title: 'PromptPay QR-Code Viewer',
          passProps: {
            onRead: this.onSuccess.bind(this),
          },
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  buttonTouchable: {
    padding: 16,
  },
});
