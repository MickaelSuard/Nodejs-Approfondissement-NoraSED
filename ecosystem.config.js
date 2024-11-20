module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
      error_file: "./logs/err.log", // Fichier log en cas d'erreur
      max_memory_restart: "200M", // Utilisation de la mémoire maximum: 200 Mo
      instances: 3, // Nombre d'instances en parallèle
      exec_mode: "cluster" // Mode cluster pour exécuter plusieurs instances
    },
  ],
};