import React, { useState } from "react";
import './product.css';

const App = () => {
  const [allDataEnter, setallDataEnter] = useState({
    title: "",
    description: "",
    thumbnail: '',
    mainImages: [],
    category: "",
    stock: "",
    weight: "",
    price: "",
    nutrition:'',
    nutritionValues: [{
    name:'', amount:'',unit:''}],
    specifications: [{
    name:'',
    value:''}]
  });
  
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setallDataEnter({ ...allDataEnter, [name]: value });
  };

  const handleThumbnailChange = (e) => {
    setallDataEnter({ ...allDataEnter, thumbnail:(e.target.files[0])});
  };

  const handleMainImagesChange = (e) => {
    let mainuploadImages=Array.from(e.target.files);
    let mainImageurl=mainuploadImages.map((file)=>URL.createObjectURL(file))
    setallDataEnter({ ...allDataEnter, mainImages: mainImageurl });
  };

  const handleAddNutrition = () => {
    setallDataEnter({ 
      ...allDataEnter, 
      nutritionValues: [...allDataEnter.nutritionValues, { name: "", amount: "", unit: "" }],
    });
  };


  const handleNutritionChange = (index, e) => {
    const updatedNutrition = [...allDataEnter.nutritionValues];
    updatedNutrition[index][e.target.name] = e.target.value;
    setallDataEnter({ ...allDataEnter, nutritionValues: updatedNutrition });
  };

  const handleAddSpecification = () => {
    setallDataEnter({ 
      ...allDataEnter, 
      specifications: [...allDataEnter.specifications, { name: '', value: ''}]
    });
  };

  const handleSpecificationChange = (index, e) => {
    const updatedSpecs = [...allDataEnter.specifications];
    updatedSpecs[index][e.target.name] = e.target.value;
    setallDataEnter({ ...allDataEnter, specifications: updatedSpecs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex === null) {
      setProducts([...products, allDataEnter]);
      alert(`succesfull submit the product:${allDataEnter.title}` )
    } else {
      const updatedProducts = products.map((product, index) =>
        index === editIndex ? allDataEnter : product
      );
      setProducts(updatedProducts);
      setEditIndex(null);
    }

    setallDataEnter({
      title: "",
      description: "",
      thumbnail:'',
      mainImages: [],
      category: "",
      stock: "",
      weight: "",
      price: "",
      nutritionValues: [{name:'',amount:'',unit:''}],
      specifications: [{name:'',value:'',}]
    });
  };

  const handleEdit = (index) => {
    const product = products[index];
    setallDataEnter(product);
    setEditIndex(index);
    setOpenForm(true)
  };

  const handleDelete = (index) => {
    const filteredProducts = products.filter((product, i) => i !== index);
    setProducts(filteredProducts);
  };

  const removeNutrition=()=>{
    let modifyNutrition=allDataEnter.nutritionValues.filter((products, i) => i !== i)
  setallDataEnter({...allDataEnter,nutritionValues:modifyNutrition})
  }

  const removeSpecification=()=>{
    let modifySpecification=allDataEnter.specifications.filter((products,i)=> i!==i)
    setallDataEnter({...allDataEnter,specifications:modifySpecification})
  }

const [openForm,setOpenForm]=useState(false);

const clickToOpen=()=>{
   setOpenForm(!openForm)
setEditIndex(null)
setallDataEnter({
  title: "",
  description: "",
  thumbnail:'',
  mainImages: [],
  category: "",
  stock: "",
  weight: "",
  price: "",
  nutritionValues: [{name:'',amount:'',unit:''}],
  specifications: [{name:'',value:'',}]
})
  }

  return (
  <div>
      <div>
          <h1 style={{textAlign:'center',color:"#3A1078",fontSize:'40px',fontStyle:"normal",textDecoration:'underline',textUnderLineOffSet: '10px'}}>Rajan Market Product List World</h1>
          <button onClick={clickToOpen} style={{fontSize:'20px',backgroundColor:"#C68FE6"}}> Create A New
            {openForm? <button style={{backgroundColor:'red',marginLeft:'20px',fontSize:'10px'}}>Close Form</button>:"   Product"}
          </button>
      </div>
          {products.length>0? (
      <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>MainnImages</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.mainImages.length>0 && 
              product.mainImages.map((image,i)=>(
                <img key={i} src={image} width="50" alt={`main${i}`}/>
              ))}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.weight}</td>

              <td>
                <button onClick={() => handleEdit(index)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(index)} style={{ marginLeft: "10px" }} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p style={{fontSize:'40px',color:'#D91656',}}>No Products Added</p>
    )}

    {openForm && (
  <div>
      <h2>{editIndex !== null ? <h3 style={{color:"#3A1078",textDecoration:'underline',textUnderLineOffSet: '10px'}}>Edit Your Products Heare</h3>:<h3 style={{color:"#3A1078",textDecoration:'underline',textUnderLineOffSet: '10px'}}>Add New Products</h3>}</h2>
        <form onSubmit={handleSubmit} style={{backgroundColor:'#FFFBE6'}}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={allDataEnter.title}
              onChange={handleChange}
              required
              maxLength="10"
              style={{ marginLeft: "10px" }}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={allDataEnter.description}
              onChange={handleChange}
              required
              maxLength="30"
              style={{ marginLeft: "10px", width: "200px", height: "50px" }}
            />
          </div>
          <div>
            <label>Thumbnail Image:</label>
            <input
              type="file"
              onChange={handleThumbnailChange}
              required
              accept="image/*"
              style={{ marginLeft: "10px" }}
            />
          </div>
          <div>
            <label>Main Images (Upload 3):</label>
            <input
              type="file"
              multiple
              onChange={handleMainImagesChange}
              required
              accept="image/*"
              style={{ marginLeft: "10px" }}
            />
          </div>
          <div>
            <label>Category:</label>
            <select
              name="category"
              value={allDataEnter.category}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
            </select>
          </div>
          <div>
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={allDataEnter.stock}
              onChange={handleChange}
              required
              min="0"
              style={{ marginLeft: "10px" }}
            />
          </div>
          <div>
            <label>Weight:</label>
            <input
              type="number"
              name="weight"
              value={allDataEnter.weight}
              onChange={handleChange}
              required
              min="0"
              style={{ marginLeft: "10px" }}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={allDataEnter.price}
              onChange={handleChange}
              required
              min="0"
              style={{ marginLeft: "10px" }}
            />
          </div>
  
          <div className="nut-style">
            <label>Nutrition Values:</label>
            {allDataEnter.nutritionValues.map((nutrition, index) => (
              <div key={index} style={{ marginLeft: "10px",marginTop:"10px" }}>
                {/* <input
                  type="text"
                  name="name"
                  style={{width:'25%',marginLeft:"10px"}}
                  value={nutrition.name}
                  placeholder="Name (e.g., Protein)"
                  onChange={(e) => handleNutritionChange(index, e)}
                />
                <input
                  type="number"
                  name="amount"
                  style={{width:'25%',marginLeft:"10px"}}
                  value={nutrition.amount}
                  placeholder="Amount"
                  onChange={(e) => handleNutritionChange(index, e)}
                />
                <input
                  type="text"
                  name="unit"
                  style={{width:'20%',marginLeft:"10px"}}
                  value={nutrition.unit}
                  placeholder="Unit (e.g., grams)"
                  onChange={(e) => handleNutritionChange(index, e)}
                /> */}
                <button type="button" onClick={()=>removeNutrition(index)} style={{backgroundColor:'#F7418F',marginLeft:"10px",}}>REMOVE</button>
              </div>
            ))}
            <button type="button" onClick={handleAddNutrition} style={{ marginTop: "10px" ,backgroundColor:'#091057'}}>
              Add Nutrition Value
            </button>
          </div>
  
  
          <div>
            <label style={{marginTop:"10px"}}>Specifications:</label>
            {allDataEnter.specifications.map((specfication, index) => (
              <div key={index} style={{ marginLeft: "10px" ,marginTop:"10px"}}>
                <input
                  type="text"
                  name="name"
                  style={{width:'30%'}}
                  value={specfication.name}
                  placeholder="Specification Name (e.g., Color)"
                  onChange={(e) => handleSpecificationChange(index, e)}
                />
                <input
                  type="text"
                  style={{width:'30%',marginLeft:'20px'}}
                  name="value"
                  value={specfication.value}
                  placeholder="Value (e.g., Red)"
                  onChange={(e) => handleSpecificationChange(index, e)}
                />
                <button type="button" onClick={()=>removeSpecification(index)} style={{backgroundColor:'#F7418F',marginLeft:'20px'}}>REMOVE</button>

              </div>
            ))}
            <button type="button" onClick={handleAddSpecification} style={{ marginTop: "10px",backgroundColor:'#091057'}}>
              Add Specification
            </button>
          </div>
  
          <button type="submit" style={{ marginTop: "10px", backgroundColor:'#610C9F'}}>
            {editIndex !== null ? "Update Product" : "Add Product"}
          </button>
        </form>
    </div>)}
  </div>
)
}
  export default App;
    


  

