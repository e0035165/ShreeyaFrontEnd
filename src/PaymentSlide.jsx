import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";



function PaymentSlide() {
    const cards = [
        { id:1, title: "One-Off", text: "This is one-off payment of $5.99", amount: 5.99, currency: "SGD", unit: 0 },
        { id:2, title: "Monthly-Payment", text: "This is monthly payment of $12.99", amount: 15.99, currency: "SGD", unit: 0  },
        { id:3, title: "Yearly-Payment", text: "This is the third card." , amount: 25.99, currency: "SGD", unit: 0 },
      ];
    const handleBasicPackage=async(e)=> {

    }
    return(
      <Container>
        <Container>
            <h3>Payment Page</h3>
        </Container>
        <Row>
            {
                cards.map((card)=>{
                    <Col key={card.id} md={4}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>{card.title}</Card.Title>
                                <Card.Subtitle>{card.text}</Card.Subtitle>
                                <Card.Text>
                                    <h6>Total charged amount is {card.amount}</h6>
                                    
                                </Card.Text>
                            </Card.Body>
                            
                        </Card>
                    </Col>
                })
            }
        </Row>
      </Container>

      
    );
}