import { cn } from '@/lib/utils';
import {
  signup,
  signUpSchema,
  type SignUpValues,
} from '@/services/auth/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export default function CustomerSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: FormData) => signup(data),
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const photo = watch('photo');

  const onSubmit = async (val: SignUpValues) => {
    console.log(val);

    try {
      const formData = new FormData();

      formData.append('name', val.name);
      formData.append('email', val.email);
      formData.append('password', val.password);
      formData.append('photo', val.photo);

      await mutateAsync(formData);

      navigate('/sign-in');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id='Content-Container'
      className='relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(179.86deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white'
    >
      <div id='Background' className='absolute top-0 w-full h-[480px]'>
        <div className='absolute w-full h-full top-0 bg-[linear-gradient(359.16deg,_#000000_6.6%,_rgba(14,14,36,0)_99.33%)]' />
        <img
          src='/assets/images/backgrounds/signup.png'
          className='w-full h-full object-cover'
          alt='background'
        />
      </div>
      <img
        src='/assets/images/logos/logo.svg'
        className='relative flex max-w-[188px] mx-auto mt-[60px]'
        alt='logo'
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative flex flex-col gap-[30px] px-5 py-[60px] my-auto'
      >
        <h1 className='font-bold text-[26px] leading-[39px]'>Sign Up</h1>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-5'>
            <label className='relative flex w-[100px] h-[100px] shrink-0 rounded-full overflow-hidden bg-[#FFFFFF33] backdrop-blur-sm'>
              <button
                type='button'
                onClick={() => inputRef?.current?.click()}
                id='Text-Label'
                className={cn(
                  'w-full h-full flex items-center justify-center text-center font-semibold',
                  photo !== undefined ? 'hidden' : 'block'
                )}
              >
                Add <br />
                Photo
              </button>
              {photo !== undefined && (
                <img
                  id='Avatar-Preview'
                  src={URL.createObjectURL(photo)}
                  className='w-full h-full object-cover'
                  alt='avatar'
                />
              )}
              <input
                type='file'
                className='absolute bottom-0 -left-3/4 -z-'
                {...register('photo')}
                ref={inputRef}
                onChange={(e) => {
                  if (e.target.files) {
                    setValue('photo', e.target.files[0]);
                  }
                }}
              />
            </label>
            <button
              type='button'
              onClick={() => setValue('photo', undefined)}
              className='rounded-full py-2 px-3 bg-[#FFFFFF33] backdrop-blur-sm font-bold text-sm'
            >
              Delete
            </button>
            <p className='text-xs text-red-500'>
              {errors.photo?.message?.toString()}
            </p>
          </div>
          <label className='flex flex-col gap-2'>
            <p>Complete Name</p>
            <input
              type='text'
              className='appearance-none outline-none rounded-full py-3 px-[18px] bg-[#FFFFFF33] backdrop-blur-sm font-semibold placeholder:font-normal placeholder:text-white focus:ring-1 focus:ring-white transition-all duration-300'
              placeholder='What’s your name'
              {...register('name')}
            ></input>
            <p className='text-xs text-red-500'>{errors.name?.message?.toString()}</p>
          </label>
          <label className='flex flex-col gap-2'>
            <p>Email Address</p>
            <input
              type='email'
              className='appearance-none outline-none rounded-full py-3 px-[18px] bg-[#FFFFFF33] backdrop-blur-sm font-semibold placeholder:font-normal placeholder:text-white focus:ring-1 focus:ring-white transition-all duration-300'
              placeholder='What’s your email'
              {...register('email')}
            ></input>
            <p className='text-xs text-red-500'>{errors.email?.message?.toString()}</p>
          </label>
          <label className='flex flex-col gap-2'>
            <p>Password</p>
            <input
              type='password'
              className='appearance-none outline-none rounded-full py-3 px-[18px] bg-[#FFFFFF33] backdrop-blur-sm font-semibold placeholder:font-normal placeholder:text-white focus:ring-1 focus:ring-white transition-all duration-300'
              placeholder='Type your strong password'
              {...register('password')}
            ></input>
            <p className='text-xs text-red-500'>{errors.password?.message?.toString()}</p>
          </label>
        </div>
        <div className='flex flex-col gap-3'>
          <button
            disabled={isPending}
            type='submit'
            className='w-full rounded-full py-3 px-[18px] bg-white text-center font-bold text-premiere-black'
          >
            Create New Account
          </button>
          <Link
            to='/sign-in'
            className='w-full rounded-full py-3 px-[18px] bg-white/10 text-center font-bold'
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
