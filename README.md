# Monitor de Consumo Energético

Monitor de consumo energético baseado na medição da corrente elétrica dos dispositivos que se deseja monitorar o consumo.  
Vídeo:  
https://youtu.be/f4ds8HTcbPM

### Materiais:
> Sensor de Corrente ACS712  
> Arduino Uno  
> Raspberry Pi 3

### Montagem do Hardware:
<a href="https://drive.google.com/uc?export=view&id=1qxa4hlBdDZfja8_QL9af-JctG8_pwEyS"><img src="https://drive.google.com/uc?export=view&id=1qxa4hlBdDZfja8_QL9af-JctG8_pwEyS" style="width: 500px; max-width: 100%; height: auto"/></a>
Em seguida conectar o Arduino a Raspberry Pi pelo cabo USB AM/BM

### Instalar:
> npm install  
> pip install -r requirements.txt  

### Executar:
> No terminal executar comando: python reciever.py  
> Em outro terminal executar comando: gulp

Para visualização dos dados, a aplicação mantém um servidor web local na raspberry pi em Node.js e utiliza banco de dados SQLite.
