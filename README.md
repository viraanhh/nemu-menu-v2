# nemu-menu-v2
Here is a detailed guide to set up this project.

## Setup Tutorial
### 1. Git Clone
As always, git clone this project to your local working directory.
```
git clone https://github.com/viraanhh/nemu-menu-v2.git
```
### 2. Setup the Backend
Change directory to nemu-menu api with this command:

```
nemu-menu-v2> cd .\nemu-menu-api\
```

**Example:**

Before (working directory):
```
nemu-menu-v2>
```

After changing directory:
```
nemu-menu-v2\nemu-menu-api>
```

If you don't have Laravel installed, install it first with (before retrying the above step):
```
nemu-menu-v2\nemu-menu-api> composer global require laravel/installer
```

Though, if you still don't have both Laravel *or* Composer installed, just follow this instruction: https://laravel.com/docs/12.x/installation

Then, generate the app key with:
```
nemu-menu-v2\nemu-menu-api> php artisan key:generate
```

Make sure you have .env file located for this backend in nemu-menu-v2\nemu-menu-api\.env. If you don't have the file, create the file and copy my configurations just like this:
```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:5T68f8DfAwcfROxeh3d9PFXAs6dZ3unt2n0Det48c/U=
APP_DEBUG=true
APP_URL=http://localhost:8000

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
# APP_MAINTENANCE_STORE=database

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=oracle
DB_HOST=127.0.0.1
DB_PORT=1521
DB_DATABASE=FREEPDB1
DB_USERNAME=SYSTEM
DB_PASSWORD=password
DB_SERVICE_NAME=FREEPDB1

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
# CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"
```

Moving on, don't forget to set up your Oracle DB. It's pretty complicated so follow these steps:
* Go to this GDrive Link for all the folders/files needed: https://drive.google.com/drive/folders/1e1nVG7XuyT8sgWuMq2rr2RajFpCQY_tI?usp=sharing
* Download all the files. The DB_BACKUP.DMP is the complete DB copy, you can set it up like this. In your CMD, run:
    ```
    impdp SYSTEM/<your_password> directory=DATA_PUMP_DIR dumpfile=db_backup.dmp full=y
    ```
    Note: You may need to move the dumpfile (DB_BACKUP.DMP) to your dump directory (mine's on: **C:\app\Jia\product\23ai\admin\FREE\dpdump**). To check where is your dump directory you can run this command on your SQL Developer: 
    ```
    SELECT * FROM ALL_DIRECTORIES WHERE DIRECTORY_NAME = 'DATA_PUMP_DIR';
    ```
* Then, extract your instantclient to a directory (mine's on: C:\oracle\instantclient_23)
* Go to this folder: **C:\oracle\instantclient_23\instantclient_23_8**, then, copy ALL **.dll** files to to **c:\xampp\php** AND to **c:\xampp\apache\bin**, also place them here just in case: **C:\xampp\php\ext**
* Reference for handling this instaclient installation in above steps are here (https://stackoverflow.com/questions/68162636/php-warning-php-startup-unable-to-load-dynamic-library-oci8-12c)
* Continuing on, extract this **php_oci8-3.4.0-8.2-ts-vs16-x64.zip** file wherever. Then, copy this file (**php_oci8_19.dll**) to this folder: **C:\xampp\php\ext**
* Finally, you want to check your php.ini file located in this path: **C:\xampp\php\php.ini**, and make sure that you have activated this extension: "extension=oci8_19"
* Last step for this PHP configuration, just in case, restart your Apache client with XAMPP just by stopping it then starting it again

Then, install both PHP and Node dependencies with:
```
nemu-menu-v2\nemu-menu-api> composer install
nemu-menu-v2\nemu-menu-api> npm install
```

But if you somehow got an error because you don't have node or npm installed, follow this instruction: https://www.geeksforgeeks.org/how-to-download-and-install-node-js-and-npm/

Perfect, finally run the API server with:
```
nemu-menu-v2\nemu-menu-api> php artisan serve
```

### 3. Setup the Frontend
Create a new window for your terminal, navigate to your project.

Then, change directory to nemu-menu-app with this command:

```
nemu-menu-v2> cd .\nemu-menu-app\
```

**Example:**

Before (working directory):
```
nemu-menu-v2>
```

After changing directory:
```
nemu-menu-v2\nemu-menu-app>
```

Perfect, then you need to check if you have .env located in this folder: **nemu-menu-v2\nemu-menu-app**. If you don't have it, make a new one with these configurations:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

NEXT_PUBLIC_SUPABASE_URL=https://ebnlvfdbiafiqjumeuyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibmx2ZmRiaWFmaXFqdW1ldXl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4ODAxMjMsImV4cCI6MjA2MzQ1NjEyM30.frvhXKE-aEepNGG71l4P8FMNbg6_NXF506UVJnGRR-0
```

Install the node dependencies
```
nemu-menu-v2\nemu-menu-app> npm install
```

Build the project
```
nemu-menu-v2\nemu-menu-app> npm run build
```

After it finished building, run:
```
nemu-menu-v2\nemu-menu-app> npm run start
```

A successful running server for the frontend will return something similar like this:
```
nemu-menu-v2\nemu-menu-app> npm run start

> nemu-menu-app@0.1.0 start
> next start

   ▲ Next.js 15.3.2
   - Local:        http://localhost:3000
   - Network:      http://192.168.5.1:3000

 ✓ Starting...
 ✓ Ready in 920ms

```

Good luck, all the best.
