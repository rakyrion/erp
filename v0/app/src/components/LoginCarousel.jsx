import img1 from "../assets/loginPage/img1.jpg"
import img2 from "../assets/loginPage/img2.png"
import img3 from "../assets/loginPage/img3.jpg"
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class LoginCarousel extends Component {
    render() {
        return (
            <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false} showArrows={false} showIndicators={false}>
                <div>
                    <img src={img1} />
                </div>
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
            </Carousel>
        );
    }
};
export default LoginCarousel
/* ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel')); */