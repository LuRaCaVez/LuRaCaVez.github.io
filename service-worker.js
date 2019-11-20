self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  var title = 'Yay a message.';
  var body = '<html><head></head><body><p>We have received a push message.</p></body></html>';
  var icon = 'https://image.shutterstock.com/image-vector/bell-icon-vector-alarm-alert-260nw-1085147141.jpg';
  var image = 'https://image.shutterstock.com/image-vector/bell-icon-vector-alarm-alert-260nw-1085147141.jpg';
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      image: image,
      tag: tag,
      requireInteraction: true,
      renotify: true
    })
  );
});


const examplePage = '';

function focusWindow(event) {
  /**** START notificationFocusWindow ****/
  /**** START urlToOpen ****/
  const urlToOpen = new URL(examplePage, self.location.origin).href;
  /**** END urlToOpen ****/

  /**** START clientsMatchAll ****/
  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
  /**** END clientsMatchAll ****/
  /**** START searchClients ****/
  .then((windowClients) => {
    let matchingClient = null;

    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      if (windowClient.url === urlToOpen) {
        matchingClient = windowClient;
        break;
      }
    }

    if (matchingClient) {
      return matchingClient.focus();
    } else {
      return clients.openWindow(urlToOpen);
    }
  });
  /**** END searchClients ****/

  event.waitUntil(promiseChain);
  /**** END notificationFocusWindow ****/
}

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  focusWindow(event);
});


