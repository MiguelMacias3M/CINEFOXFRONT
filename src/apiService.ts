const API_BASE_URL = 'https://apiboletos.onrender.com';

export const loginUsuario = async (correoUsuario: string, contrasenaUsuario: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correoUsuario, contrasenaUsuario }),
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
