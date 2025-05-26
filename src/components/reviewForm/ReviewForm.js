import {Form,Button} from 'react-bootstrap';

const ReviewForm = ({handleSubmit,revText,ratingRef,labelText,defaultValue}) => {
  return (

    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
        <Form.Label>Calificación</Form.Label>
        <Form.Select ref={ratingRef} defaultValue="5">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Select>
      </Form.Group>
        <Button variant="outline-info" onClick={handleSubmit}>Enviar</Button>
    </Form>   

  )
}

export default ReviewForm