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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Register = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [disable, setDisable] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onSubmit = async () => {
    setDisable(true);
    console.log(name, email, phoneNo, password);
    if (!name || !email || !phoneNo || !password || !confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Form incomplete',
        description: 'Please fill all the fields.',
      });
    }
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Passwords do not match.',
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
          'http://localhost:3000/api/user',
          { name, email, phoneNo, password },
          config
        )
        .catch((error) => {
          // Handle the error
          if (error.response.status === 409) {
            console.log('userexixts');
            toast({
              variant: 'destructive',
              title: 'User already exists',
            });
          }
          if (error.response.status === 400) {
            console.log('userexixts');
            toast({
              variant: 'destructive',
              title: 'Please fill all the fields.',
            });
          }
          if (error.response.status === 401) {
            toast({
              variant: 'destructive',
              title: 'Invalid Credentials.',
            });
          }
          // console.log('An error occurred:', error);
          console.log('Error status:', error.response.status);
          // console.log('Error message:', error.message);
          // console.log('Error data:', error.response.data);
          setDisable(false);
        });
      console.log(data);
      toast({
        variant: 'success',
        title: 'Registration Successful.',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setDisable(false);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
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
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='name'
          />
        </div>
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
          <Label htmlFor='phoneno'>Phone No</Label>
          <Input
            id='phoneno'
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder='+91 0000000000'
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
        <div className='space-y-1'>
          <Label htmlFor='username'>Confirm password</Label>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={show ? 'text' : 'password'}
              placeholder='confirm password'
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
        <div className='space-y-1'>
          <Label htmlFor='gender'>Gender</Label>
          <RadioGroup id='gender' className='flex' defaultValue='comfortable'>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='comfortable' id='r2' />
              <Label htmlFor='r2'>Male</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='default' id='r1' />
              <Label htmlFor='r1'>Female</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='compact' id='r3' />
              <Label htmlFor='r3'>Other</Label>
            </div>
          </RadioGroup>
        </div>

        <div className='space-y-1 flex '>
          <div className='space-y-1'>
            <Label htmlFor='gender'>Interested in adopting a pet?</Label>
            <RadioGroup id='gender' className='flex' defaultValue='comfortable'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='default' id='r1' />
                <Label htmlFor='r1'>Yes</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='comfortable' id='r2' />
                <Label htmlFor='r2'>No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className='space-y-1'>
            <Label htmlFor='gender'>Interested in fostering animals?</Label>
            <RadioGroup id='gender' className='flex' defaultValue='comfortable'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='comfortable' id='r2' />
                <Label htmlFor='r2'>Yes</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='default' id='r1' />
                <Label htmlFor='r1'>No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button onClick={onSubmit} disabled={disable}>
          {disable && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Register
        </Button>
        <Button>Cancel</Button>
      </CardFooter>
    </Card>
  );
};

export default Register;
