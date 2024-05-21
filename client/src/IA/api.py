import sys
import numpy as np
import os
import cv2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, MaxPool2D, Flatten, Dropout, BatchNormalization, Input
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ReduceLROnPlateau
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
from PIL import Image
from io import BytesIO
import requests
def authenticate():
    gauth = GoogleAuth()
    if gauth.credentials is None:
        gauth.LoadClientConfigFile("client/src/IA/credentials.json")
        gauth.LocalWebserverAuth()
    elif gauth.access_token_expired:
        gauth.Refresh()
    else:
        gauth.Authorize()
    return GoogleDrive(gauth)

def get_files_from_drive(drive, folder_id):
    file_list = []
    query = f"'{folder_id}' in parents and trashed=false"
    page_token = None

    while True:
        param = {'q': query, 'maxResults': 1000}
        if page_token:
            param['pageToken'] = page_token
        result = drive.ListFile(param).GetList()
        file_list.extend(result)
        if 'nextPageToken' in result:
            page_token = result['nextPageToken']
        else:
            break

    return file_list

def load_image_from_drive(file):
    file_id = file['id']
    download_url = f"https://drive.google.com/uc?id={file_id}"
    response = requests.get(download_url)
    image = Image.open(BytesIO(response.content))
    return image

def process_images_from_drive(file_list, class_num, img_size):
    data = []
    for file in file_list:
        try:
            img = load_image_from_drive(file)
            img = img.convert('L')  # Convert to grayscale
            img = img.resize((img_size, img_size))
            img_arr = np.array(img)
            data.append([img_arr, class_num])
        except Exception as e:
            print(e)
    return data

# Definir las etiquetas y el tamaño de las imágenes
labels = ['PNEUMONIA', 'NORMAL']
img_size = 150

drive = authenticate()

# Replace these with your folder IDs from Google Drive
train_folder_ids = {'PNEUMONIA': '1O6kxLQ1NgvlRWid3av-rJUyFX26E1b1-', 'NORMAL': '134ODhyKcXVzWEskkLUh6dq4vEf1Pr5Op'}
val_folder_ids = {'PNEUMONIA': '1dlw9f0YRb82OwBrPHbl2qcOwCgIV_Ycx', 'NORMAL': '10PGTRF6VulPRQ_tD6wzBwcCe1JJ0eMjA'}
test_folder_ids = {'PNEUMONIA': '1DvRS_bphT8gqeoWng5tzJUsn0cqkpOhq', 'NORMAL': '1fYjUKEOrXNozeSoVfDMWg97hicmax8cD'}

# Preprocesar los datos
train_data = []
val_data = []
test_data = []

for label in labels:
    train_files = get_files_from_drive(drive, train_folder_ids[label])
    val_files = get_files_from_drive(drive, val_folder_ids[label])
    test_files = get_files_from_drive(drive, test_folder_ids[label])

    train_data.extend(process_images_from_drive(train_files, labels.index(label), img_size))
    val_data.extend(process_images_from_drive(val_files, labels.index(label), img_size))
    test_data.extend(process_images_from_drive(test_files, labels.index(label), img_size))

x_train = np.array([i[0] for i in train_data]) / 255
y_train = np.array([i[1] for i in train_data])

x_val = np.array([i[0] for i in val_data]) / 255
y_val = np.array([i[1] for i in val_data])

x_test = np.array([i[0] for i in test_data]) / 255
y_test = np.array([i[1] for i in test_data])

x_train = x_train.reshape(-1, img_size, img_size, 1)
x_val = x_val.reshape(-1, img_size, img_size, 1)
x_test = x_test.reshape(-1, img_size, img_size, 1)

# Crear el modelo
model = Sequential([
    Input(shape=(150, 150, 1)),
    Conv2D(32, (3,3), strides=1, padding='same', activation='relu'),
    BatchNormalization(),
    MaxPool2D((2,2), strides=2, padding='same'),
    Conv2D(64, (3,3), strides=1, padding='same', activation='relu'),
    Dropout(0.1),
    BatchNormalization(),
    MaxPool2D((2,2), strides=2, padding='same'),
    Conv2D(64, (3,3), strides=1, padding='same', activation='relu'),
    BatchNormalization(),
    MaxPool2D((2,2), strides=2, padding='same'),
    Conv2D(128, (3,3), strides=1, padding='same', activation='relu'),
    Dropout(0.2),
    BatchNormalization(),
    MaxPool2D((2,2), strides=2, padding='same'),
    Conv2D(256, (3,3), strides=1, padding='same', activation='relu'),
    Dropout(0.2),
    BatchNormalization(),
    MaxPool2D((2,2), strides=2, padding='same'),
    Flatten(),
    Dense(units=128, activation='relu'),
    Dropout(0.2),
    Dense(units=1, activation='sigmoid')
])

model.compile(optimizer="rmsprop", loss='binary_crossentropy', metrics=['accuracy'])

# Entrenar el modelo
datagen = ImageDataGenerator(
        rotation_range=30,
        zoom_range=0.2,
        width_shift_range=0.1,
        height_shift_range=0.1,
        horizontal_flip=True)
datagen.fit(x_train)

learning_rate_reduction = ReduceLROnPlateau(monitor='val_accuracy', patience=2, verbose=1, factor=0.3, min_lr=0.000001)
model.fit(datagen.flow(x_train, y_train, batch_size=32), epochs=12, validation_data=datagen.flow(x_val, y_val), callbacks=[learning_rate_reduction])

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
    
    print(f'Imagen recibida: {image_path.encode("utf-8", "ignore").decode("utf-8")}')
    print(f'Resultado del análisis de IA: {result}')

if __name__ == '__main__':
    image_path = sys.argv[1]
    main(image_path)
