import Slider from "react-slick";
import Button from "../../../../shared/components/Button/Button";
import "./BannerSlide.scss";

const BannerSlide = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 4000,
    };

    return (
        <>
            <div className="wrap-slider">
                {/* Slider Container */}
                <div className="wrap-slider__container">
                    <div>
                        <Slider {...settings}>
                            <div className="slide slide1 d-flex align-items-center justify-content-center">
                                <div className="slide1-container d-flex align-items-center justify-content-center flex-column">
                                    <div className="animated-single-text">
                                        {Array.from(
                                            "COME AND JOIN THE READING CLUB"
                                        ).map((letter, idx) => (
                                            <span key={idx}>{letter}</span>
                                        ))}
                                    </div>
                                    <div className="animated-text">
                                        <span>
                                            Enjoy the silence in our reading
                                            room.
                                        </span>
                                    </div>
                                    <div className="btn-slide d-flex align-items-center justify-content-center">
                                        <Button text="SEE MORE" />
                                    </div>
                                </div>
                            </div>
                            <div className="slide slide2 d-flex align-items-center justify-content-center">
                                <div className="slide2-container d-flex align-items-center justify-content-center flex-column">
                                    <div className="animated-text d-flex align-items-center justify-content-center">
                                        <span>
                                            Book are not made for furniture, but
                                            there is nothing else that so
                                            beautifully furnishes a house.
                                        </span>
                                    </div>
                                    <div className="btn-slide d-flex align-items-center justify-content-center">
                                        <Button text="FIND OUT MORE" />
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerSlide;
