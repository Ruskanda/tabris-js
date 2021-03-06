import {
  Composite,
  Widget,
  Button,
  WidgetCollection,
  CompositeAddChildEvent,
  CompositeRemoveChildEvent,
  BoxDimensions,
  Selector,
  Properties } from 'tabris';

let widget: Composite = new Composite();

// Properties
const padding: BoxDimensions | number | null = widget.padding;

const properties: Properties<Composite> = {padding};
widget = new Composite(properties);
widget.set(properties);

// Methods
const buttonsComposite: Composite<Button> = new Composite<Button>();
const widgets: Widget[] = [];
const widgetA: Widget = new Button();
const widgetB: Widget = new Button();
let button: Button = new Button();
let widgetCollection: WidgetCollection<Widget> = new Composite().find();
let thisReturnValue: Composite;
let fooCollection: WidgetCollection<Widget>;
const selector: Selector = '';
class Foo extends Composite {}

thisReturnValue = widget.append(widgetA, widgetB);
thisReturnValue = widget.append(widgets);
thisReturnValue = widget.append(widgetCollection);
thisReturnValue = buttonsComposite.append(button);
thisReturnValue = buttonsComposite.append([button]);
thisReturnValue = buttonsComposite.append(new WidgetCollection<Button>([button]));
thisReturnValue = widget.apply({selectorString: properties});
widgetCollection = widget.children();
button = buttonsComposite.children()[0];
button = buttonsComposite.children(button => button.text === 'foo')[0];
widgetCollection = widget.children(selector);
fooCollection = widget.children(Foo);
widgetCollection = widget.find();
widgetCollection = widget.find(selector);
widgetCollection = buttonsComposite.find(button => button.text === 'foo');
fooCollection = widget.find(Foo);

// Events
const target: Composite = widget;
const timeStamp: number = 0;
const type: string = 'foo';
const child: Widget = widgetA;
const index: number = 0;

const addChildEvent: CompositeAddChildEvent = {target, timeStamp, type, child, index};
const removeChildEvent: CompositeRemoveChildEvent = {target, timeStamp, type, child, index};

widget
  .onAddChild((event: CompositeAddChildEvent) => {})
  .onRemoveChild((event: CompositeRemoveChildEvent) => {});

class CustomComponent extends Composite {
  public foo: string;
  constructor(props: Properties<CustomComponent>) { super(props); }
}

new CustomComponent({foo: 'bar'}).set({foo: 'bar'});
