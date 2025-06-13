import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

def listar_estrutura_pasta(path, prefix=''):
    arquivos = sorted(os.listdir(path))
    for idx, nome in enumerate(arquivos):
        caminho_completo = os.path.join(path, nome)
        conector = "└── " if idx == len(arquivos) - 1 else "├── "
        print(prefix + conector + nome)
        if os.path.isdir(caminho_completo):
            extensao = "    " if idx == len(arquivos) - 1 else "│   "
            listar_estrutura_pasta(caminho_completo, prefix + extensao)

listar_estrutura_pasta('./src')
