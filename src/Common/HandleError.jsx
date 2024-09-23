const HandleError = (error) =>{
    if(error.response){
        console.error('Error response:${error.response.status} - ${error.response.data.message}');
        switch(error.response.status)
        {
            case 400:
                console.error('Bad request');
                break;
            case 401:
                console.error('Un Authorized, Please login nagain');
                break;
            case 404:
                console.error('Resource not found');
                break;
            case 500:
                console.error('Internal server error');
                break;
            default:
                console.error('An unexpected error occurred');
                break;
        }
    }
    else if(error.request)
    {
        console.error('No response received from server', error.request);
    }
    else
    {
        console.error('Error in setting up request', error.message);
    }
    throw error;
}

export default HandleError;