import mongoose from "mongoose";

/*
0 = disconnected
1 = connected
2 = connecting
3 = disconnecting
*/

const mongoConection = {
  isConected: 0,
};

export const connect = async () => {
  if (mongoConection.isConected) {
    console.log("Ya estabamos conectados");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConection.isConected = mongoose.connections[0].readyState;

    if (mongoConection.isConected === 1) {
      console.log("Usando conexión anterior");
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || "");
  mongoConection.isConected = 1;
  console.log("Conectado a MongoDB:", process.env.MONGO_URL);
};


export const disconnect = async () => {

    if(process.env.NODE_ENV === 'development') return;

    
    await mongoose.disconnect();
    if (mongoConection.isConected === 0) return;
    console.log('Desconectado de MongoDB');
}