import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import { Badge, Button, Modal, Box, Typography } from '@mui/material';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SecurityIcon from '@mui/icons-material/Security';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import styles from '../styles/Product.module.css'
import StarIcon from '@mui/icons-material/Star';
import "swiper/css";
import "swiper/css/pagination";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';  
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';   

//css dosyama eklediğimde çalışmadığı için componentimin içine ekledim.
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Product({ product }) {
  const [openSeller, setOpenSeller] = useState(false);

  //Breadcrumb yapısı array olarak dönmüyordu. Array olarak oluşturdum ve ekledim. Scroll edilmesi istenmiş fakat bulamadğım için eklemedim. Araştırıyorum. :)
  const breadcrumb = [{ title: "Telefon" }, { title: "Cep Telefonu" }, { title: "Apple Cep Telefonu" }];

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div>
          <Swiper pagination={true} modules={[Pagination]}>
            {product?.data?.sliderImage.map((item, i) => (
              <SwiperSlide key={i}>
                <img className={styles.swiperSlideImg} src={item?.imageUrl} alt={`${i + 1} resim`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.breadcrumb}>
          <HomeSharpIcon />
          <ChevronRightIcon />
          {breadcrumb?.map((value, i) => (
            <div className={styles.breadcrumbText} key={i}>
              {value?.title}
              {/*son kategoride icon çıkmaması için aklıma gelen bu koşulu ekledim.*/}
              {i + 1 !== breadcrumb?.length && <ChevronRightIcon />}
            </div>
          ))}
        </div>
        <div className={styles.title}>
          Apple <ChevronRightIcon />
        </div>
        <h1>{product?.data?.itemName}</h1>
        <div className={styles.badges}>
          {product?.data?.tag.map((value, i) => (
            <Badge className={styles.tag} key={i} style={{ backgroundColor: `${value?.tagBackgroundColor}`, color: `${value?.tagTextColor}` }}>
              {value?.tagName === "GARANTILI" && <SecurityIcon />} {value?.tagName}
            </Badge>
          ))}
        </div>
        <div className={styles.description}>
          {product?.data?.description}
        </div>
        <div onClick={() => setOpenSeller(true)} className={styles.seller}>
          <PersonOutlineIcon /> Satıcı: {product?.data?.seller?.name}
          <div className={styles.rating}>
            <StarIcon /> {product?.data?.seller?.rating}
          </div>
        </div>
        <div className={styles.price}>
          {product?.data?.price}
        </div>
        <div className={styles.discount}>
          <div className={styles.box}>
            6.780,00
          </div>
          %5 bizden olsun
        </div>
        <div className={styles.instalment}>
          <div className={styles.icon}> <Inventory2OutlinedIcon /> Ücretsiz Kargo </div>
          <div className={styles.icon} style={{ textDecoration: "underline" }}><CreditCardIcon /> {product?.data?.instalment} </div>
          <div className={styles.icon} style={{ textDecoration: "underline" }}><KeyboardReturnIcon /> Paran Güvende</div>
        </div>

        <div className={styles.buttons}>
          <div className={styles.buttonBorder}> <IosShareOutlinedIcon /> </div>
          <div className={styles.buttonBorder}> <FavoriteBorderOutlinedIcon /> </div>
          <Button variant="contained">Hemen Al</Button>
        </div>
        {
          openSeller && (
            <Modal
              open={openSeller}
              onClose={() => setOpenSeller(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  Satıcı Bilgileri
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Satıcı: {product?.data?.seller?.name}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Puanı: {product?.data?.seller?.rating}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Toplam Satış: {product?.data?.seller?.totalSold}
                </Typography>
              </Box>
            </Modal>
          )
        }
      </div>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://3d8efbd1-e448-48a4-9b31-a2add5eccd62.mock.pstmn.io/api/Item/1`);
  const data = await res.json()




  // Pass data to the page via props
  return { props: { product: { data } } }
}

export default Product