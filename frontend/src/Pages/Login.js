import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';


const Login = ({setOpen}) => {

    const { register, formState: { errors, ...formState }, handleSubmit } = useForm({
        defaultValues: {
          email: 'ppa@narola.email',
          password: 'prpatel',
        }
      }
      );

      const onSubmit=(data)=>{
        const postdata={
          email: data.email,
          password: data.password,
          }
          console.log("postdata",postdata);
          axios
            .post('http://localhost:8080/api/v1/login', postdata)
            .then((response) => {
              alert("login successfully")
              setOpen(false)
              console.log("response",response);
            });
       console.log(data)
      }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
    <Form.Field>
      <label>Email</label>
      <input type="email"
        {...register("email",
          {
            required: "This is required.", pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          })
        }
        placeholder='Email' />
      <ErrorMessage errors={errors} name="email" />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input type="password" {...register("password", { required: "This is required." })} placeholder='Password' />
      <ErrorMessage errors={errors} name="password" />
    </Form.Field>
  
    <Button type='submit' >Login</Button>
  </Form>
  )
}

export default Login