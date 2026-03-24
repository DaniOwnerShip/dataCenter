# Sistema de Informes de Cambio de Turno 
![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/WebSockets-Socket.IO-black?logo=socket.io)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Descripción

Aplicación web **full stack** desarrollada para facilitar el **traspaso de información entre turnos de trabajo** en un entorno industrial.

- Permite generar **informes por planta** y un **informe final consolidado** para su envío a la plataforma principal.
- El sistema carga automáticamente el **último documento guardado de cada unidad**, permitiendo al usuario actualizar la información manteniendo el seguimiento histórico de las tareas.
- Para editar un informe es necesario **reservar el documento**, evitando conflictos de edición. La aplicación dispone de:
  - **Reserva normal**, que conecta al usuario con el chat interno de la aplicación.
  - **Reserva rápida**, para acceso inmediato al documento.
- La aplicación incorpora **verificación de integridad de documentos**, evitando modificaciones posteriores una vez finalizado el informe mediante la generación de un **checksum**.

---

## Características

- Creación y edición de **informes de cambio de turno**
- Sistema de **reserva de documento** para evitar ediciones simultáneas
- **Chat en tiempo real** mediante WebSockets para comunicación entre usuarios
- Generación de **checksum y firma del documento** al finalizar el informe para garantizar la integridad del contenido
- Interfaz web con **ventanas flotantes** para visualizar simultáneamente distintas áreas o plantas
- **Contenedor multimedia**: pestañas para audio, video e imágenes

---

## Arquitectura

La aplicación sigue una arquitectura full stack con:

- Frontend desarrollado con Next.js
- Backend API basado en Express
- Comunicación en tiempo real mediante WebSockets
- Persistencia de informes en archivos JSON
 

## Tecnologías

### Frontend
- Next.js
- TypeScript

### Backend
- Node.js
- Express

### Comunicación
- WebSockets (Socket.IO)


## Notas

⚠️ En este repositorio se presenta únicamente como **ejemplo técnico del desarrollo de una aplicación web full stack**, sin incluir información sensible ni datos reales.

---

## Configuración de entorno (frontend)

1. Copia `.env.local.example` como `.env.local`.
2. Configura:
   - `NEXT_PUBLIC_API_BASE_URL` (URL del backend Express)
   - `NEXT_PUBLIC_SERVER_AUTH_TOKEN` (mismo token que `SERVER_AUTH_TOKEN` del backend)

El frontend envía el token en:
- `Authorization: Bearer <token>` para REST
- `auth.token` en el handshake de Socket.IO
 