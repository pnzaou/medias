import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Connexion = () => {
    const navigate = useNavigate()
    useEffect(()=> {
        if(localStorage.getItem('user')){
            toast.success('Vous êtes déjà connecté.')
            navigate('/')
        }
    })
    const {handleSubmit, register, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        axios.get(`http://localhost:3000/users?email=${data.email}&mdp=${data.mdp}`)
        .then(res => {
            if(res.data.length > 0){
                localStorage.setItem('user', JSON.stringify(res.data[0]))
                navigate('/')
                toast.success('Connexion réussie.')
            }else {
                toast.error('Email ou mot de passe incorrect !')
            }
        })
    }
    return (
        <Stack alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100vh'} backgroundColor={'#f5f5f5'}>
            <Box width={400} sx={{
                backgroundColor: '#fff',
                padding: 3
            }}>
                <Typography variant='h5'>Authentification</Typography>
                <form style={{ 
                    marginTop: 15
                 }} onSubmit={handleSubmit(onSubmit)}>
                    <Stack flexDirection={'column'} gap={2}>
                        <TextField id='outlined-basic' label='Votre email' variant='outlined' fullWidth size='small' type='email' {...register('email', {required: "Ce champ est obligatoire", pattern: "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"})}/>
                        <TextField id='outlined-basic' label='Votre mot de passe' variant='outlined' fullWidth size='small' type='password' {...register('mdp', {required: 'Ce champ est obligatoire', minLength: { value: 6, message: 'Veuillez saisir un mot de passe ayant minimum 6 caractèrs'}})}/>
                    </Stack>
                    <Button variant='contained' type='submit' sx={{ 
                        marginTop: 2
                     }}>Se connecter</Button>
                     <Typography paddingTop={2}>Vous n'avez pas de compte ? <Link to='/inscription'>s'inscrire</Link></Typography>
                </form>
            </Box>
        </Stack>
    );
}

export default Connexion;
