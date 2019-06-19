NETWORK="$1"
if [ -z "$NETWORK" ]; then
    NETWORK="testnet"
fi
HOST="192.168.1.12" PORT="4200" node "/home/bridgechain/cscoin-explorer/build/build.js" --network "$NETWORK"
EXPLORER_HOST="192.168.1.12" EXPLORER_PORT="4200" pm2 start /home/bridgechain/cscoin-explorer/express-server.js --name explorer
