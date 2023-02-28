import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import { register } from '@dico/http/auth';
import * as Types from '@dico/types';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export default function SignUp() {
  const { isLoading, error, isError, isSuccess, mutateAsync } = useMutation({
    mutationFn: (data: Types.Http.Auth.Requests.SignUp) => register(data),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Types.Http.Auth.Requests.SignUp>();

  return (
    <>
      <Paper style={{ padding: 20, width: 500, margin: '200px auto' }}>
        <Stack spacing={2}>
          <Typography variant={'h2'} align={'center'}>
            Sign Up
          </Typography>
          {isError ? (
            <Alert severity={'error'}>{(error as any).response.data.message}</Alert>
          ) : null}
          <Controller
            render={({ field }) => <TextField label={'First name'} onChange={field.onChange} />}
            name={'firstName'}
            control={control}
          />{' '}
          <Controller
            render={({ field }) => <TextField label={'Last name'} onChange={field.onChange} />}
            name={'lastName'}
            control={control}
          />{' '}
          <Controller
            render={({ field }) => <TextField label={'E-Mail'} onChange={field.onChange} />}
            name={'email'}
            control={control}
          />{' '}
          <Controller
            render={({ field }) => (
              <TextField label={'Password'} type={'password'} onChange={field.onChange} />
            )}
            name={'password'}
            control={control}
          />
          <Button
            variant={'contained'}
            onClick={handleSubmit((data) =>
              mutateAsync(data, {
                onSuccess: () => {
                  toast('Cool! You account have been created successfully! Check your email', {
                    type: 'success',
                  });
                },
                onError: (error: AxiosError | any) => {
                  toast(error?.response?.data?.message || 'Something went wrong...', {
                    type: 'error',
                  });
                },
              })
            )}
          >
            Complete
          </Button>
        </Stack>
      </Paper>
    </>
  );
}
