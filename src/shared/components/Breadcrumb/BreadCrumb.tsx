import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import "./styles/BreadCrumb.scss";

interface BreadcrumbItem {
    label: string; // Văn bản hiển thị
    href?: string; // Liên kết (có thể không bắt buộc nếu là item active)
    active?: boolean; // Item hiện tại
}

interface BreadcrumbComponentProps {
    items: BreadcrumbItem[];
}

const BreadCrumb: React.FC<BreadcrumbComponentProps> = ({ items }) => {
    return (
        <>
            <section className="bread-crumb">
                <Container>
                    <Row>
                        <Col>
                            <Breadcrumb className="custom-breadcrumb">
                                {items.map((item, index) => (
                                    <Breadcrumb.Item
                                        key={index}
                                        className="custom-breadcrumb-item d-flex align-items-center"
                                        href={
                                            !item.active ? item.href : undefined
                                        } // Nếu là active, không cần href
                                        active={item.active}
                                    >
                                        {item.label}
                                    </Breadcrumb.Item>
                                ))}
                            </Breadcrumb>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default BreadCrumb;
