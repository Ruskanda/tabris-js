import {Action, NavigationView, contentView} from 'tabris';

// Create an action with an image and a selection handler

const navigationView = new NavigationView({
  left: 0, top: 0, right: 0, bottom: 0,
  background: '#e7e7e7'
}).appendTo(contentView);

new Action({
  title: 'Action',
  image: {
    src: device.platform === 'iOS' ? 'resources/share-black-24dp@3x.png' : 'resources/share-white-24dp@3x.png',
    scale: 3
  }
}).on('select', () => console.log('Action selected.'))
  .appendTo(navigationView);
