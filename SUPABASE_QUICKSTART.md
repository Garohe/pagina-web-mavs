# ⚡ Supabase Quick Start - Mavs Thrift

## 🚀 Configuración en 4 Pasos (15 minutos)

---

## PASO 1: Crear Proyecto en Supabase

### 1.1 Ir a Supabase
```
🌐 Abre tu navegador y ve a: https://supabase.com
```

### 1.2 Crear Cuenta
- Click en **"Start your project"** o **"Sign Up"**
- Opción rápida: **"Continue with GitHub"** o **"Continue with Google"**
- O usa tu email

### 1.3 Crear Nuevo Proyecto
1. Una vez dentro, click en **"New Project"**
2. Llena los datos:
   ```
   Name: Mavs Thrift
   Database Password: [Crea una contraseña fuerte y GUÁRDALA]
   Region: [Elige la más cercana, ej: East US]
   Pricing Plan: [Selecciona FREE]
   ```
3. Click en **"Create new project"**
4. ⏳ **ESPERA 2-3 MINUTOS** mientras se crea el proyecto

---

## PASO 2: Obtener Credenciales

### 2.1 Ir a Settings
- En el sidebar izquierdo, click en el ícono de **⚙️ Settings**
- Luego click en **"API"**

### 2.2 Copiar Credenciales
Verás algo así:

```
Project URL
https://abcdefghijk.supabase.co
[Copy]

Project API keys
anon / public
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
[Copy]
```

### 2.3 Crear archivo .env
1. En tu proyecto (carpeta `vintage-threads`)
2. Crea un archivo llamado **`.env`** (así, sin nada antes del punto)
3. Pega esto:

```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_PENDIENTE
```

**IMPORTANTE:** Reemplaza con TUS valores que copiaste.

---

## PASO 3: Crear las Tablas de la Base de Datos

### 3.1 Ir a SQL Editor
- En Supabase, click en **"SQL Editor"** en el sidebar
- Click en **"New Query"**

### 3.2 Copiar y Pegar el SQL
1. Abre el archivo **`SUPABASE_SETUP.md`** (en tu proyecto)
2. Busca la sección "Paso 4: Crear las Tablas en la Base de Datos"
3. Copia TODO el código SQL (desde `CREATE EXTENSION` hasta el final)
4. Pégalo en el SQL Editor de Supabase
5. Click en el botón **"Run"** (▶️) abajo a la derecha

### 3.3 Verificar
Si todo salió bien, verás:
```
Success. No rows returned
```

¡Perfecto! Tus tablas están creadas.

---

## PASO 4: Configurar Storage para Imágenes

### 4.1 Ir a Storage
- En Supabase, click en **"Storage"** en el sidebar
- Click en **"Create a new bucket"**

### 4.2 Crear Bucket
```
Name: product-images
Public bucket: ✅ YES (marca el checkbox)
File size limit: 5 MB
Allowed MIME types: image/*
```

Click en **"Create bucket"**

### 4.3 Configurar Políticas (Policies)
1. Click en el bucket **"product-images"** que acabas de crear
2. Ve a la pestaña **"Policies"**
3. Click en **"New Policy"**
4. Selecciona **"For full customization"**
5. Copia y pega esta política:

**Policy para SELECT (leer imágenes):**
```sql
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');
```

**Policy para INSERT (subir imágenes - solo autenticados):**
```sql
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
```

Click en **"Review"** y luego **"Save policy"**

---

## PASO 5: Crear Usuario Admin

### 5.1 Crear Usuario
1. En Supabase, ve a **"Authentication"** → **"Users"**
2. Click en **"Add user"** → **"Create new user"**
3. Llena:
   ```
   Email: admin@mavsthrift.com
   Password: [Tu contraseña segura]
   Auto Confirm User: ✅ YES
   ```
4. Click en **"Create user"**

### 5.2 Darle Rol de Admin
1. Ve a **"SQL Editor"**
2. Click en **"New Query"**
3. Pega esto:

```sql
-- Insertar el perfil del admin en la tabla users
INSERT INTO users (id, email, first_name, last_name, role)
SELECT
  id,
  email,
  'Admin',
  'Mavs Thrift',
  'admin'
FROM auth.users
WHERE email = 'admin@mavsthrift.com';
```

4. Click en **"Run"** (▶️)

---

## ✅ VERIFICACIÓN FINAL

Verifica que todo esté listo:

### Checklist:
- [ ] Proyecto creado en Supabase ✓
- [ ] Archivo `.env` creado con tus credenciales ✓
- [ ] Tablas de base de datos creadas (SQL ejecutado) ✓
- [ ] Bucket `product-images` creado ✓
- [ ] Políticas de Storage configuradas ✓
- [ ] Usuario admin creado ✓

---

## 🎉 ¡LISTO!

Si completaste todos los pasos, tu base de datos está 100% configurada.

### Próximo Paso:
Regresa aquí y dime **"Listo"** o **"Configuración completa"**

Entonces voy a:
1. ✅ Actualizar TODO el código para usar Supabase
2. ✅ Cambiar el nombre a "Mavs Thrift"
3. ✅ Configurar Stripe para pagos
4. ✅ Hacer que todo funcione con base de datos real

---

## ❓ ¿Necesitas Ayuda?

Si te atascas en algún paso, dime:
- "Ayuda con el Paso X"
- "No encuentro dónde crear el proyecto"
- "Error al ejecutar SQL"
- Etc.

¡Estoy aquí para ayudarte! 💪
