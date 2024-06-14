import base64
import requests
import sys
import numpy as np
import cv2
from tensorflow.keras.models import load_model
import os
import pdfrw
from datetime import datetime

input_pdf_path = 'C:\\Users\\Kevin\\Desktop\\VitalIA\\client\\public\\plantilla.pdf'
filled_pdf_path = 'C:\\Users\\Kevin\\Desktop\\VitalIA\\client\\public\\plantilla_filled.pdf'

if os.path.exists(filled_pdf_path):
    os.remove(filled_pdf_path)

def decrypt(encrypted_text, shift):
    decrypted_text = ''
    for char in encrypted_text:
        if char.isalpha():
            shift_amount = shift % 26
            char_code = ord(char) - shift_amount
            if char.islower():
                if char_code < ord('a'):
                    char_code += 26
                decrypted_text += chr(char_code)
            elif char.isupper():
                if char_code < ord('A'):
                    char_code += 26
                decrypted_text += chr(char_code)
        else:
            decrypted_text += char
    return decrypted_text

shift = 3
api_key = decrypt("vn-surm-pggnT52S3trNv04M0Sq8W3EoenIM9Bt6uNxAR3EmuEWccZfh", shift)

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

def main(image_path, nombre, genero, alergias, tiposangre, hospita, historialf, fecha, notas):
    image_type_response = check_image_type(image_path)
    tipoEstudio = ""
    res = ""
    image_type = image_type_response.get("choices", [{}])[0].get("message", {}).get("content", "0")
   
    img_size = 150

    if image_type == "1":
        tipoEstudio = "Radiografía de tórax"
        print("La imagen es una radiografía de tórax.")
        
        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        img = cv2.resize(img, (img_size, img_size))
        img = img / 255.0
        img = img.reshape(-1, img_size, img_size, 1)

        if os.path.exists(model_path):
            try:
                model = load_model(model_path)
            except Exception as e:
                print(f"Error cargando el modelo: {e}")
                return
        else:
            print(f"Model file not found at {model_path}")
            return

        predictionNE = model.predict(img)  # Predict de neumonía

        if os.path.exists(model_pathTuber):
            try:
                modelTB = load_model(model_pathTuber)
            except Exception as e:
                print(f"Error cargando el modelo: {e}")
                return
        else:
            print(f"Model file not found at {model_pathTuber}")
            return

        predictionTC = modelTB.predict(img)  # Predict de tuberculosis

        print(predictionNE)
        print(predictionTC)

        result = "Positivo" if predictionNE < 0.5 else "Negativo"
        resulttb = "Positivo" if predictionTC < 0.4 else "Negativo"
        
        res = "-NEUMONÍA: " + result + " \n"
        res += "-TUBERCULOSIS: " + resulttb + " \n"
        
    elif image_type == "2":
        tipoEstudio = "MRI del cerebro"
        print("La imagen es una MRI de la cabeza.")
        img = cv2.imread(image_path)
        img = cv2.resize(img, img_sizeT)
        img = img / 255.0
        img = np.expand_dims(img, axis=0)
        predictionT = modelT.predict(img)
        predicted_class = labelsT[np.argmax(predictionT)]
        res = f'Resultado del análisis de IA: {predicted_class} con una probabilidad de {predictionT[0][np.argmax(predictionT)]:.2f}'
        print(predictionT)
    else:
        print("Tipo de imagen no reconocido: " + image_type)

    if image_type in ["1", "2"]:
        fecha_actual = datetime.now()    
        fecha_formateada = fecha_actual.strftime("%d/%m/%Y")
        data = {
            'dhFormfield-5016382845': fecha_formateada,  # Fecha
            'dhFormfield-5016382886': nombre,  # Nombre del paciente
            'dhFormfield-5016383832': tipoEstudio,  # Tipo de estudio
            'dhFormfield-5016383935': genero,  # Género
            'dhFormfield-5016383936': alergias,  # Alergias
            'dhFormfield-5016383938': tiposangre,  # Tipo de sangre
            'dhFormfield-5016383939': hospita,  # Antecedentes
            'dhFormfield-5016383944': historialf,  # Historial familiar
            'dhFormfield-5016384053': fecha,  # Edad
            'dhFormfield-5016385348': res,  # Evaluación preliminar
            'dhFormfield-5016385349': notas  # Notas del personal
        }
        template_pdf = pdfrw.PdfReader(input_pdf_path)
        annotations = template_pdf.pages[0]['/Annots']
        for annotation in annotations:
            if annotation['/Subtype'] == '/Widget':
                field_key = annotation['/T'][1:-1]  # Remover paréntesis
                if field_key in data.keys():
                    annotation.update(pdfrw.PdfDict(V='{}'.format(data[field_key])))
                    annotation.update(pdfrw.PdfDict(AP=''))
        pdfrw.PdfWriter().write(filled_pdf_path, template_pdf)
        print(f'Formulario llenado y guardado en {filled_pdf_path}')

sys.stdout.reconfigure(encoding='utf-8')
img_size = 150

# Modelos para radiografías de tórax
model_path = 'C:\\Users\\Kevin\\Desktop\\VitalIA\\client\\src\\IA\\modelo_neumo.keras'
model_pathTuber = 'C:\\Users\\Kevin\\Desktop\\VitalIA\\client\\src\\IA\\modelo_tuber.keras'

# Modelos para MRI de cabeza
model_pathT = 'C:\\Users\\Kevin\\Desktop\\VitalIA\\client\\src\\IA\\modelo_mri.keras'
labelsT = ['glioma', 'meningioma', 'notumor', 'pituitary']
img_sizeT = (224, 224)

# Cargar modelo para MRI de cabeza
if os.path.exists(model_pathT):
    try:
        modelT = load_model(model_pathT)
    except Exception as e:
        print(f"Error cargando el modelo: {e}")
else:
    print(f"Model file not found at {model_pathT}")

if __name__ == '__main__':
    if len(sys.argv) == 10:  # Verificar que se reciban 9 argumentos más la ruta de la imagen
        image_path = sys.argv[1]
        nombre = sys.argv[2]
        genero = sys.argv[3]
        alergias = sys.argv[4]
        tiposangre = sys.argv[5]
        hospita = sys.argv[6]
        historialf = sys.argv[7]
        fecha = sys.argv[8]
        notas = sys.argv[9]
        main(image_path, nombre, genero, alergias, tiposangre, hospita, historialf, fecha, notas)
    else:
        print(f"Argumentos recibidos: {len(sys.argv) - 1}")
        print("Por favor, proporciona todos los argumentos necesarios.")
