// Regression fixture: Node's fetch declarations defer to Web API declarations
// when an `onmessage` global exists. A server check must still resolve a complete
// Response in that context, not an empty fallback interface.
declare var onmessage: any;
