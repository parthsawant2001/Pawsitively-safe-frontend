'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { Eye } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmit = async () => {
    setDisable(true);
    console.log(email, password);
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Form incomplete',
        description: 'Please fill all the fields.',
      });
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios
        .post(
          'http://localhost:3000/api/user/login',
          { email, password },
          config
        )
        .catch((error) => {
          // Handle the error
          if (error.response.status === 401) {
            toast({
              variant: 'destructive',
              title: 'Invalid Credentials.',
            });
          }
          if (error.response.status === 400) {
            console.log('userexixts');
            toast({
              variant: 'destructive',
              title: 'Please fill all the fields.',
            });
          }
          // console.log('An error occurred:', error);
          console.log('Error status:', error.response.status);
          // console.log('Error message:', error.message);
          // console.log('Error data:', error.response.data);
          setDisable(false);
          setEmail('');
          setPassword('');
        });
      console.log(data);
      toast({
        variant: 'success',
        title: 'Registration Successful.',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setDisable(false);
      router.push('/home');
    } catch (error) {
      // console.log(error);
      // if (error.response.status === 409)
      //   toast({
      //     variant: 'destructive',
      //     title: 'user already exists.',
      //   });
      setDisable(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Email</Label>
          <Input
            id='name'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='example@gmail.com'
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='username'>Password</Label>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? 'text' : 'password'}
              placeholder='password'
            />
            <Button
              type='submit'
              onClick={() => setShow(!show)}
              variant='secondary'
            >
              <Eye className=' h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button onClick={onSubmit} disabled={disable}>
          {disable && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Login
        </Button>
        <Button>Cancel</Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
