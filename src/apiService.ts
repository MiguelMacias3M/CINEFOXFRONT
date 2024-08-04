import AsyncStorage from '@react-native-async-storage/async-storage';

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
    // Guardar el token en AsyncStorage
    await AsyncStorage.setItem('token', data.token);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const logoutUsuario = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); // Recuperar el token almacenado
    if (!token) throw new Error('No se encontró el token');

    const response = await fetch(`${API_BASE_URL}/usuarios/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al cerrar sesión');
    }

    // Eliminar el token de AsyncStorage después de cerrar sesión
    await AsyncStorage.removeItem('token');

    return await response.json();
  } catch (error) {
    console.error('Error en logoutUsuario:', error);
    throw error;
  }
};
