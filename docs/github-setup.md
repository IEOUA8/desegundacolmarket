# Git y GitHub

El repositorio local ya esta inicializado con rama `main`.

## Configurar identidad local

Ejecuta estos comandos con tus datos reales:

```bash
git config user.name "Tu Nombre"
git config user.email "tu-email@dominio.com"
```

## Crear repositorio en GitHub con GitHub CLI

Primero inicia sesion:

```bash
gh auth login
```

Luego crea el repositorio remoto y sube el primer commit:

```bash
git add .
git commit -m "Initial marketplace setup"
gh repo create de-segunda-marketplace --private --source=. --remote=origin --push
```

Si prefieres que sea publico, cambia `--private` por `--public`.

## Conectar a un repositorio existente

```bash
git remote add origin git@github.com:OWNER/de-segunda-marketplace.git
git push -u origin main
```
