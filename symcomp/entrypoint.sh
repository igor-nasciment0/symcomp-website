#!/bin/sh
# entrypoint.sh

# Tenta rodar o Next.js
echo "Iniciando aplicação..."
pnpm start

# Se falhar, mantém o container rodando para depuração
status=$?
if [ $status -ne 0 ]; then
  echo "O comando 'pnpm start' falhou com código $status."
  echo "O container continuará rodando para depuração."
  tail -f /dev/null
fi
