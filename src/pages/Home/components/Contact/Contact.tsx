import React from 'react'
import "./style/Contact.scss";
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const Contact = () => {
  return (
    <section className="contact">
        <Container>
            <Row>
                <Col className="custom-col d-flex flex-column" lg={6}>
                <p className="title mb-0">Contact Information</p>
                <span>
                    We will answer any questions you may have about our online
                    sales, rights or partnership service right here.
                </span>
                <div className="d-flex justify-content-between infomation">
                    <div>
                    <p>
                        Bookstore
                        <br />
                        29A Ngo 124 Pho Vinh Tuy
                        <br />
                        Hai Ba Trung,Ha Noi
                    </p>
                    </div>
                    <div>
                    <p>
                        Email: sale@bookstore.com
                        <br />
                        Tel: +84 234-345-678
                    </p>
                    </div>
                </div>
                <div className="form-contact">
                    <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="name" />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        type="email"
                        placeholder="email@gmail.com"
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>
                        Details please! Your review helps other shoppers.
                        </Form.Label>
                        <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="What did you like or dislike? What should other shopper know before buying"
                        />
                    </Form.Group>
                    <div className="submit">
                        <button>Submit Message</button>
                    </div>
                    </Form>
                </div>
                </Col>
                <Col className="custom-col order-first-lg" lg={6}>
                <iframe
                    title="My Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8196735391166!2d105.87513917479306!3d20.999864380642286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aeaa17c35b81%3A0x79d8becf2f06f8dc!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaW5oIGRvYW5oIHbDoCBDw7RuZyBuZ2jhu4cgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1704349402561!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: "0" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </Col>
            </Row>
        </Container>
  </section>
  )
}

export default Contact