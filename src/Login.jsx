import logo from './logo.svg';
import './App.css';
import { auth,twitterProvider, googleProvider,facebookProvider,analytics, githubProvider } from './config/Firebase-config'
import { signInWithPopup, signOut,fetchSignInMethodsForEmail, signInWithEmailAndPassword, OAuthProvider, RecaptchaVerifier , signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
    const Navigate=useNavigate();
    const [err,setError]=useState()
    const [phone_auth_error,setphone_auth_error]=useState()
    const [mynumber, setnumber] = useState("");
    const [otp, setotp] = useState('');
    const [show, setShow] = useState(false);
    const [final, setfinal] = useState('');
    const [show_1, setshow_1] = useState(true);
    const [show_2, setshow_2] = useState(false);
    const [verifyCode, setVerifyCode] = useState('');
    const [result, setResult] = useState();
    const [show_email,set_show_email]=useState(false)
    const [Email_verify,set_Email_verify]=useState('')

    const handleClose = () => setShow(false);
    const handle_email_close = () => setShow(false);

    const handleShow = () => setShow(true);
    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
          .then((res) => {
            console.log(res); 
            Navigate('/home')
          })
          .catch((error) => {
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage)
          });
      };
      const signInWithTwitter = () => {
        signInWithPopup(auth, twitterProvider)
          .then((res) => {
            Navigate('/home')
            console.log(res)
          })
          .catch( (error) => { 
             setError(error.code)
         

          });
      };
      const signInWithFacebook = () => {
        signInWithPopup(auth, facebookProvider)
          .then((res) => {
            Navigate('/home')
            console.log(res)
          })
          .catch( (error) => { 
             setError(error.code)
          });
      };
        const signInWithGithub = () => {
        signInWithPopup(auth, githubProvider)
          .then((res) => {
            Navigate('/home')
            console.log(res)
          })
          .catch( (error) => { 
             setError(error.code)
          });
      };
   
   
    async function setUpRecaptha() {
        try{
            const recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {},
                auth
              );
              recaptchaVerifier.render();
             
              const data= await signInWithPhoneNumber(auth, mynumber, recaptchaVerifier);
              setResult(data);
              setshow_1(false)
              setshow_2(true)
              console.log('data',data)
        }
        catch(err){
            setphone_auth_error(err.code)
            console.log(err)
        }
      
      }
      const verifyOtp = async (e) => {
      console.log('here 1')
      setphone_auth_error("");
        if (verifyCode === "" || verifyCode === null) return;
        try {
          const res= await result.confirm(verifyCode);
          console.log('res',res)
          Navigate("/home");
        } catch (err) {
            console.log('err',err)
            setphone_auth_error(err.message);
        }
      };
      const signInWithEmail=()=>{
        set_show_email(true)
      }

      
  return (
    
    <div className="App">
    <div className="container">
    <div className="row mt-5">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card card-signin  my-5">
          <div className="card-body">
            <h3 className="card-title text-center">Sign In</h3>
              <button className="btn btn-lg btn-google btn-block text-uppercase" onClick={()=>signInWithEmail()}><i className="fab fa-email mr-2"></i> Sign in with Email</button>
              <button className="btn btn-lg btn-google btn-block text-uppercase" onClick={()=>signInWithGoogle()}><i className="fab fa-google mr-2"></i> Sign in with Google</button>
              <button className="btn btn-lg btn-facebook btn-block text-uppercase"  onClick={()=>signInWithFacebook()} ><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
              <button className="btn btn-lg btn-github btn-block text-uppercase"  onClick={()=>signInWithGithub()} ><i className="fab fa-github mr-2"></i> Sign in with Github</button>
              <button className="btn btn-lg btn-info btn-block text-uppercase"  onClick={()=>setShow(true)} ><i className="fa fa-phone mr-2"></i> Sign in with Phone</button>

          </div>
          <div className='card-footer'>
                <span>{err}</span>
          </div>
        </div>
      </div>
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Phone Auth</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{ display: show_1 ? "block" : "none" }}>
                    <input value={mynumber} className="form-control" onChange={(e) => { 
                       setnumber(e.target.value) }}
                        placeholder="phone number" />
                    <br />
                    <div id="recaptcha-container"></div>
                    <div style={{width:'100%',textAlign:'end'}}>
                        <button className='btn  btn-primary' onClick={()=>setUpRecaptha()}>Send OTP</button>
                    </div>
                </div>
                <div style={{ display: show_2 ? "block" : "none" }}>
                    <input type="text" value={verifyCode} className="form-control" placeholder={"Enter your OTP"}
                    onChange={(e) => { 
                        setVerifyCode(e.target.value) }}></input>
                    <br /><br />
                    <div style={{width:'100%',textAlign:'end'}}>
                      <button  className='btn  btn-primary' onClick={()=>{verifyOtp()}}>Verify</button>
                    </div>
                </div>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
{phone_auth_error}
        </Modal.Footer>
      </Modal>
      <Modal show={show_email} onHide={handle_email_close}>
        <Modal.Header closeButton>
          <Modal.Title>Email Auth</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  
                    <input type="text" value={Email_verify} className="form-control" placeholder={"Enter your Email"}
                    onChange={(e) => { 
                        set_Email_verify(e.target.value) }}></input>
                    <br /><br />
                    <div style={{width:'100%',textAlign:'end'}}>
                      <button  className='btn  btn-primary' onClick={()=>{}}>Verify</button>
                </div>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
{phone_auth_error}
        </Modal.Footer>
      </Modal>
  </div>
    </div>
  );
}

export default App;
