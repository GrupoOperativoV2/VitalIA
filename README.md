
### Deployment Back

```sh

cd vitalIa
npm i
npm run dev
```

### Deployment Front

```sh

cd vitalIA/client
npm i
npm run dev
```

### Update Python Virtual Environment 
```sh

.\.venv\Scripts\activate
pip install tensorflow keras opencv-python numpy pandas matplotlib seaborn pydrive sys  
```

### Retirar restricciones en PowerShell
```sh
Set-ExecutionPolicy RemoteSigned
```

### Entorno de producción 
git status
git add .  
git commit -m "X"
git push heroku main
heroku logs --tail
