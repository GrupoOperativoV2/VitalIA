import base64
import requests
import sys
import numpy as np
import cv2
from tensorflow.keras.models import load_model
import os

# Clave API de OpenAI
api_key = ""

def encode_image(image_path):
    try:
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
    except Exception as e:
        print(f"Error encoding image: {e}")
        return None

def check_image_type(image_path):
    base64_image = encode_image(image_path)
    if not base64_image:
        return {"error": "Error encoding image"}

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    payload = {
        "model": "gpt-4o",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Si es una radiografía de tórax devuelve '1', si es una MRI de la cabeza '2', si no es ninguna de ambas devuelve lo que es muy brevemente."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ],
        "max_tokens": 300
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    if response.status_code != 200:
        return {"error": f"OpenAI API error: {response.text}"}

    return response.json()

def main(image_path):
    image_type_response = check_image_type(image_path)
    if "error" in image_type_response:
        print(image_type_response["error"])
        return

    image_type = image_type_response.get("choices", [{}])[0].get("message", {}).get("content", "0")

    print(image_type)
    if image_type == "1":
        print("La imagen es una radiografía de tórax.")
        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        img = cv2.resize(img, (img_size, img_size))
        img = img / 255.0
        img = img.reshape(-1, img_size, img_size, 1)
        prediction = model.predict(img)
        result = "PNEUMONIA" if prediction < 0.4 else "NORMAL"
        print(f'Resultado del análisis de IA: {result} con una probabilidad de {prediction[0][0]:.2f}')
    
    elif image_type == "2":
        print("La imagen es una MRI de la cabeza.")
        img = cv2.imread(image_path)
        img = cv2.resize(img, img_sizeT)
        img = img / 255.0
        img = np.expand_dims(img, axis=0)
        predictionT = modelT.predict(img)
        predicted_class = labelsT[np.argmax(predictionT)]
        print(f'Resultado del análisis de IA: {predicted_class} con una probabilidad de {predictionT[0][np.argmax(predictionT)]:.2f}')
    
    else:
        print("")

sys.stdout.reconfigure(encoding='utf-8')
labels = ['PNEUMONIA', 'NORMAL']
img_size = 150

model_path = 'C:\\Users\\dante\\OneDrive\\Escritorio\\VitalIA\\client\\src\\IA\\mi_modelo.keras'
model_pathT = 'C:\\Users\\dante\\OneDrive\\Escritorio\\VitalIA\\client\\src\\IA\\modelo_tumores.keras'
labelsT = ['glioma', 'meningioma', 'notumor', 'pituitary']
img_sizeT = (224, 224)

if os.path.exists(model_path):
    try:
        model = load_model(model_path)
    except Exception as e:
        print(f"Error cargando el modelo: {e}")
else:
    print(f"Model file not found at {model_path}")

if os.path.exists(model_pathT):
    try:
        modelT = load_model(model_pathT)
    except Exception as e:
        print(f"Error cargando el modelo: {e}")
else:
    print(f"Model file not found at {model_pathT}")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        main(image_path)
    else:
        print("Por favor, proporciona la ruta de la imagen.")
