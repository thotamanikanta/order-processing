import React, { Component } from 'react';
import { Form, Button, Col, Row, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

const UploadDocument = React.forwardRef((props, ref) => {
	const { uploadedFile, onUploadFile } = props;
	const [ fileError, setFileError ] = React.useState(null);
	console.log(uploadedFile);
	const isValidated = () => {
		uploadedFile === '' 
			? setFileError(<small className="text-danger mt-2">* You have to select a file.</small>)
			: setFileError(null);
		let valid = uploadedFile !== '';
		return valid;
	};
	React.useImperativeHandle(ref, () => ({
		isValidated: () => {
			return isValidated();
		}
	}));
	const onChangeEvent = (event) => {
		console.log(event.target.files[0])
		if(event.target.files[0]!==undefined)
			onUploadFile({ uploadedFile: event.target.files[0].name.split('.')[0] });
		else onUploadFile('')
	};
	return (
		<div className="wizard-step">
			<Form className="d-flex justify-content-center align-items-center">
				<Form.Group as={Row} className="p-3" controlId="formPlaintextFile">
					<Col className="text-dark text-left" md="6">
						* Select file to upload
					</Col>
					<Col sm="6">
						<input
							type="file"
							accept=".png,.pdf,.jpeg,.jpg,.txt"
							id="upload"
							className="file-upload"
							onChange={(event) => onChangeEvent(event)}
						/>
						{fileError}
					</Col>
				</Form.Group>
			</Form>
		</div>
	);
});

export default UploadDocument;
