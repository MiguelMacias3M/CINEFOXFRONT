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

    // Decodificar el token para obtener la información del usuario
    const decodeJWT = (token: string) => {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    };
    
    const decoded = decodeJWT(data.token);
    

    // Retornar la información decodificada y el token
    return { decoded, token: data.token };
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

//Registro de usuasrios administradores
export const registerUsuarioAdmin = async (nombreUsuario: string, apellidoUsuario: string, edadUsuario: string, correoUsuario: string, telefonoUsuario: string, contrasenaUsuario: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreUsuario,
        apellidoUsuario,
        edadUsuario: parseInt(edadUsuario), // Asegurarse de que edadUsuario sea un número
        correoUsuario,
        telefonoUsuario,
        contrasenaUsuario,
        tipoUsuario: 'admin' // Especificamos que este usuario es un administrador
      }),
    });

    if (!response.ok) {
      throw new Error('Error al registrar usuario administrador');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const registerUsuario = async (nombreUsuario: string, apellidoUsuario: string, edadUsuario: string, correoUsuario: string, telefonoUsuario: string, contrasenaUsuario: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreUsuario,
        apellidoUsuario,
        edadUsuario: parseInt(edadUsuario), // Asegurarse de que edadUsuario sea un número
        correoUsuario,
        telefonoUsuario,
        contrasenaUsuario,
        tipoUsuario: 'cliente' // Puedes cambiar el tipo de usuario si es necesario
      }),
    });

    if (!response.ok) {
      throw new Error('Error al registrar usuario');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para crear una nueva película
export const createMovie = async (nombrePelicula: string, directorPelicula: string, duracionPelicula: number, actoresPelicula: string, clasificacionPelicula: string, idHorario: number, precioBoleto: number) => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Token:', token);
    console.log('Datos de la película:', {
      nombrePelicula,
      directorPelicula,
      duracionPelicula,
      actoresPelicula,
      clasificacionPelicula,
      idHorario,
      precioBoleto
    });

    const response = await fetch(`${API_BASE_URL}/peliculas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombrePelicula,
        directorPelicula,
        duracionPelicula,
        actoresPelicula,
        clasificacionPelicula,
        idHorario,
        precioBoleto,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error al crear la película:', errorText);
      throw new Error('Error al crear la película');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en createMovie:', error);
    throw error;
  }
};


export const getAllPeliculas = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/peliculas`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Respuesta de la API:', await response.text()); // Log para ver el contenido de la respuesta
      throw new Error('Error al obtener las películas');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getAllPeliculas:', error);
    throw error;
  }
};



// Función para crear un nuevo horario
export const createHorario = async (horaProgramada: string, turno: string, fechaDeEmision: string) => {
  try {
    console.log("Datos enviados:", { horaProgramada, turno, fechaDeEmision }); // Agrega este log
    const response = await fetch(`${API_BASE_URL}/horarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        horaProgramada,
        turno,
        fechaDeEmision,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Respuesta de error:", errorData);
      throw new Error('Error al crear el horario');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para obtener todos los horarios
export const getHorarios = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/horarios`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los horarios');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para actualizar un horario
export const updateHorario = async (idHorario: string, horaProgramada: string, turno: string, fechaDeEmision: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/horarios/${idHorario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        horaProgramada,
        turno,
        fechaDeEmision,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el horario');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para eliminar un horario
export const deleteHorario = async (idHorario: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/horarios/${idHorario}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el horario');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

