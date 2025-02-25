import { Container, Row, Col } from "react-bootstrap";
import "./styles/Authormonth.scss";
import CartItem from "../../../../shared/components/CartItem/CartItem";
import { useProductStore } from "../../../../common/hooks/useCustomHooks";
import React from "react";

const Authormonth = () => {
    const { listProducts } = useProductStore();

    return (
        <>
            <section className="author-month">
                <Container>
                    <Row>
                        <Col className="custom-col d-flex align-items-center justify-content-center flex-column">
                            <div className="title d-flex flex-column">
                                <span>Author of the month</span>
                                <p className="mb-0">Danielle Steel</p>
                            </div>
                            <p className="mb-0 about">
                                Danielle Steel is an American author. Born in
                                Idaho to a father opposed to public education,
                                she never attended school. She spent her days
                                working in her father's junkyard or stewing
                                herbs for her mother, a self-taught herbalist
                                and midwife. She was seventeen the first time
                                she set foot in a classroom.
                            </p>
                            <div className="product d-flex">
                                {listProducts
                                    .filter(
                                        (item: any) =>
                                            item.author === "Danielle Steel"
                                    )
                                    .map((item: any) => {
                                        return (
                                            <>
                                                <CartItem
                                                    items={item}
                                                    index={item.id}
                                                />
                                            </>
                                        );
                                    })}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Authormonth;
