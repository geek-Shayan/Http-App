import Axios from 'axios';
import { toast } from 'react-toastify';

Axios.interceptors.response.use(null, error => {
    console.log("INTERCEPTOR CALLED");
    
    const expectedError = error.response && error.response.status >=400 && error.response.status<500;
    
    if (!expectedError) {
        console.log("Logging the unexpected error.", error);
        // alert("An unexpected error occurred.");
        toast("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
        toast.info("An unexpected error occurred.");
        toast.warn("An unexpected error occurred.");
        toast.success("An unexpected error occurred.");
        
        //toast, toast.error, toast.info, toast.warn, toast.success...  
    }
    else return Promise.reject(error);
  
  });


  export default {
    get: Axios.get,
    post: Axios.post,
    put: Axios.put,
    delete: Axios.delete
  }