import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Field, reduxForm } from 'redux-form';
import { useEffect, useState } from 'react';
import validate from './signupValidation';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/actions/userActions';
import Alert from '../../components/Alert/Alert';

const Copyright = (props) => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link
        color='inherit'
        component={RouterLink}
        to='https://github.com/team4fwd'
      >
        FWD Team 4
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    variant='standard'
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const theme = createTheme({
  typography: {
    htmlFontSize: 10,

    body2: {
      fontSize: '1.3rem',
    },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536, cs: 1297 },
  },
});

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.user);

  useEffect(() => {
    if (message.status === 'info') {
      const timer = setTimeout(() => {
        navigate(`/login`);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [navigate, message]);

  const submitHandler = async (user) => {
    dispatch(registerUser(user));
  };

  const { handleSubmit, pristine, submitting } = props;

  return (
    <ThemeProvider theme={theme}>
      {message && (
        <Alert
          variant={message.status}
          msg={message.msg}
          time={7}
          re={message.id}
        />
      )}
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit(submitHandler)}
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                textAlign: 'center',
              }}
            >
              <Field
                sx={{ width: { cs: '100% !important', md: '25ch' } }}
                name='email'
                id='email'
                margin='normal'
                required
                fullWidth
                component={renderTextField}
                label='Email Address'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <Field
                  name='name'
                  id='name'
                  margin='normal'
                  required
                  fullWidth
                  component={renderTextField}
                  label='Your Name'
                  autoComplete='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Field
                  name='phone'
                  id='phone'
                  margin='normal'
                  required
                  fullWidth
                  component={renderTextField}
                  label='Phone'
                  type='number'
                  autoComplete='phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                {' '}
                <Field
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  component={renderTextField}
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Field
                  margin='normal'
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmPassword'
                  component={renderTextField}
                  autoComplete='current-confirmPassword'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button
                type='submit'
                disabled={pristine || submitting}
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component={RouterLink} to='/login' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to='/login' variant='body2'>
                    {'Do you have an account? Log in'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default reduxForm({
  form: 'Login',
  validate,
})(Login);
