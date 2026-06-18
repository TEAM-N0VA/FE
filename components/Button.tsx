import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { typography } from '@/constants/typography';
import React, { ReactNode } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle
} from 'react-native';


interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline'; 
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  style,
}: ButtonProps) => {
  
  // 버튼 스타일 결정 로직
  const buttonStyle = [
    styles.button,
    variant === 'primary' ? styles.primaryButton : styles.outlineButton,
    disabled ? styles.disabledButton : null,
    style,
  ];

  // 텍스트 스타일 결정 로직
  const textStyle = [
    styles.text,
    variant === 'primary' ? styles.primaryText : styles.outlineText,
    disabled ? styles.disabledText : null,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle as StyleProp<ViewStyle>}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.white : Colors.secondary} />
      ) : (
        <>
          {icon && icon}
          <Text style={textStyle}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Layout.borderRadius.medium, 
    height: Layout.height.button,
    paddingHorizontal: Layout.spacing.screenPadding,
    gap: Layout.spacing.buttonGap,
  },
  primaryButton: {
    backgroundColor: Colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  disabledButton: {
    backgroundColor: '#E0DCDE',
    borderColor: '#E0DCDE',
  },
  text: {
    ...typography.button
  },
  primaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.secondary 
  },
  disabledText: {
    color: '#A1979B',
  },
});

export default Button;