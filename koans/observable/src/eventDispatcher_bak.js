var SAMURAIPRINCIPLE = { };

SAMURAIPRINCIPLE.eventDispatcher = function (base) {
  var eventListeners = {};
  base.addEventListener = function (eventType, eventListener, priority) {
    var type = arguments.length == 1 ? 'default': eventType;
    var listenerFn = arguments.length == 1 ? eventType : eventListener;

    if (!eventListeners[type]) {
      eventListeners[type] = new Array();
    }

    var evtListener = { listener: listenerFn }
    if (priority) {
      evtListener.prio = priority;
    }
    eventListeners[type].push(evtListener);
  };
  base.listener = function () {
    var defaultListenders = eventListeners['default'];
    return defaultListenders.pop().listener;
  };
  base.dispatchEvent = function (eventType, event) {
    var type = arguments.length == 1 ? 'default': eventType;
    var evt = arguments.length == 1 ? eventType : event;
/*    var sortedListeners = eventListeners[type].sort(function (a, b) {
      return a.prio - b.prio;
    });*/
    sortedListeners.forEach(function (listener) {
      try {
        listender.listener(evt);
      } catch (e) { }
    });
  };
  return base;
}