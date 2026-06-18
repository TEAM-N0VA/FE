declare module 'react-native-wheel-scrollview-picker' {
  import { ComponentType, ReactNode } from 'react';
  import { ScrollViewProps, ViewProps } from 'react-native';

  export type ScrollPickerProps<ItemT extends string | number> = {
    style?: ViewProps['style'];
    dataSource: Array<ItemT>;
    selectedIndex?: number;
    onValueChange?: (value: ItemT | undefined, index: number) => void;
    renderItem?: (data: ItemT, index: number, isSelected: boolean) => ReactNode;
    highlightColor?: string;
    highlightBorderWidth?: number;
    itemTextStyle?: object;
    activeItemTextStyle?: object;
    itemHeight?: number;
    wrapperHeight?: number;
    wrapperBackground?: string;
    scrollViewComponent?: ComponentType<ScrollViewProps>;
  } & ScrollViewProps;

  const ScrollPicker: <ItemT extends string | number>(
    props: ScrollPickerProps<ItemT>
  ) => ReactNode;

  export default ScrollPicker;
}
