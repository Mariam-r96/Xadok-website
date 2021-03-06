import React, {useState,useEffect,useRef } from 'react';
import DrawerToggleButton from "./SideDrawer/DrawerToggleButton";
import img6  from "../xadok/01.png"
import img7 from "../xadok/03.png";
import img8 from "../xadok/02.png";
import img from "../xadok/pexels-photo-102104.jpeg"

import all from "../white/all.svg";
import botique from "../category/boutique.svg";
import elec from "../category/electronics.svg";
import restaurants from "../category/restaurants.svg";
import sup from "../black/supermarket.svg";
import taxi from "../category/delivery taxi.svg";
import Footer from "../Components/footer"
import SideDrawer from '../Components/SideDrawer/SideDrawer'
import TopBar from './topBar'
import {Link} from 'react-router-dom';
import {Row,Col,Container,Image,Button,Carousel} from 'react-bootstrap'
import "../App.css";
import axios from 'axios';

export default function Sidebar() {
  // const [num ,setNum] = useState(1);
  // const plus = () => {
  //   setNum(num + 1);
  // };
  // const minus = () => {
  //   if(num > 0){
  //   setNum(num - 1);
  //   }
  //   else{
  //   }
  // };

  const [category,setCategory] = useState([]);
  const [shops,setShops]=useState([]);
  const [categoryList,setCategoryList]=useState([]);
  const [isActive,setActive]=useState(false);
  
  const [shopCategory, setShopCategory] = useState("All");
  let filtered_item=[...shops];

 const updateLocation={
   lat:26.1109803,
   lng:50.5156726
 }
/*  ================== GET USER GEOGRAPHIC LOCATION ================= */

// const getLocation=()=>{
   
//   navigator.geolocation.getCurrentPosition(function(position) {

//    const updateLocation={
//       lat: position.coords.latitude,
//       lng:position.coords.longitude
//     };

//     console.log("location", updateLocation);
//     axios.post('https://ristsys.store/api/homeContentWeb',updateLocation)
//     .then(response=>{
//       const category_length = (response.data.data.category).length;
//       for(let i=0;i<category_length;i++){
       
//         setCategoryList([...response.data.data.category]);
//       }


//       const shop_list_length = (response.data.data.shops).length;
//       for(let i=0;i<shop_list_length;i++){
       
//         setShops([...response.data.data.shops]);
       
//       }
//       // console.log("shop response",shops)
   
//     })
//     .catch(error=>{
//       console.log(error);
//     });
   
//   });


// }
  useEffect(()=>{

    // getLocation();
 
    axios.get('https://ristsys.store/api/GetSliders')
    .then(response=>{
      setCategory(response.data.data);
    })
    .catch(error=>{
      console.log(error);
    });

    axios.post('https://ristsys.store/api/homeContentWeb',updateLocation)
    .then(response=>{
      const category_length = (response.data.data.category).length;
      for(let i=0;i<category_length;i++){
       
        setCategoryList([...response.data.data.category]);
      }


      const shop_list_length = (response.data.data.shops).length;
      for(let i=0;i<shop_list_length;i++){
       
        setShops([...response.data.data.shops]);
       
      }
      // console.log("shop response",shops)
   
    })
    .catch(error=>{
      console.log(error);
    });

  },[]);

/*   ================= BANNER SLIDER ================= */

  const SliderContent=()=>{
    return(
      <Carousel
            className="over mt-4"
            id="car"
          >
        {category && category.length>0 && category.map((value,index)=>{
      
          const img_url=`https://deliveryxadok.s3.us-east-2.amazonaws.com/${value.slider_img}`;
          return(
          <Carousel.Item key={index}>
            <Image 
              className="d-block over"
              id={value.slider_id}
              src={img_url}
            />
        </Carousel.Item>

          );
        })}
      </Carousel>
    );
   
  }

/* ====================== DISPLAY SHOPS ====================== */

  const DisplayShops=()=>{

    if(shopCategory!=="All"){
      console.log("shopcategory", shopCategory)

      shops.forEach(element => {
        filtered_item=shops.filter(element =>shopCategory===element.cat_name);
      });

    }

    else{
      filtered_item=[...shops];
    }
    
    return(
      <>
        {filtered_item && filtered_item.length && filtered_item.map((value,index)=>{
          console.log("shop",value);
          const img_url=`https://deliveryxadok.s3.us-east-2.amazonaws.com/${value.shop_img}`;
          const gallery_url=`https://deliveryxadok.s3.us-east-2.amazonaws.com/${value.gallery[0].gallery_image}`;
          return(
           
              <Col key={index} sm={12} md={4} lg={4} xl={4}
              className="shop-card mb-4" 
              style={{
                background: `url(${gallery_url})`,
                backgroundSize: "cover",
               
              }}
              >
                <Link to={{
                  pathname: "/products" + "/" + value.name+ "/"+ value.shop_id +  "/" + value.cat_id +  "/" ,
                  
                  }} 

                  // href={
                  //   "/products/" +
                  //   value.name +
                  //   value.shop_id +
                  //   "/" 
                  // }
                  style={{textDecoration:"none"}}>
                  <Image src={img_url} alt=""/>
                  <h5>{value.name}</h5>
                  <p>{value.cat_name}</p>
                </Link>
              </Col>
            
          );
        })}
        
      </>
    );
  }

/* ====================== DISPLAY FILTER BUTTONS ====================== */

  const FilterButtons=()=>{

    return(
      <>
        {categoryList && categoryList.length && categoryList.map((value,index)=>{

          return(
          
            <Button
            aria-pressed="true" 
            className="filter_btn mb-4"
            key={index}
            onClick={()=>setShopCategory(value.name)}>
              {value.name}
            </Button>
      
          );
        })}
      </>
    );
  }

    return (
  <React.Fragment>
    <Container fluid>
      <Row>
   
        <SideDrawer />

        <Col xs={10} sm={10} lg={10} fluid>
          <TopBar />

        {/*=== carousel contents === */}
          <SliderContent/>

        <Row>
            <h3
                className="exp ml-4"
                style={{ color: "black", fontWeight: "bold", marginTop: "30px" }}
              >
          
              Explore Catagories
            </h3>

            <Col xs={12} sm={12} lg={12}>
                <div className={`btn-container d-flex flex-wrap`}>
                  <Button className="filter_btn mb-4"
                    onClick={()=>setShopCategory("All")}>
                      All
                  </Button>
                  <FilterButtons />
                </div>
            </Col>
         </Row>

         <Row className=" mt-4 ml-1">
            <DisplayShops/>
         </Row>
          </Col>
      </Row>
    </Container>

    <Footer className="mt-4" />
  
  </React.Fragment>
 );
}
