import requests
import time
import threading
import random


URL = "http://dev-ALB-999591933.us-east-1.elb.amazonaws.com/api/products"
HEADERS = {
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (Stress Test)",
    "X-Request-ID": str(random.randint(10000, 99999))
}
THREADS = 1000  # 50 -> 500 hilos (10x más)
DURATION = 600  # 10 minutos
REQUEST_DELAY = 0.01  # Solo 10ms entre requests (antes era inmediato)

def send_request():
    start_time = time.time()
    session = requests.Session()  # Session reutiliza conexiones TCP
    while time.time() - start_time < DURATION:
        try:
            # Añadimos parámetros aleatorios para evitar caching
            params = {
                "rand": random.randint(1, 1000),
                "ts": int(time.time())
            }
            
            response = session.get(
                URL,
                headers=HEADERS,
                params=params,
                timeout=10
            )
            print(f"[{threading.current_thread().name}] Status: {response.status_code}, Time: {response.elapsed.total_seconds():.2f}s")
            
            # Pequeña pausa para evitar saturar el thread
            time.sleep(REQUEST_DELAY)
            
        except Exception as e:
            print(f"[{threading.current_thread().name}] Error: {str(e)[:100]}")

# Configuración para maximizar conexiones
session = requests.Session()
adapter = requests.adapters.HTTPAdapter(
    pool_connections=THREADS,
    pool_maxsize=THREADS,
    max_retries=3
)
session.mount('http://', adapter)
session.mount('https://', adapter)

# Iniciar hilos con nombres identificativos
threads = []
for i in range(THREADS):
    t = threading.Thread(
        target=send_request,
        name=f"Thread-{i+1}",
        daemon=True
    )
    t.start()
    threads.append(t)

# Esperar a que terminen con timeout
for t in threads:
    t.join(timeout=DURATION + 10)  # 10 segundos de gracia

print("Prueba de carga completada")