import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nmalls-linktree';

if (!MONGODB_URI) {
  throw new Error('Por favor, defina a variável de ambiente MONGODB_URI');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout após 5 segundos
      connectTimeoutMS: 10000, // Timeout de conexão após 10 segundos
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Conectado ao MongoDB com sucesso!');
        return mongoose;
      })
      .catch((error) => {
        console.error('Erro ao conectar ao MongoDB:', error);
        // Retorna mongoose mesmo com erro para não quebrar a aplicação
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('Erro ao obter conexão do MongoDB:', e);
    // Não quebra a aplicação, apenas loga o erro
  }
  
  return cached.conn;
}

export default dbConnect; 