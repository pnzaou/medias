import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Inscription = () => {
    const navigate = useNavigate()
    const {handleSubmit, register, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        if(data.mdp !== data.mdpConfirm){
            toast.error('les deux mots de passe doivent être identiques')
        } else {
            axios.get(`http://localhost:3000/users?mdp=${data.mdp}`)
            .then(res => {
                if(res.data.length > 0){
                    toast.error("Cette adresse email existe déjà")
                } else{
                    axios.post('http://localhost:3000/users', data)
                    .then(res => {
                        console.log(res);
                        toast.success('Inscription réussie !',{
                            position: 'bottom-right'
                        })
                        navigate('/connexion')
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error('Une erreur est survenue', {
                            position: 'bottom-right'
                        })
                    })
                }
            })
        }
    }
    return (
        <Stack alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100vh'} backgroundColor={'#f5f5f5'}>
            <Box width={400} sx={{
                backgroundColor: '#fff',
                padding: 3
            }}>
                <Typography variant='h5'>Inscription</Typography>
                <form style={{ 
                    marginTop: 15
                 }} onSubmit={handleSubmit(onSubmit)}>
                    <Stack flexDirection={'column'} gap={2}>
                        <TextField id='outlined-basic' label='Votre nom' variant='outlined' fullWidth size='small' {...register('nom', {required: "Ce champ est obligatoire"})}/>
                        <TextField id='outlined-basic' label='Votre email' variant='outlined' fullWidth size='small' type='email' {...register('email', {required: "Ce champ est obligatoire", pattern: "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"})}/>
                        <TextField id='outlined-basic' label='Votre mot de passe' variant='outlined' fullWidth size='small' type='password' {...register('mdp', {required: 'Ce champ est obligatoire', minLength: { value: 6, message: 'Veuillez saisir un mot de passe ayant minimum 6 caractèrs'}})}/>
                        <TextField id='outlined-basic' label='Confirmez votre mot de passe' variant='outlined' fullWidth size='small' type='password' {...register('mdpConfirm', {required: 'Ce champ est obligatoire', minLength:{value: 6, message: 'Veuillez saisir un mot de passe ayant minimum 6 caractèrs'}})}/>
                    </Stack>
                    <Button variant='contained' type='submit' sx={{ 
                        marginTop: 2
                     }}>Inscription</Button>
                </form>
            </Box>
        </Stack>
    );
}

export default Inscription;
