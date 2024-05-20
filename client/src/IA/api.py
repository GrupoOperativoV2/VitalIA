import sys
import numpy as np
import os
import cv2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, MaxPool2D, Flatten, Dropout, BatchNormalization
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ReduceLROnPlateau

# Definir las etiquetas y el tamaño de las imágenes
labels = ['PNEUMONIA', 'NORMAL']
img_size = 150

def get_training_data(data_dir):
    data = [] 
    for label in labels: 
        path = os.path.join(data_dir, label)
        class_num = labels.index(label)
        for img in os.listdir(path):
            try:
                img_arr = cv2.imread(os.path.join(path, img), cv2.IMREAD_GRAYSCALE)
                resized_arr = cv2.resize(img_arr, (img_size, img_size)) # Reshaping images to preferred size
                data.append([resized_arr, class_num])
            except Exception as e:
                print(e)
    return np.array(data)

# Cargar datos de entrenamiento
train = get_training_data('path_to_training_data/train')
val = get_training_data('path_to_training_data/val')
test = get_training_data('path_to_training_data/test')

# Preprocesar los datos
x_train = np.array([i[0] for i in train]) / 255
y_train = np.array([i[1] for i in train])

x_val = np.array([i[0] for i in val]) / 255
y_val = np.array([i[1] for i in val])

x_test = np.array([i[0] for i in test]) / 255
y_test = np.array([i[1] for i in test])

x_train = x_train.reshape(-1, img_size, img_size, 1)
x_val = x_val.reshape(-1, img_size, img_size, 1)
x_test = x_test.reshape(-1, img_size, img_size, 1)

# Crear el modelo
model = Sequential()
model.add(Conv2D(32, (3,3), strides=1, padding='same', activation='relu', input_shape=(150,150,1)))
model.add(BatchNormalization())
model.add(MaxPool2D((2,2), strides=2, padding='same'))
model.add(Conv2D(64, (3,3), strides=1, padding='same', activation='relu'))
model.add(Dropout(0.1))
model.add(BatchNormalization())
model.add(MaxPool2D((2,2), strides=2, padding='same'))
model.add(Conv2D(64, (3,3), strides=1, padding='same', activation='relu'))
model.add(BatchNormalization())
model.add(MaxPool2D((2,2), strides=2, padding='same'))
model.add(Conv2D(128, (3,3), strides=1, padding='same', activation='relu'))
model.add(Dropout(0.2))
model.add(BatchNormalization())
model.add(MaxPool2D((2,2), strides=2, padding='same'))
model.add(Conv2D(256, (3,3), strides=1, padding='same', activation='relu'))
model.add(Dropout(0.2))
model.add(BatchNormalization())
model.add(MaxPool2D((2,2), strides=2, padding='same'))
model.add(Flatten())
model.add(Dense(units=128, activation='relu'))
model.add(Dropout(0.2))
model.add(Dense(units=1, activation='sigmoid'))
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
    
    print(f'Imagen recibida: {image_path}')
    print(f'Resultado del análisis de IA: {result}')

if __name__ == '__main__':
    image_path = sys.argv[1]
    main(image_path)
