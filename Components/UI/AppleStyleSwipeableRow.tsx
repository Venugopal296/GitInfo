import React from 'react';
import { Animated, I18nManager, StyleSheet, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type AppleStyleSwipeableRowProps = {
  deleteEntry: () => void;
};

const AppleStyleSwipeableRow1: React.FC<AppleStyleSwipeableRowProps> = props => {
  let _swipeableRow: any;

  const renderRightAction = (color: string) => {
    const pressHandler = () => {
      close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <AnimatedIcon
            name='delete-forever'
            size={30}
            color='#fff'
            style={[styles.actionIcon]}
          />
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress: any) => (
    <View
      style={{
        width: 70,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}
    >
      {renderRightAction('rgba(193, 4, 4, 1)')}
    </View>
  );

  const updateRef = (ref: any) => {
    _swipeableRow = ref;
  };

  const close = () => {
    _swipeableRow.close();
    props.deleteEntry();
  };
  const { children } = props;
  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
});

export default AppleStyleSwipeableRow1;
