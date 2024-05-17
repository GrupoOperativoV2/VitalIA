import sys

def main(image_path):
    # Aquí puedes procesar la imagen
    print(f'Imagen recibida: {image_path}')
    # Supongamos que el análisis de IA devuelve un resultado
    result = "Resultado del análisis de IA"
    print(result)

if __name__ == '__main__':
    image_path = sys.argv[1]
    main(image_path)


