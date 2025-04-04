export class ConnectionInfo {
  connection_id: number;
  remote_address: string;
  constructor(connection_id:number, remote_address:string){
    this.connection_id = connection_id;
    this.remote_address = remote_address;
  }
}

export class PeerInfo {
  supported_protocols: Array<String>;
  protocol_version: String;
  connections: Array<ConnectionInfo>;
  constructor(supported_protocols: Array<String>, protocol_version: String, connections: Array<{connection_id:number, remote_address:string}>){
    this.supported_protocols = supported_protocols;
    this.protocol_version = protocol_version;
    this.connections = connections.map((v)=>new ConnectionInfo(v.connection_id, v.remote_address))
  }
}

export class SwarmEmit {
  ConnectionEstablished:
    | {
        peer_id: String;
        endpoint: ConnectedPoint;
      }
    | undefined = undefined;
  ConnectionClosed:
    | {
        peer_id: String;
        endpoint: ConnectedPoint;
        cause: String;
        num_established: Number;
      }
    | undefined = undefined;
  Dialing:
    | {
        maybe_peer_id: String | null;
      }
    | undefined = undefined;
  IncomingConnection:
    | {
        local_addr: String;
        send_back_addr: String;
      }
    | undefined = undefined;
  NewListenAddr:
    | {
        address: String;
      }
    | undefined = undefined;
  OutgoingConnectionError:
    | {
        error: DialError;
      }
    | undefined = undefined;
}

export class ConnectedPoint {
  Dialer:
    | {
        address: String;
        role_override: boolean;
      }
    | undefined = undefined;
  Listener:
    | {
        local_addr: String;
        send_back_addr: String;
      }
    | undefined = undefined;
}

export class DialError {
  LocalPeerId:
    | {
        endpoint: ConnectedPoint;
      }
    | undefined = undefined;
  NoAddresses: {} | undefined = undefined;
  DialPeerConditionFalse: {} | undefined = undefined;
  Aborted: {} | undefined = undefined;
  WrongPeerId: { obtained: String; endpoint: ConnectedPoint } | undefined =
    undefined;
  Denied: String | undefined = undefined;
  Transport: Array<Array<String>> | undefined = undefined;
}

export interface RelayInfo {
  listenable_address: Array<String>;
  listened_address: Array<String>;
  supports_ext: Boolean;
  latency: Number;
  advertised: Array<String> | null;
}

export interface RelayStub {
  peer_id: String;
  latency: Number;
}
