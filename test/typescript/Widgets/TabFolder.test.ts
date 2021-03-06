import {
  ColorValue,
  Properties,
  PropertyChangedEvent,
  Tab,
  TabFolder,
  TabFolderScrollEvent,
  TabFolderSelectEvent
} from 'tabris';

let widget: TabFolder = new TabFolder({tabBarLocation: 'top'});

// Properties
let paging: boolean;
let selection: Tab;
let tabBarLocation: 'auto' | 'bottom' | 'hidden' | 'top';
let tabMode: 'fixed' | 'scrollable';
let tabTintColor: ColorValue;
let selectedTabTintColor: ColorValue;
let tabBarBackground: ColorValue;
let selectedTabIndicatorTintColor: ColorValue;
let badgeColor: ColorValue;
let tabBarElevation: number;

paging = widget.paging;
selection = widget.selection;
tabBarLocation = widget.tabBarLocation;
tabMode = widget.tabMode;
tabTintColor = widget.tabTintColor;
selectedTabTintColor = widget.selectedTabTintColor;
tabBarBackground = widget.tabBarBackground;
selectedTabIndicatorTintColor = widget.selectedTabIndicatorTintColor;
tabBarElevation = widget.tabBarElevation;

widget.paging = paging;
widget.selection = selection;
widget.tabTintColor = tabTintColor;
widget.selectedTabTintColor = selectedTabTintColor;
widget.tabBarBackground = tabBarBackground;
widget.selectedTabIndicatorTintColor = selectedTabIndicatorTintColor;
widget.tabBarElevation = tabBarElevation;

let properties: Properties<TabFolder> = {
  paging,
  selection,
  tabBarLocation,
  tabMode,
  tabTintColor,
  selectedTabTintColor,
  tabBarBackground,
  selectedTabIndicatorTintColor,
  tabBarElevation
};
widget = new TabFolder(properties);
widget.set(properties);

// Events
let target: TabFolder = widget;
let timeStamp: number = 0;
let type: string = 'foo';
let offset: number = 0;
let value: Tab = widget.selection;

let tabFolderScrollEvent: TabFolderScrollEvent = {target, timeStamp, type, offset, selection};
let tabFolderSelectEvent: TabFolderSelectEvent = {target, timeStamp, type, selection};
let tabFolderSelectionChangedEvent: PropertyChangedEvent<TabFolder, Tab> = {target, timeStamp, type, value};

widget
  .onSelectionChanged((event: PropertyChangedEvent<TabFolder, Tab>) => {})
  .onSelect((event: TabFolderSelectEvent) => {})
  .onScroll((event: TabFolderScrollEvent) => {});

class CustomComponent extends TabFolder {
  public foo: string;
  constructor(props: Properties<TabFolder> & Partial<Pick<CustomComponent, 'foo'>>) { super(props); }
}

new CustomComponent({foo: 'bar'}).set({foo: 'bar'});
