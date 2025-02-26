import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import "./style/About.scss";

const About = () => {
  return (
    <>
         <div className="img-about">
          <img
            src="https://demo.kaliumtheme.com/bookstore/wp-content/uploads/2019/04/open-house-central-embassy-klein-dytham-architecture_dezeen_2364_col_2-1612x1075.jpg"
            alt=""
            style={{ width: "100%" }}
          />
        </div>

        <section className="about">
          <Container>
                <Row>
                    <Col className="custom-col d-flex flex-column">
                        <p className="mb-0 title">About</p>
                        <span>
                        The most popular book authors listed in a page.
                        <br /> Listed by most relevant and popular authors first.
                        </span>
                    </Col>
                </Row>
            <Row>
              <Col className="custom-col" md={6}>
                    <div>
                        <p className="mb-0">
                            We have an incredible collection of used books that include
                            both fiction and non-fiction. If you are looking for a new
                            author to read or something out of the ordinary we are worth
                            the visit. We are also planning to expand our collection
                            into specific subject fields in the future.
                        </p>
                        <p className="mb-0">
                            Kalium has created an online store and in the coming months
                            will begin to upload a partial listing of our books for
                            purchase along with other items that we sell. The store is
                            operational and functional and there are some books now
                            listed. We regularly post books for sale on our Facebook
                            page too.
                        </p>
                    </div>
              </Col>
              <Col className="custom-col" md={6}>
                    <div>
                        <p className="mb-0">
                            There is a chance to have a cup of coffee or tea, or during
                            the summer, a glass of lemonade or ice tea and a kolache, an
                            English dessert roll that is common here in New York. We
                            also have other snacks.
                        </p>
                        <p className="mb-0">
                            In addition, we host a series of programs called A
                            Conversation With in which we host speakers with a wide
                            range of interests and expertise. They take the form of
                            lectures, readings, musical events and gatherings for social
                            occasions. We also feature the work of regional artists in
                            the store on a regular basis.
                        </p>
                </div>
              </Col>
            </Row>
            <Row>
                <Col className="custom-col" md={6}>
                        <p className="mb-0 title">
                        Opened in the 1960's as a small bookshop by George McCoy in a
                        quiet neighborhood in Queens.
                        </p>
                        <div>
                            <p className="mb-0">
                                There is a chance to have a cup of coffee or tea, or during
                                the summer, a glass of lemonade or ice tea and a kolache, an
                                English dessert roll that is common here in New York. We
                                also have other snacks.
                                <br />
                                In addition, we host a series of programs called A
                                Conversation With in which we host speakers with a wide
                                range of interests and expertise. They take the form of
                                lectures, readings, musical events and gatherings for social
                                occasions. We also feature the work of regional artists in
                                the store on a regular basis.
                            </p>
                        </div>
                </Col>
                <Col className="custom-col" md={6}>
                    <img
                    src="https://demo.kaliumtheme.com/bookstore/wp-content/uploads/2019/04/xlondon-portrait-photographer-william-boyd-1.jpg"
                    alt=""
                    />
                </Col>
            </Row>
            <Row>
              <Col className="custom-col" md={6}>
                    <img
                    src="https://demo.kaliumtheme.com/bookstore/wp-content/uploads/2019/04/open-house-central-embassy-klein-dytham-architecture_dezeen_2364_col_11-1-1116x737.jpg"
                    alt=""
                    />
              </Col>
              <Col className="custom-col" md={6}>
                    <p className="mb-0 title">
                    We've evolved from a small bookshop to a bigger community and
                    we've gone digital.
                    </p>
                    <div>
                        <p>
                            There is a chance to have a cup of coffee or tea, or during
                            the summer, a glass of lemonade or ice tea and a kolache, an
                            English dessert roll that is common here in New York. We
                            also have other snacks.
                            <br />
                            In addition, we host a series of programs called A
                            Conversation With in which we host speakers with a wide
                            range of interests and expertise. They take the form of
                            lectures, readings, musical events and gatherings for social
                            occasions. We also feature the work of regional artists in
                            the store on a regular basis.
                        </p>
                    </div>
              </Col>
            </Row>
          </Container>
        </section>
    </>
  )
}

export default About