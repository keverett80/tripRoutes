import {

  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,

  MDBAnimation
} from 'mdbreact';

function MainContent (){

  return(
<MDBRow>
<MDBAnimation
  type='fadeInLeft'
  delay='.3s'
  className='white-text text-center text-md-left col-md-6 mt-xl-5 mb-5'
>
  <h1 className='h1-responsive font-weight-bold'>
    Management Portal
  </h1>
  <hr className='hr-light' />
  <h6 className='mb-4'>
  The worlds best in class Transportation portal for trips and routes, for all types of businesses that use transportation.
  </h6>
  <MDBBtn outline color='white' href='/login'>
  <MDBIcon icon="lock" />   Login
  </MDBBtn>
</MDBAnimation>

<MDBCol md='6' xl='5' className='mb-4'>

</MDBCol>
</MDBRow>    )
}
export default MainContent;