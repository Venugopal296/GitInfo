import React, { Component } from 'react';
import { Animated, I18nManager, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class GmailStyleSwipeableRow extends Component {
  _swipeableRow: any;

  renderRightActions = (
    progress: any,
    dragX: {
      interpolate: (arg0: {
        inputRange: number[];
        outputRange: number[];
      }) => any;
    }
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
    });
    return (
      <RectButton style={styles.rightAction} onPress={this.close}>
        <AnimatedIcon
          name='delete-forever'
          size={30}
          color='#fff'
          style={[styles.actionIcon]}
        />
      </RectButton>
    );
  };

  updateRef = (ref: any) => {
    this._swipeableRow = ref;
  };

  close = () => {
    this._swipeableRow.close();
  };
  
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={80}
        rightThreshold={41}
        renderRightActions={this.renderRightActions}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: 'rgba(193, 4, 4, 1)',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
