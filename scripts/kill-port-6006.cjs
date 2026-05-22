const { exec } = require("child_process");

// Função para matar processos na porta 6006
function killPort6006() {
  return new Promise((resolve, reject) => {
    exec("netstat -ano | findstr :6006", (error, stdout) => {
      if (error) {
        console.log("Nenhum processo encontrado na porta 6006");
        resolve();
        return;
      }

      const lines = stdout.trim().split("\n");
      const pids = new Set();

      lines.forEach((line) => {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5) {
          const pid = parts[parts.length - 1];
          if (pid && pid !== "0") {
            pids.add(pid);
          }
        }
      });

      if (pids.size === 0) {
        console.log("Nenhum processo encontrado na porta 6006");
        resolve();
        return;
      }

      console.log(
        `Encontrados ${pids.size} processo(s) na porta 6006. Encerrando...`,
      );

      const killPromises = Array.from(pids).map((pid) => {
        return new Promise((resolveKill) => {
          exec(`taskkill /F /PID ${pid}`, (killError) => {
            if (killError) {
              console.log(
                `Erro ao encerrar processo ${pid}:`,
                killError.message,
              );
            } else {
              console.log(`Processo ${pid} encerrado com sucesso`);
            }
            resolveKill();
          });
        });
      });

      Promise.all(killPromises).then(() => {
        console.log("Todos os processos na porta 6006 foram encerrados");
        resolve();
      });
    });
  });
}

// Executa a função
killPort6006()
  .then(() => {
    console.log("Porta 6006 liberada. Iniciando servidor...");
  })
  .catch((error) => {
    console.error("Erro ao liberar porta 6006:", error);
    process.exit(1);
  });
