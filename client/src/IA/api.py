import sys
import numpy as np
import cv2  
from tensorflow.keras.models import load_model

# Definir las etiquetas y el tamaño de las imágenes
labels = ['PNEUMONIA', 'NORMAL']
img_size = 150

# Cargar el modelo entrenado
model = load_model('mi_modelo.h5')

# Función para procesar una imagen y predecir su clase
def main(image_path):
    # Cargar y preprocesar la imagen
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (img_size, img_size))
    img = img / 255.0
    img = img.reshape(-1, img_size, img_size, 1)

    # Realizar la predicción
    prediction = model.predict(img)
    result = "PNEUMONIA" if prediction < 0.5 else "NORMAL"

    print(f'Imagen recibida: {image_path}')
    print(f'Resultado del análisis de IA: {result}')

if __name__ == '__main__':
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        main(image_path)
    else:
        print("Por favor, proporciona la ruta de la imagen.")
