import axios from 'axios';
import HandleError from '../Common/HandleError';

const API_URL = "http://localhost:5226/api/Category/";
const getToken = () => localStorage.getItem('token');
//const getToken = localStorage.getItem('token');

const headers = {
    'Authorization':'TestToken',
    'Content Type':'application/json'
};

const CategoryService = {
    getCategories: async () => { 
        // axios.get(API_URL)
        //     .then(response=>{
        //         return response.data;
        //     })
        //     .error(error=>{
        //         HandleError(error);
        //     })

        try 
        {
            const response = await axios.get(API_URL+'categories',headers);
            return response.data;
        }
        catch(error){
            HandleError(error);
        }
    },
    createCategory: async (category) =>{
        try{
            const response = await axios.post(API_URL+'create',category,headers);
            return response.data;   
        }
        catch(error)
        {
            HandleError(error);
        }
    },
    updateCategory: async (id,category) =>{
        try{
            const response = await axios.put(API_URL+'update/'+id,category,headers); 
            return response.data;
        }catch(error){
            HandleError(error);
        }
    },
    deleteCategory: async (id) =>{
        try{
           const response = await axios.delete(API_URL+'delete/'+id,headers);    
           return response.data;
        }catch(error){  
            HandleError(error);
        }
    }
}

export default CategoryService;