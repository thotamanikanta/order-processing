import { Component, Fragment, useState, useEffect } from 'react';
import React from 'react';

import { Form, Button, Col, Row, ButtonGroup, ButtonToolbar, Card, Container } from 'react-bootstrap';
import Select from 'react-select';
import SweetAlert from 'react-bootstrap-sweetalert';
import validator from 'validator';

function getProductListFromLocalStorage() {
	let stringifiedProductList = localStorage.getItem('productList');
	let parsedProductList = JSON.parse(stringifiedProductList);
	if (parsedProductList === null) {
		return [];
	} else {
		return parsedProductList;
	}
}

let productList = getProductListFromLocalStorage();

const companyOptions = [
	{ value: 'End Customer', label: 'End Customer' },
	{ value: 'Channel Partner', label: 'Channel Partner' },
	{ value: 'Distributer', label: 'Distributer' }
];

const isRequired = (value) => value !== null && value !== '' && value;

function CreateProduct(props) {

	
	const [ productName, onChangeProductName ] = React.useState('');
	const [ model, onChangeModel ] = React.useState('');
	
    

	const [ nameRequiredState, setNameRequiredState ] = React.useState(true);
	const [ modelRequiredState, setModelRequiredState ] = React.useState(true);
	
	const [ nameError, setNameError ] = React.useState(null);
	const [ modelError, setModelError ] = React.useState(null);
	const [ productExistsError, setProductExistsError ] = React.useState(false);

	const [refresh,setRefresh]=React.useState(false)


	const nameErrorTag = <small className="text-danger mt-2">* Please enter valid name </small>;
	const modalErrorTag = <small className="text-danger mt-2">* Please enter valid model </small>;
	
	const [ alertState, setAlertState ] = React.useState(false);

	useEffect(() => {
		let interval;
		if (refresh===true) {
		  interval = setTimeout(() => {
			window.location.reload(false);
		  }, 1);
		} else {
		   clearTimeout(interval);
		}
		return () => clearInterval(interval);
	  }, [refresh]);

	const submitProductDetails = (event) => {
		event.preventDefault();
		
		if (productName === '') {
			setNameRequiredState(false);
		} else {
			setNameRequiredState(true);
		}
		if (model === '') {
			setModelRequiredState(false);
		} else {
			setModelRequiredState(true);
		}
		let productExists=false
        for(let i=0;i<productList.length;i++){
            if(model.toLowerCase()===productList[i].model.toLowerCase() && productName.toLowerCase()===productList[i].productName.toLowerCase()){
                productExists=true
                onChangeProductName('');
			    onChangeModel('');
                setProductExistsError(true)
                break;
            }
        }
        if(productExists===false){
            if (productName !== '' && model !== '' ) {
                setAlertState(true);
                const info = {
                    productName,
                    model,
                    
                    productId: productList.length
                };
                productList.push(info);
                localStorage.setItem('productList', JSON.stringify(productList));
                onChangeProductName('');
                onChangeModel('');
    
                setModelRequiredState(true);
                setNameRequiredState(true);
                
                setProductExistsError(false);

				
            }
        }
		
	};

	const onClickCancelButton = () => {
		onChangeProductName('');
		onChangeModel('');

		setModelRequiredState('');
		setNameRequiredState('');
		

		setProductExistsError(false);
	};



	return (
		<Fragment>
			<Container fluid style={{ height: '70vh', marginTop: '100px' }}>
				<Row className="d-flex flex-column justify-content-center align-items-center ">
					<Col xs="12" xl="6">
						<Form className="form-horizontal">
							<Card className="horizontal-form">
								<Card.Header>
									<Card.Title as="h4" className="text-dark text-bold text-center mt-3 mb-3">
										Create Product 
									</Card.Title>
								</Card.Header>
								<Card.Body className="ml-5 mr-5">
									
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												* Product Name:
											</Col>
											<Col md="8">
												<Form.Control
													type="text"
													placeholder="customer name"
													value={productName}
													onChange={(e) => {
														onChangeProductName(e.target.value);
														if (validator.isAlpha(e.target.value, 'en-US', { ignore: ' ' }))
															setNameError(null);
														else setNameError(nameErrorTag);
														if (isRequired(e.target.value)) {
															setNameRequiredState(true);
														} else {
															setNameRequiredState(false);
														}
													}}
													onBlur={(e) => {
														if (e.target.value === '') {
															setNameRequiredState(false);
														}
													}}
												/>
												{nameError}
												{nameRequiredState ? null : (
													<label className="text-danger">This field is required.</label>
												)}
											</Col>
										</Row>
									</Form.Group>
									
									
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												* Model Name:
											</Col>
											<Col md="8">
												<Form.Control
													type="text"
													placeholder="customer name"
													value={model}
													onChange={(e) => {
														onChangeModel(e.target.value);
														if (validator.isAlphanumeric(e.target.value, 'en-US', { ignore: ' ' }))
															setModelError(null);
														else setModelError(modalErrorTag);
														if (isRequired(e.target.value)) {
															setModelRequiredState(true);
														} else {
															setModelRequiredState(false);
														}
													}}
													onBlur={(e) => {
														if (e.target.value === '') {
															setModelRequiredState(false);
														}
													}}
												/>
												{modelError}
												{modelRequiredState ? null : (
													<label className="text-danger">This field is required.</label>
												)}
											</Col>
										</Row>
									</Form.Group>
									<Col md="12" className="text-center">
                                    {!productExistsError ? null : (
													<label className="text-danger text-center">This product already exists.</label>
												)}
                                    </Col>
								</Card.Body>
								<Card.Footer className="d-flex justify-content-end mr-5 mb-3">
                                
									<Button
										className="btn-wd "
										type="button"
										variant="secondary"
										onClick={onClickCancelButton}
									>
										Cancel
									</Button>
									<Button
										className="btn-wd ml-3"
										type="button"
										variant="info"
										onClick={submitProductDetails}
									>
										Save
									</Button>
								</Card.Footer>

								{alertState ? (
									<SweetAlert
										success
										style={{ display: 'block', marginTop: '-100px' }}
										
										onConfirm={() => {
											setAlertState(false)
											setRefresh(true)
										}}
										onCancel={() => setAlertState(false)}
										confirmBtnBsStyle="info"
									>
										You added new Product!
									</SweetAlert>
								) : null}
							</Card>
						</Form>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
}

export default CreateProduct;
