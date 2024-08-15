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


export const registerUsuarioAdmin = async (nombreUsuario: string, apellidoUsuario: string, edadUsuario: string, correoUsuario: string, telefonoUsuario: string, contrasenaUsuario: string) => {
  try {
    // Validación de la edad antes de enviar
    const edadUsuarioParsed = parseInt(edadUsuario);
    if (isNaN(edadUsuarioParsed) || edadUsuarioParsed <= 0) {
      throw new Error('La edad del usuario debe ser un número positivo.');
    }

    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreUsuario: nombreUsuario.trim(),
        apellidoUsuario: apellidoUsuario.trim(),
        edadUsuario: edadUsuarioParsed,
        correoUsuario: correoUsuario.trim(),
        telefonoUsuario: telefonoUsuario.trim(),
        contrasenaUsuario: contrasenaUsuario,
        tipoUsuario: 'admin' // Especificar el tipo de usuario como admin
      }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Obtener detalles del error desde la respuesta del servidor
      console.error('Detalles del error del servidor:', errorData);
      throw new Error('Error al registrar usuario administrador');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en registerUsuarioAdmin:', error);
    throw error;
  }
};
 //Registro de usuarios administradores
export const registerUsuarioCliente = async (
  nombreUsuario: string,
  apellidoUsuario: string,
  edadUsuario: string,
  correoUsuario: string,
  telefonoUsuario: string,
  contrasenaUsuario: string
) => {
  try {
    // Validación de la edad antes de enviar
    const edadUsuarioParsed = parseInt(edadUsuario);
    if (isNaN(edadUsuarioParsed) || edadUsuarioParsed <= 0) {
      throw new Error('La edad del usuario debe ser un número positivo.');
    }

    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreUsuario: nombreUsuario.trim(),
        apellidoUsuario: apellidoUsuario.trim(),
        edadUsuario: edadUsuarioParsed,
        correoUsuario: correoUsuario.trim(),
        telefonoUsuario: telefonoUsuario.trim(),
        contrasenaUsuario: contrasenaUsuario,
        tipoUsuario: 'cliente' // Especificar el tipo de usuario como cliente
      }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Obtener detalles del error desde la respuesta del servidor
      console.error('Detalles del error del servidor:', errorData);
      throw new Error('Error al registrar usuario cliente');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en registerUsuarioCliente:', error);
    throw error;
  }
};

export const createMovie = async (formData: FormData) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Recupera el token del almacenamiento
    const response = await fetch(`${API_BASE_URL}/peliculas`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Incluye el token en la cabecera de autorización
      },
      body: formData, // Envía los datos de la película como FormData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error al crear la película:', errorText);
      throw new Error('Error al crear la película');
    }

    return await response.json(); // Devuelve la respuesta en formato JSON si la solicitud fue exitosa
  } catch (error) {
    console.error('Error en createMovie:', error);
    throw error;
  }
};



// Función para obtener todas las películas
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

export const updatePelicula = async (idPelicula: string, datosActualizados: object) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/peliculas/${idPelicula}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(datosActualizados),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al actualizar la película:', errorData);
      throw new Error('Error al actualizar la película');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en updatePelicula:', error);
    throw error;
  }
};


//Eliminar peliculas
export const deletePelicula = async (idPelicula: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/peliculas/${idPelicula}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al eliminar la película:', errorData);
      throw new Error('Error al eliminar la película');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en deletePelicula:', error);
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

//Salas
//Obtener todas las salas 
export const getSalas = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/salas`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al obtener las salas:', errorData);
      throw new Error('Error al obtener las salas');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getSalas:', error);
    throw error;
  }
};



