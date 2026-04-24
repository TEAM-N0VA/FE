import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';


interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  shadow?: boolean;
}

const Card = ({ children, onPress, style, shadow = true }: CardProps) => {
  const combinedStyle = [
    styles.card,
    shadow ? styles.shadow : null, 
    style
  ];

  if (onPress) {
    return (
      <TouchableOpacity 
        style={combinedStyle} 
        onPress={onPress} 
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={combinedStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.large, 
    padding: Layout.spacing.cardPadding,     
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
});

export default Card;