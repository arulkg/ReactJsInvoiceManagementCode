import React, {useEffect, useState} from 'react';
import CategoryService from '../../Services/CategoryService'; 
import '../Category/CategoryList.css';
import ConfirmDialog from '../../Common/ConfirmDialog';

const CategoryList = () => {

    //List Category related variables 
    const [categories, setCategories] = useState([]);
    const [error,setError] = useState(null);
    const [showConfirmDialog,setShowConfirmDialog] = useState(false);
    const [categoryToDelete,setCategoryToDelete] = useState(null);

    // Add Categoiry relate variables
    const initCategory = {
        id:null,
        name:'',
        description:'',
        minimumStock:"",
        maximumStock:"",
        minimumRate:"",
        maximumRate:""
    };

    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(initCategory);
    const [isEditing,setIsEditing] = useState(false); 
    const [isShowAddCatBtn,setIsShowAddCatBtn] = useState(true);
    

    // Load Category functional component
    useEffect(()=>{
        loadCategories();
    },[categories]);

    const loadCategories = async () => {
        try{
            const data = await CategoryService.getCategories();
            setCategories(data.data);  
            setIsShowAddCatBtn(true);
            console.log(data.data); 
        }catch(error){
            setError('Failed to load categories');
        }
    };

    const handleDeleteCategory = async (id) =>{
        try{
            await CategoryService.deleteCategory(id);
            loadCategories();
            setShowConfirmDialog(false);
        }catch(error){
            setError('Failed to delete category');
        }
    };

    const showDeleteConfirmation = (category) =>{
        setCategoryToDelete(category);
        setShowConfirmDialog(true);
    };

    const handleConfirmDelete = () =>{
        if(categoryToDelete){
            handleDeleteCategory(categoryToDelete.id);
        }
    };

    const handleCancelDelete = () =>{
        setCategoryToDelete(null);
        setShowConfirmDialog(false);
    };
    
    // Add Category functional component 

    const handleAddCategory = (e) =>{
        e.preventDefault();
        const updateCategory = [
          ...categories,
          {
            id:0,
            description:currentCategory.description,
            minimumStock:currentCategory.minimumStock,
            maximumStock:currentCategory.maximumStock,
            minimumRate:currentCategory.minimumRate,
            maximumRate:currentCategory.maximumRate
          }      
        ];
        currentCategory.id=0;
        const data = CategoryService.createCategory(currentCategory); 
        loadCategories();
        //setCategories(updateCategory);
        setIsEditing(false);
        setShowAddEditForm(false);
        setCurrentCategory(initCategory);
        setIsShowAddCatBtn(true);
    };

    const handleEditClick = (category) =>{
        setIsEditing(true);
        setShowAddEditForm(true);
        setCurrentCategory(category); 
        setIsShowAddCatBtn(false);
    };

    const handleUpdateCategory = (e) =>{
        const updatedCategory = categories.map((category) =>
            category.id === currentCategory.id ? currentCategory : category
        );
        const data = CategoryService.updateCategory(currentCategory.id , currentCategory); 
        loadCategories();
        //setCategories(updateCategory);
        setIsEditing(false);
        setShowAddEditForm(false);
        setCurrentCategory(initCategory); 
        setIsShowAddCatBtn(true);
    };

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setCurrentCategory({...currentCategory,[name]:value});
    };
    
    const handleCancelClick = (e) => {
        e.preventDefault(); // Prevent the form from submitting
        setShowAddEditForm(false);
        setIsEditing(false);
        setCurrentCategory(initCategory); 
        setIsShowAddCatBtn(true);

      };

      const addBtnClick = (e) =>{
        setShowAddEditForm(!showAddEditForm);
        setIsEditing(false);
      };

    return(
        <div className='category-list'> 
            {/* Add Add Category button  */}
            <div >
                { !isEditing && (
                <button className="add-category-btn" onClick={addBtnClick}>
                Add Category
                </button> 
                )}
            </div>
            
            {/* Add / Edit Categoryy Form  */}
            <div > 
                {showAddEditForm && (
                    <form className='add-category-form' onSubmit={ isEditing ? 
                        handleUpdateCategory : 
                        handleAddCategory} >
                        <div className='form-group'>
                            <label htmlFor='name'>Category Name</label>
                            <input 
                            type="text" 
                            name="name" 
                            placeholder='Category Name' 
                            value={currentCategory.name}
                            onChange={handleInputChange}
                            required 
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='descriptrion'>Description</label>
                            <input 
                            type='text' 
                            name="description" 
                            placeholder='description' 
                            value={currentCategory.description}
                            onChange={handleInputChange}
                            retuired 
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='minimumStock'>Mininum Stock</label>
                            <input 
                            type= 'text' 
                            name="minimumStock" 
                            placeholder='Miminum Stock' 
                            value={currentCategory.minimumStock}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='maximumStock'>Maximum Stock</label>
                            <input 
                            type= "text" 
                            name="maximumStock" 
                            placeholder='Maximum Stock' 
                            value={currentCategory.maximumStock}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='minimumRate'>Mininum Rate</label>
                            <input 
                            type= "`text" 
                            name="minimumRate" 
                            placeholder='Miminum Rate' 
                            value={currentCategory.minimumRate}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='maximumRate'>Maximum Rate</label>
                            <input 
                            type= "text" 
                            name="maximumRate" 
                            placeholder='Maximum Rate' 
                            value={currentCategory.maximumRate}
                            onChange={handleInputChange} 
                            />
                        </div>
                        <div className='form-group'>
                            
                            <button className='saveupdate-category-btn' type="submit">
                                {isEditing ? "Update Category" : "Save Category" }</button>  
                            {showAddEditForm && ( 
                            <button 
                                type="button" 
                                className='cancel-btn' onClick={handleCancelClick} >
                              Cancel
                            </button>    
                            )}
                        </div>
                    
                       
                    </form>

                )}
            </div>

            {/*  Category List form */}
            <h2>Categotry List</h2>
            <div className='category-list-wraper'>

                {error && <p className="error">{error}</p>}
                <div className='category-list-header'>
                   <div className='header-item'>Product Name</div>
                   <div className='header-item'>Description</div>
                   <div className='header-item'>Minimum Stock</div>
                   <div className='header-item'>Maximum Stock</div>
                   <div className='header-item'>Minimum Rate</div>
                   <div className='header-item'>Maximum Rate</div>
                    <div className='header-item'>Actions</div>
                </div>
            
                <div className='category-list-container'>
                    {categories.map((category) => (
                        <div key={category.id} className='category-row'>
                            <div className='category-item'>{category.name}</div>
                            <div className='category-item'>{category.description}</div>
                            <div className='category-item'>{category.minimumStock}</div>
                            <div className='category-item'>{category.maximumStock}</div>
                            <div className='category-item'>{category.minimumRate}</div>
                            <div className='category-item'>{category.maximumRate}</div>
                            <div className='category-item'>
                                <button className='saveupdate-category-btn' onClick={()=>showDeleteConfirmation(category)}>Delete</button> 
                                <button className='saveupdate-category-btn' onClick={()=>handleEditClick(category)}>Edit</button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        
        
            {/* ConfirmDialog component to confirm deletion */}
            <ConfirmDialog
                show={showConfirmDialog}
                title="Delete Category"
                message={`Are you sure you want to delete ${categoryToDelete?.name}?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};
export default CategoryList;