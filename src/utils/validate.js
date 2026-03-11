

export const validateRegister =({name,email, password})=>{
    const errors= {};

    if(!email){
        errors.email='Email is required';
    }else if(!/\S+@\S+\.\S+/.test(email)){
        errors.email='Invalid email format'
    }

    if(!password){
        errors.password='password is required'
     }//else if(password.length < 8){
    //     errors.password='password must be at least 8 characters'
    // } 

     if(!name){
        errors.name='Name is required'
    }

    return errors;

   
}

export const validateLogin=({email, password})=>{
    const errors={}
       if(!email){
           errors.email='Email is required'
       }
       if(!password){
          errors.password='password is required'
       }
       return errors;
}