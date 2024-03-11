var llave = "";
const clave = {
    'a': 'b', 'b': 'c', 'c': 'd', 'd': 'e', 'e': 'f',
    'f': 'g', 'g': 'h', 'h': 'i', 'i': 'j', 'j': 'k',
    'k': 'l', 'l': 'm', 'm': 'n', 'n': 'o', 'o': 'p',
    'p': 'q', 'q': 'r', 'r': 's', 's': 't', 't': 'u',
    'u': 'v', 'v': 'w', 'w': 'x', 'x': 'y', 'y': 'z',
    'z': 'a', 'A': 'B', 'B': 'C', 'C': 'D', 'D': 'E',
    'E': 'F', 'F': 'G', 'G': 'H', 'H': 'I', 'I': 'J',
    'J': 'K', 'K': 'L', 'L': 'M', 'M': 'N', 'N': 'O',
    'O': 'P', 'P': 'Q', 'Q': 'R', 'R': 'S', 'S': 'T',
    'T': 'U', 'U': 'V', 'V': 'W', 'W': 'X', 'X': 'Y',
    'Y': 'Z', 'Z': 'A',
    '0': '1', '1': '2', '2': '3', '3': '4', '4': '5',
    '5': '6', '6': '7', '7': '8', '8': '9', '9': '0',
    '-': '_'
};
function cifrarMensaje(mensaje) {

    let resultado = '';
    for (let i = 0; i < mensaje.length; i++) {
        const char = mensaje[i];
        resultado += clave[char] || char;
    }

    return resultado;
}

function descifrarMensaje(mensajeCifrado) {

    const claveInversa = {};
    Object.keys(clave).forEach((key) => {
        claveInversa[clave[key]] = key;
    });

    let resultado = '';
    for (let i = 0; i < mensajeCifrado.length; i++) {
        const char = mensajeCifrado[i];
        resultado += claveInversa[char] || char;
    }

    return resultado;
}
llave = descifrarMensaje("tl_9a00nz33IECyZLX8rSbVU4CmclGKkfpkMKRoPf9vlwLjGEAD");

var API_KEY = llave;
export async function getCompletion(prompt, nivel) {
  try {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + API_KEY
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ "role": "user", "content": prompt }]
      })
    });

    if (!response.ok) {
      throw new Error('Error fetching completion');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error in getCompletion:', error);
    return 'An error occurred while processing your request. Please try again later.';
  }
}