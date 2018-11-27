## Lnd arcade game

Live example: https://www.lightningpacman.com

By utilising the Bitcoin Lightning network, NodeJS, Socket.io, one can "send" payments to a browser-based game... much like dropping
a quarter into an arcade cabinet. This, of course, could work with any javascript app running in a browser.

The NodeJS server interfaces with a Lightning network node via it's GRPC commands. The server file therefore acts as the middle-man
between the node and the browser. In this role it fullfills two objectives:
- Request and relay payment invoices to the browser, where it is formatted to QR.
- Monitor incoming payments on the node for settled invoices and relaying this information to the browser.

The socket-logic.js file runs in the browser along with the game code and coordinates messages to and from the NodeJS server, messages such as:
- Receiving and formatting incoming invoices into QR's and displaying.
- Receiving credit notifications from the server and displaying.
- Periodically syncronising credit amount, with the server being the authority on this.


For clarity's sake, a diagram:

```

                                                              Server
                                         +-----------------------------------------------+
                                         |                                               |
                                         |                                               |
            Browser                      |                       +--------------+        |
+----------------------------+           |                       |              |        |
|                            |           |                       | Bitcoin Node |        |
|                            |           |                       |              |        |
|    +------------------+    |           |                       +-------+------+        |
|    |                  |    |           |                               |               |
|    |                  |    |           |                               v               |
|    |    Game code     |    |           |                       +--------------+        |
|    |                  |    |           |                       |              |        |
|    +------------------+    |           |                       |Lightnig Node |        |
|        |      ^            |           |                       |              |        |
|        |      |            |           |                       +-------+------+        |
|        v      |            |           |                               |               |
|   +-------------------+    |           |                               v               |
|   |                   |    |           +---------------+       +--------------+        |
|   |                   |    | --------->|               |       |              |        |
|   |   Socket-Logic    |    |           |     Apache2   |------>| NodeJS Server|        |
|   |                   |    | <---------|               |<------|              |        |
|   |                   |    |           +---------------+       +--------------+        |
|   +-------------------+    |           |                                               |
|                            |           |                                               |
+----------------------------+           |                                               |
                                         +-----------------------------------------------+

```
