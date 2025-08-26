
 An offline-first, peer-to-peer emergency communication system built to communicate in disaster-prone areas where there is no connectivity to the internet.

npm run build
```

### Start backend (single node exposing API)

Ensure one node is started with the HTTP server enabled (exposes `/messages` and `/send`):
```bash
cd cmd/disasternet
go run main.go --port 9000 --same_string xyz --room myroom --nick Abhi --enable-http true
```
Start additional peers without `--enable-http` as needed on the same LAN.

## Commands to run on your local system.

### Steps to start frontend
- Go to /frontend 
- Type commmand
```console
    npm install
    npm run dev
```

### Steps to start backend
- Go to /cmd/disasternet
- Info about flags-
- **port** :- Port where your host runs on.
- **same_string** :- Used by MDNS to discover peers wanting to connect with each other, this should be same among the peers.
- **nick** :- This will be your name displayed to all the peers connected.
- **room** :- Name of the room, this should be same among all the peers.
- **enable-http** :- Only run once while creating the host to setup backend api for frontend.
- Eg: Run command
```console
    go run main.go --port 9000 --same_string xyz --room myroom --nick Abhi --enable-http true
```
- Run command in another terminal/device connceted together via Wifi/Ethernet LAN to create another peer.
```console
go run main.go --port 9001 --same_string xyz --room myroom --nick Aaradhya
```
- Start communicating by sending messages by writing through terminal or though the frontend Ui.

