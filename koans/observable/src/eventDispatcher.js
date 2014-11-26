var SAMURAIPRINCIPLE = { };

SAMURAIPRINCIPLE.eventDispatcher = function (base) {
  var eventListeners = [];
  base.addEventListener = function (eventType, eventListener, priority) {
    if (!eventListener) {
      eventListener = eventType;
      eventType = 'default';
    }
    eventListeners.push({
      listener: eventListener,
      type: eventType,
      prio: priority || 1
    });
  };
  base.listener = function () {
    return eventListeners[0].listener;
  };
  base.dispatchEvent = function (eventType, event) {
    if (!event) {
      event = eventType;
      eventType = 'default';
    }
    eventListeners.filter(function (details) {
      return details.type === eventType;
    }).sort(function (details1, details2) {
      return details2.prio - details1.prio;
    }).some(function (details) {
      try {
        if (details.listener(event) === false) return true;
      } catch (e) { }
    });
  };
  base.createObservableProperty = function (propertyName) {
    var propertyValue;
    base['get' + propertyName] = function() {
      return propertyValue;
    };
    base['set' + propertyName] = function (value) {
      propertyValue = value;
      base.dispatchEvent(propertyName, value);
    };
/*    base['on' + propertyName + 'Changed'] = function(listener) {
      base.addEventListener(propertyName, listener);
    };
    var changedMethod = 'on' + propertyName + 'Changed';
    changedMethod.bind*/
    
    // ** Have replaced with bind ** - could have used base as first parameter
    // but as addEventListener doesn't use 'this' then not required.
    base['on' + propertyName + 'Changed'] = base.addEventListener.bind(undefined, propertyName);
  }
  return base;
}