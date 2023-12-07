const express = require('express');
const app = express();
require('dotenv').config({ path: './env/.env' });
const path = require('path')
app.set('views', path.join(__dirname,'views'))
const conexion = require('./database/db')
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const secciones = require('./routers/navegador')

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/recursos',express.static(path.join(__dirname,'public')))

app.use(session({
    secret:'123455',
    resave:true,
    saveUninitialized:true
}))

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/registrate', (req, res) => {
    res.render('register.ejs');
});

app.post('/registrate', async (req, res) => {
    const User = req.body.User;
    const Email = req.body.Email;
    const Contrasena = req.body.Contrasena;
    let encriptarPass = await bcryptjs.hash(Contrasena,8);
    conexion.query('INSERT INTO usuarios SET  ?',{User:User,Email:Email,Contrasena:encriptarPass},(error,results)=>{
        if (error) {
            throw error;
        } else {
            res.render('register.ejs',{
                alert:true,
                position: 'center',
                icon: 'success',
                title: 'Usuario registrado',
                showConfirmButton: false,
                timer: 110500,
                ruta:''
            })
        }
    })
});

app.post('/autenticacion', async (req,res)=>{
    const User = req.body.User;
    const Contrasena = req.body.Contrasena;
    let encriptarPass = await bcryptjs.hash(Contrasena,8);
    if (User && Contrasena) {
        conexion.query('SELECT * FROM usuarios WHERE User = ?',[User], async (error,results)=>{
            if (results.length == 0 || !(await bcryptjs.compare(Contrasena,results[0].Contrasena))) {
                res.render('login.ejs',{
                alert:true,
                position: 'center',
                icon: 'error',
                title: 'Usuario y/o contraseña incorrectos',
                showConfirmButton: false,
                timer: 110500,
                ruta:'login'
                })
            } else{
            req.session.todook = true;    
            req.session.User= results[0].User
            res.render('login.ejs',{
            alert:true,
            position: 'center',
            icon: 'success',
            title: 'Bienvenido',
            showConfirmButton: false,
            timer: 110500,
            ruta:''
        })
            }
        })
    } else {
        res.render('login.ejs',{
        alert:true,
        position: 'center',
        icon: 'warning',
        title: 'Rellene todos los campos',
        showConfirmButton: false,
        timer: 110500,
        ruta:'login'
    })
    }
})

app.get('/', (req,res)=>{
    if (req.session.todook) {
        res.render('index.ejs',{
            login:true,
            User: req.session.User
        });
    }else{
        res.render('index.ejs',{
            login:false,
            User:'Debe de iniciar sesión'
        })
    }
})


app.get('/salir',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

app.use('/monitoreo', secciones)

const PUERTO = process.env.PORT;
app.listen(PUERTO, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}`)
})