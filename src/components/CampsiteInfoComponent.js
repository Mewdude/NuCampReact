import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

const required = val => val && val.length; //checks that a value is not undefined or null, and that the length is greater than 0
const maxLength = len => val => !val || (val.length <= len); 
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {
                    comments.map(comment=>{
                        return(
                            <div key={comment.id}>
                                    <p>{comment.text}<br /></p>
                                    <p>{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </div>
                        );
                    }
                    )
                }
                <CommentForm/>
            </div>
        );
    }
    return (<div />)
}


function CampsiteInfo(props) {
if (props.campsite) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>

            <div className="row">
                <RenderCampsite campsite= {props.campsite} />
                <RenderComments comments= {props.comments} />
            </div>
        </div>
    )
}
return <div />
}

class CommentForm extends Component{

    constructor(props){
        super(props);

    this.state={
        isModalOpen:false
    };

    this.toggleModal=this.toggleModal.bind(this);
    this.handleLogin=this.handleLogin.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(values){
        alert('Submitted'+JSON.stringify(values)); // Rating: ${this.rating.value} Password:${this.author.value} Remember: ${this.remember.checked}`
        this.toggleModal();
    }

    render(){
        return(
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleLogin(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select 
                                        model=".rating" 
                                        id="rating" 
                                        name="rating"
                                        placeholder="Rating"
                                        className="form-control"
                                        validators={{
                                            required,
                                        }}
                                        >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        </Control.select>
                                        <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Author</Label>
                                <Col md={10}>
                                    <Control.text 
                                        model=".author" 
                                        id="author" 
                                        name="author"
                                        placeholder="Author"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                        />
                                        <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="text" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea 
                                        model=".text" 
                                        id="text" 
                                        name="text"
                                        placeholder="Comment"
                                        className="form-control"
                                        rows="6"
                                        />
                                </Col>
                            </Row>
                            <Button type="submit" outline>
                            Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Button type="submit" outline onClick={this.toggleModal}>
                <i className="fa fa-pencil fa-lg" />Submit Comment
            </Button>
            </div>
        );
    }
}

export default CampsiteInfo;