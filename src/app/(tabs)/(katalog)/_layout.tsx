import React, { useState, FC } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import KategoriyaScreen from './categori/index';
import BrendScreen from './brends';
import ShopsScreen from './shops';

const { width } = Dimensions.get('window');

const ScreenMap = {
  index: KategoriyaScreen,
  brends: BrendScreen,
  shops: ShopsScreen,
};

type ValidRouteName = keyof typeof ScreenMap;

interface TabConfig {
  name: ValidRouteName;
  title: string;
}

interface CustomTabBarProps {
  activeTab: ValidRouteName;
  onTabChange: (tabName: ValidRouteName) => void;
  tabs: TabConfig[];
}

const TABS_CONFIG: TabConfig[] = [
  { name: 'index', title: 'Kategoriya' },
  { name: 'brends', title: 'Brend' },
  { name: 'shops', title: 'Shops' },
];

const CustomTabBar: FC<CustomTabBarProps> = ({ activeTab, onTabChange, tabs }) => {
  const tabCount = tabs.length;
  const indicatorWidth = width / tabCount;
  const activeTabIndex = tabs.findIndex((tab) => tab.name === activeTab);
  const indicatorPosition = activeTabIndex * indicatorWidth;

  return (
    <View className="flex-row bg-[#FBF8FF] border-b border-[#EAEAEA]">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          className="flex-1 items-center py-4"
          onPress={() => onTabChange(tab.name)}
        >
          <Text
            className={`text-sm font-semibold ${
              activeTab === tab.name ? 'text-[#5600B3]' : 'text-[#5600B3]'
            }`}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
      <View
        className="absolute bottom-0 h-[2px] bg-[#5600B3]"
        style={{
          width: indicatorWidth,
          transform: [{ translateX: indicatorPosition }],
        }}
      />
    </View>
  );
};

export default function CustomTopTabsLayout() {
  const [activeTab, setActiveTab] = useState<TabConfig['name']>(TABS_CONFIG[0].name);

  const ActiveScreen = ScreenMap[activeTab];

  const handleTabChange = (tabName: TabConfig['name']) => {
    setActiveTab(tabName);
  };

  return (
    <View className="flex-1 bg-white h-full">
      <View className="h-[40px]" />
      <CustomTabBar activeTab={activeTab} onTabChange={handleTabChange} tabs={TABS_CONFIG} />
      <View className="flex-1">
        <ActiveScreen />
      </View>
    </View>
  );
}