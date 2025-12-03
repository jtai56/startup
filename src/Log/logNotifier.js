const LogEvent = {
  System: 'system',
  End: 'logEnd',
  Start: 'logStart',
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class LogEventNotifier {
  events = [];
  handlers = [];

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const wsUrl = `${protocol}://${window.location.hostname}:${port}/ws`;
    console.log('Connecting to WebSocket:', wsUrl);
    this.socket = new WebSocket(wsUrl);
    this.socket.onopen = (event) => {
      console.log('WebSocket connected!');
      this.receiveEvent(new EventMessage('Level Up', LogEvent.System, { msg: 'connected' }));
    };
    this.socket.onclose = (event) => {
      console.log('WebSocket disconnected!');
      this.receiveEvent(new EventMessage('Level Up', LogEvent.System, { msg: 'disconnected' }));
    };
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        console.log('WebSocket received message:', event);
        this.receiveEvent(event);
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    };
    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    console.log('Broadcasting event:', event);
    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);
    console.log('Calling handlers for event:', event, 'Handler count:', this.handlers.length);

    this.handlers.forEach((handler) => {
        handler(event);
      });
  }
}

const LogNotifier = new LogEventNotifier();
export { LogEvent, LogNotifier };
