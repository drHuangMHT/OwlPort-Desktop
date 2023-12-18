extern crate owlnest;
use libp2p::{Multiaddr, PeerId};
use owlnest::net::p2p::{identity::IdentityUnion, protocols::identify, swarm, SwarmConfig};
use serde::{Serialize,Deserialize};
use tauri::async_runtime;
use tauri::{
    generate_handler,
    plugin::{Builder, TauriPlugin},
    Manager, Runtime,
};

pub mod messaging;
// pub mod statistics;
pub mod swarm_plugin;
pub mod mdns;
pub mod kad;

pub fn setup_peer() -> swarm::Manager {
    let identity = read_ident();
    let swarm_config = SwarmConfig {
        local_ident: identity.clone(),
        kad: Default::default(),
        identify: identify::Config::new("/owlnest/0.0.1".into(), identity.clone().get_pubkey()),
        mdns: Default::default(),
        messaging: Default::default(),
        relay_server: Default::default(),
    };
    swarm::Builder::new(swarm_config).build(16, async_runtime::handle().inner().clone())
}

fn read_ident()->IdentityUnion{
    use tracing::warn;
    match IdentityUnion::from_file_protobuf_encoding("./id.libp2pkeypair"){
        Ok(ident) => ident,
        Err(e) => {
            warn!("Failed to read keypair: {:?}",e);
            let ident = IdentityUnion::generate();
            ident.export_keypair(".", "id").unwrap();
            ident
        },
    }
}